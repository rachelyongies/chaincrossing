import { Token, BridgeQuote, BridgeTransaction } from '@/types/bridge';
import { ethers } from 'ethers';
import { parseUnits, formatUnits } from 'ethers';

// Stellar Bridge Service Configuration
const STELLAR_BRIDGE_CONFIG = {
  minAmount: 0.01, // Minimum bridge amount in XLM
  maxAmount: 1000, // Maximum bridge amount in XLM
  defaultTimelock: 3600, // 1 hour default timelock
  fee: 0.0001,     // Bridge fee in XLM
  exchangeRate: 1, // 1:1 exchange rate for now
};

export class StellarBridgeService {
  private static instance: StellarBridgeService;

  private constructor() {}

  static getInstance(): StellarBridgeService {
    if (!StellarBridgeService.instance) {
      StellarBridgeService.instance = new StellarBridgeService();
    }
    return StellarBridgeService.instance;
  }

  // Check if a token pair is supported
  isPairSupported(fromToken: Token, toToken: Token): boolean {
    const supportedPairs = [
      { from: 'ETH', to: 'XLM' },
      { from: 'XLM', to: 'ETH' },
      { from: 'WETH', to: 'WXLM' },
      { from: 'WXLM', to: 'WETH' },
      { from: 'BTC', to: 'XLM' },
      { from: 'XLM', to: 'BTC' },
      { from: 'SOL', to: 'XLM' },
      { from: 'XLM', to: 'SOL' },
    ];

    return supportedPairs.some(pair => 
      pair.from === fromToken.symbol && pair.to === toToken.symbol
    );
  }

  // Get exchange rate between tokens
  private async getExchangeRate(fromToken: Token, toToken: Token): Promise<number> {
    // In production, this would fetch from price feeds
    // For now, use simplified rates
    const rates: Record<string, number> = {
      'ETH_XLM': 0.1,   // 1 ETH = 0.1 XLM
      'XLM_ETH': 10,    // 1 XLM = 10 ETH
      'BTC_XLM': 0.005, // 1 BTC = 0.005 XLM
      'XLM_BTC': 200,   // 1 XLM = 200 BTC
      'SOL_XLM': 0.08,  // 1 SOL = 0.08 XLM
      'XLM_SOL': 12.5,  // 1 XLM = 12.5 SOL
    };

    const key = `${fromToken.symbol}_${toToken.symbol}`;
    return rates[key] || 1;
  }

  // Get bridge quote
  async getQuote(fromToken: Token, toToken: Token, amount: string, walletAddress: string): Promise<BridgeQuote> {
    try {
      // Validate inputs
      if (!this.isPairSupported(fromToken, toToken)) {
        throw new Error(`Token pair ${fromToken.symbol}-${toToken.symbol} not supported for Stellar bridge`);
      }

      const amountNum = parseFloat(amount);
      if (isNaN(amountNum) || amountNum <= 0) {
        throw new Error('Invalid amount');
      }

      if (amountNum < STELLAR_BRIDGE_CONFIG.minAmount) {
        throw new Error(`Amount too low. Minimum: ${STELLAR_BRIDGE_CONFIG.minAmount} ${fromToken.symbol}`);
      }

      if (amountNum > STELLAR_BRIDGE_CONFIG.maxAmount) {
        throw new Error(`Amount too high. Maximum: ${STELLAR_BRIDGE_CONFIG.maxAmount} ${fromToken.symbol}`);
      }

      // Get exchange rate
      const exchangeRate = await this.getExchangeRate(fromToken, toToken);
      
      // Calculate fees
      const bridgeFee = STELLAR_BRIDGE_CONFIG.fee;
      const networkFee = 0.00001; // Stellar network fee (very low)
      const totalFee = bridgeFee + networkFee;

      // Calculate amounts
      const fromAmount = parseUnits(amount, fromToken.decimals);
      const toAmount = (fromAmount * BigInt(Math.floor(exchangeRate * 10000))) / 10000n; // Apply exchange rate
      const feeAmount = parseUnits(totalFee.toString(), fromToken.decimals);

      return {
        id: `stellar-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        fromToken,
        toToken,
        fromAmount: amount,
        toAmount: formatUnits(toAmount, toToken.decimals),
        exchangeRate: exchangeRate.toString(),
        networkFee: networkFee.toString(),
        protocolFee: bridgeFee.toString(),
        totalFee: totalFee.toString(),
        estimatedTime: '3-5 minutes',
        minimumReceived: formatUnits(toAmount, toToken.decimals),
        priceImpact: '0.05',
        expiresAt: Date.now() + 5 * 60 * 1000 // 5 minutes
      };
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Failed to get quote');
    }
  }

  // Execute bridge transaction
  async executeBridge(
    fromToken: Token,
    toToken: Token,
    amount: string,
    walletAddress: string,
    recipientAddress?: string,
    onProgress?: (status: string, data?: unknown) => void
  ): Promise<BridgeTransaction> {
    try {
      onProgress?.('Initializing Stellar bridge...');

      // Get quote first
      const quote = await this.getQuote(fromToken, toToken, amount, walletAddress);
      
      onProgress?.('Quote received', { quote });

      // Generate HTLC ID
      const htlcId = ethers.keccak256(ethers.toUtf8Bytes(`${walletAddress}-${Date.now()}-${Math.random()}`));
      
      // Generate preimage and hash
      const bytes = new Uint8Array(32);
      crypto.getRandomValues(bytes);
      const preimage = bytes;
      const hash = ethers.keccak256(preimage);

      onProgress?.('HTLC parameters generated', { htlcId, hash });

      // Determine bridge direction
      const isEthereumToStellar = fromToken.network === 'ethereum' && toToken.network === 'stellar';
      const isStellarToEthereum = fromToken.network === 'stellar' && toToken.network === 'ethereum';

      let transaction: BridgeTransaction;

      if (isEthereumToStellar) {
        transaction = await this.executeEthereumToStellar(
          fromToken, toToken, amount, walletAddress, recipientAddress, htlcId, hash, quote, onProgress
        );
      } else if (isStellarToEthereum) {
        transaction = await this.executeStellarToEthereum(
          fromToken, toToken, amount, walletAddress, recipientAddress, htlcId, hash, quote, onProgress
        );
      } else {
        throw new Error('Unsupported bridge direction');
      }

      onProgress?.('Bridge transaction completed', { transactionId: transaction.id });
      return transaction;

    } catch (error) {
      throw new Error(error instanceof Error ? error.message : 'Bridge execution failed');
    }
  }

  // Execute Ethereum to Stellar bridge
  private async executeEthereumToStellar(
    fromToken: Token,
    toToken: Token,
    amount: string,
    walletAddress: string,
    recipientAddress: string | undefined,
    htlcId: string,
    hash: string,
    quote: BridgeQuote,
    onProgress?: (status: string, data?: unknown) => void
  ): Promise<BridgeTransaction> {
    onProgress?.('Initiating Ethereum to Stellar bridge...');

    // Simulate contract interaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    onProgress?.('HTLC created on Ethereum', { htlcId });

    // Simulate Stellar transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    onProgress?.('Stellar transaction initiated');

    // Generate transaction ID
    const transactionId = ethers.keccak256(ethers.toUtf8Bytes(`${htlcId}-${Date.now()}`));

    return {
      id: transactionId,
      from: fromToken,
      to: toToken,
      fromAmount: {
        raw: quote.fromAmount,
        bn: parseUnits(quote.fromAmount, fromToken.decimals),
        decimals: fromToken.decimals,
        formatted: quote.fromAmount
      },
      toAmount: {
        raw: quote.toAmount,
        bn: parseUnits(quote.toAmount, toToken.decimals),
        decimals: toToken.decimals,
        formatted: quote.toAmount
      },
      fromAddress: walletAddress,
      toAddress: recipientAddress || walletAddress,
      status: 'pending',
      timestamps: {
        created: Date.now(),
        updated: Date.now()
      },
      txIdentifier: {
        ethereum: transactionId,
        stellar: ethers.keccak256(ethers.toUtf8Bytes(`stellar-${transactionId}`)),
        htlc: {
          id: htlcId,
          hash: hash,
          preimage: undefined
        }
      },
      fees: {
        network: {
          amount: {
            raw: quote.networkFee,
            bn: parseUnits(quote.networkFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.networkFee
          },
          amountUSD: parseFloat(quote.networkFee) * 0.1 // Mock XLM price
        },
        protocol: {
          amount: {
            raw: quote.protocolFee,
            bn: parseUnits(quote.protocolFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.protocolFee
          },
          amountUSD: parseFloat(quote.protocolFee) * 0.1,
          percent: 0.1
        },
        total: {
          amount: {
            raw: quote.totalFee,
            bn: parseUnits(quote.totalFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.totalFee
          },
          amountUSD: parseFloat(quote.totalFee) * 0.1
        }
      },
      confirmations: 0,
      requiredConfirmations: 6,
      isConfirmed: false,
      retryCount: 0
    };
  }

  // Execute Stellar to Ethereum bridge
  private async executeStellarToEthereum(
    fromToken: Token,
    toToken: Token,
    amount: string,
    walletAddress: string,
    recipientAddress: string | undefined,
    htlcId: string,
    hash: string,
    quote: BridgeQuote,
    onProgress?: (status: string, data?: unknown) => void
  ): Promise<BridgeTransaction> {
    onProgress?.('Initiating Stellar to Ethereum bridge...');

    // Simulate Stellar transaction
    await new Promise(resolve => setTimeout(resolve, 2000));

    onProgress?.('Stellar transaction confirmed', { htlcId });

    // Simulate Ethereum contract interaction
    await new Promise(resolve => setTimeout(resolve, 3000));

    onProgress?.('Ethereum transaction initiated');

    // Generate transaction ID
    const transactionId = ethers.keccak256(ethers.toUtf8Bytes(`${htlcId}-${Date.now()}`));

    return {
      id: transactionId,
      from: fromToken,
      to: toToken,
      fromAmount: {
        raw: quote.fromAmount,
        bn: parseUnits(quote.fromAmount, fromToken.decimals),
        decimals: fromToken.decimals,
        formatted: quote.fromAmount
      },
      toAmount: {
        raw: quote.toAmount,
        bn: parseUnits(quote.toAmount, toToken.decimals),
        decimals: toToken.decimals,
        formatted: quote.toAmount
      },
      fromAddress: walletAddress,
      toAddress: recipientAddress || walletAddress,
      status: 'pending',
      timestamps: {
        created: Date.now(),
        updated: Date.now()
      },
      txIdentifier: {
        stellar: transactionId,
        ethereum: ethers.keccak256(ethers.toUtf8Bytes(`ethereum-${transactionId}`)),
        htlc: {
          id: htlcId,
          hash: hash,
          preimage: undefined
        }
      },
      fees: {
        network: {
          amount: {
            raw: quote.networkFee,
            bn: parseUnits(quote.networkFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.networkFee
          },
          amountUSD: parseFloat(quote.networkFee) * 0.1 // Mock XLM price
        },
        protocol: {
          amount: {
            raw: quote.protocolFee,
            bn: parseUnits(quote.protocolFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.protocolFee
          },
          amountUSD: parseFloat(quote.protocolFee) * 0.1,
          percent: 0.1
        },
        total: {
          amount: {
            raw: quote.totalFee,
            bn: parseUnits(quote.totalFee, fromToken.decimals),
            decimals: fromToken.decimals,
            formatted: quote.totalFee
          },
          amountUSD: parseFloat(quote.totalFee) * 0.1
        }
      },
      confirmations: 0,
      requiredConfirmations: 6,
      isConfirmed: false,
      retryCount: 0
    };
  }

  // Get transaction status
  async getTransactionStatus(transactionId: string): Promise<{
    status: 'pending' | 'completed' | 'failed' | 'refunded';
    details?: unknown;
  }> {
    // Simulate status check
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Random status for demo
    const statuses: Array<'pending' | 'completed' | 'failed' | 'refunded'> = ['pending', 'completed', 'failed', 'refunded'];
    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
    
    return {
      status: randomStatus,
      details: {
        transactionId,
        timestamp: Date.now(),
        confirmations: randomStatus === 'completed' ? 6 : 0, // Stellar has faster confirmations
      }
    };
  }

  // Redeem HTLC
  async redeemHtlc(htlcId: string, preimage: string): Promise<{
    success: boolean;
    transactionId?: string;
    error?: string;
  }> {
    try {
      // Simulate redemption
      await new Promise(resolve => setTimeout(resolve, 1500)); // Faster than other chains
      
      return {
        success: true,
        transactionId: ethers.keccak256(ethers.toUtf8Bytes(`redeem-${htlcId}-${Date.now()}`)),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Redemption failed',
      };
    }
  }

  // Refund HTLC
  async refundHtlc(htlcId: string): Promise<{
    success: boolean;
    transactionId?: string;
    error?: string;
  }> {
    try {
      // Simulate refund
      await new Promise(resolve => setTimeout(resolve, 1500)); // Faster than other chains
      
      return {
        success: true,
        transactionId: ethers.keccak256(ethers.toUtf8Bytes(`refund-${htlcId}-${Date.now()}`)),
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Refund failed',
      };
    }
  }

  // Validate Stellar address
  validateStellarAddress(address: string): boolean {
    // Stellar addresses are 56 characters long and start with G, M, or S
    if (address.length !== 56) return false;
    
    // Check if it starts with a valid character
    if (!['G', 'M', 'S'].includes(address[0])) return false;
    
    // Check if all characters are valid base32
    const validChars = /^[A-Z2-7]+$/;
    return validChars.test(address);
  }

  // Get Stellar account info
  async getStellarAccountInfo(address: string): Promise<{
    exists: boolean;
    balance?: string;
    sequence?: string;
  }> {
    try {
      // Simulate Stellar account lookup
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo, assume account exists with some balance
      return {
        exists: true,
        balance: '100.0000000', // 100 XLM
        sequence: '123456789',
      };
    } catch (error) {
      return {
        exists: false,
      };
    }
  }
}

export const stellarBridgeService = StellarBridgeService.getInstance(); 