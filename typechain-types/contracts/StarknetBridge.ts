/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumberish,
  BytesLike,
  FunctionFragment,
  Result,
  Interface,
  EventFragment,
  AddressLike,
  ContractRunner,
  ContractMethod,
  Listener,
} from "ethers";
import type {
  TypedContractEvent,
  TypedDeferredTopicFilter,
  TypedEventLog,
  TypedLogDescription,
  TypedListener,
  TypedContractMethod,
} from "../common";

export interface StarknetBridgeInterface extends Interface {
  getFunction(
    nameOrSignature:
      | "MAX_BRIDGE_AMOUNT"
      | "MIN_BRIDGE_AMOUNT"
      | "bridgeFee"
      | "convertStarknetAddress"
      | "emergencyPause"
      | "emergencyWithdraw"
      | "getHtlc"
      | "htlcs"
      | "initiateFromStarknet"
      | "initiateToStarknet"
      | "isValidHtlc"
      | "owner"
      | "redeem"
      | "refund"
      | "renounceOwnership"
      | "transferOwnership"
      | "updateBridgeFee"
      | "wethToken"
      | "withdrawFees"
      | "wstarkToken"
  ): FunctionFragment;

  getEvent(
    nameOrSignatureOrTopic:
      | "Initiated"
      | "OwnershipTransferred"
      | "Redeemed"
      | "Refunded"
  ): EventFragment;

  encodeFunctionData(
    functionFragment: "MAX_BRIDGE_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "MIN_BRIDGE_AMOUNT",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "bridgeFee", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "convertStarknetAddress",
    values: [string]
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyPause",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "emergencyWithdraw",
    values: [AddressLike, BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "getHtlc", values: [BytesLike]): string;
  encodeFunctionData(functionFragment: "htlcs", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "initiateFromStarknet",
    values: [BytesLike, AddressLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "initiateToStarknet",
    values: [BytesLike, BigNumberish, BytesLike, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "isValidHtlc",
    values: [BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "redeem",
    values: [BytesLike, BytesLike]
  ): string;
  encodeFunctionData(functionFragment: "refund", values: [BytesLike]): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [AddressLike]
  ): string;
  encodeFunctionData(
    functionFragment: "updateBridgeFee",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "wethToken", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "withdrawFees",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "wstarkToken",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "MAX_BRIDGE_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "MIN_BRIDGE_AMOUNT",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "bridgeFee", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "convertStarknetAddress",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyPause",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "emergencyWithdraw",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getHtlc", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "htlcs", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "initiateFromStarknet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "initiateToStarknet",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isValidHtlc",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "redeem", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "refund", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateBridgeFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "wethToken", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFees",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "wstarkToken",
    data: BytesLike
  ): Result;
}

export namespace InitiatedEvent {
  export type InputTuple = [
    id: BytesLike,
    initiator: AddressLike,
    starknetAddress: BigNumberish,
    amount: BigNumberish
  ];
  export type OutputTuple = [
    id: string,
    initiator: string,
    starknetAddress: bigint,
    amount: bigint
  ];
  export interface OutputObject {
    id: string;
    initiator: string;
    starknetAddress: bigint;
    amount: bigint;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace OwnershipTransferredEvent {
  export type InputTuple = [previousOwner: AddressLike, newOwner: AddressLike];
  export type OutputTuple = [previousOwner: string, newOwner: string];
  export interface OutputObject {
    previousOwner: string;
    newOwner: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RedeemedEvent {
  export type InputTuple = [id: BytesLike, preimage: BytesLike];
  export type OutputTuple = [id: string, preimage: string];
  export interface OutputObject {
    id: string;
    preimage: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export namespace RefundedEvent {
  export type InputTuple = [id: BytesLike];
  export type OutputTuple = [id: string];
  export interface OutputObject {
    id: string;
  }
  export type Event = TypedContractEvent<InputTuple, OutputTuple, OutputObject>;
  export type Filter = TypedDeferredTopicFilter<Event>;
  export type Log = TypedEventLog<Event>;
  export type LogDescription = TypedLogDescription<Event>;
}

export interface StarknetBridge extends BaseContract {
  connect(runner?: ContractRunner | null): StarknetBridge;
  waitForDeployment(): Promise<this>;

  interface: StarknetBridgeInterface;

  queryFilter<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;
  queryFilter<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEventLog<TCEvent>>>;

  on<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  on<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  once<TCEvent extends TypedContractEvent>(
    event: TCEvent,
    listener: TypedListener<TCEvent>
  ): Promise<this>;
  once<TCEvent extends TypedContractEvent>(
    filter: TypedDeferredTopicFilter<TCEvent>,
    listener: TypedListener<TCEvent>
  ): Promise<this>;

  listeners<TCEvent extends TypedContractEvent>(
    event: TCEvent
  ): Promise<Array<TypedListener<TCEvent>>>;
  listeners(eventName?: string): Promise<Array<Listener>>;
  removeAllListeners<TCEvent extends TypedContractEvent>(
    event?: TCEvent
  ): Promise<this>;

  MAX_BRIDGE_AMOUNT: TypedContractMethod<[], [bigint], "view">;

  MIN_BRIDGE_AMOUNT: TypedContractMethod<[], [bigint], "view">;

  bridgeFee: TypedContractMethod<[], [bigint], "view">;

  convertStarknetAddress: TypedContractMethod<
    [_starknetAddressHex: string],
    [bigint],
    "view"
  >;

  emergencyPause: TypedContractMethod<[], [void], "nonpayable">;

  emergencyWithdraw: TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;

  getHtlc: TypedContractMethod<
    [id: BytesLike],
    [
      [string, bigint, bigint, string, bigint, boolean, boolean] & {
        initiator: string;
        starknetAddress: bigint;
        amount: bigint;
        hash: string;
        timelock: bigint;
        executed: boolean;
        refunded: boolean;
      }
    ],
    "view"
  >;

  htlcs: TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, bigint, bigint, string, bigint, boolean, boolean] & {
        initiator: string;
        starknetAddress: bigint;
        amount: bigint;
        hash: string;
        timelock: bigint;
        executed: boolean;
        refunded: boolean;
      }
    ],
    "view"
  >;

  initiateFromStarknet: TypedContractMethod<
    [
      id: BytesLike,
      _ethereumAddress: AddressLike,
      _amount: BigNumberish,
      _hash: BytesLike,
      _timelock: BigNumberish
    ],
    [void],
    "nonpayable"
  >;

  initiateToStarknet: TypedContractMethod<
    [
      id: BytesLike,
      _starknetAddress: BigNumberish,
      _hash: BytesLike,
      _timelock: BigNumberish
    ],
    [void],
    "payable"
  >;

  isValidHtlc: TypedContractMethod<[id: BytesLike], [boolean], "view">;

  owner: TypedContractMethod<[], [string], "view">;

  redeem: TypedContractMethod<
    [id: BytesLike, _preimage: BytesLike],
    [void],
    "nonpayable"
  >;

  refund: TypedContractMethod<[id: BytesLike], [void], "nonpayable">;

  renounceOwnership: TypedContractMethod<[], [void], "nonpayable">;

  transferOwnership: TypedContractMethod<
    [newOwner: AddressLike],
    [void],
    "nonpayable"
  >;

  updateBridgeFee: TypedContractMethod<
    [_newFee: BigNumberish],
    [void],
    "nonpayable"
  >;

  wethToken: TypedContractMethod<[], [string], "view">;

  withdrawFees: TypedContractMethod<[], [void], "nonpayable">;

  wstarkToken: TypedContractMethod<[], [string], "view">;

  getFunction<T extends ContractMethod = ContractMethod>(
    key: string | FunctionFragment
  ): T;

  getFunction(
    nameOrSignature: "MAX_BRIDGE_AMOUNT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "MIN_BRIDGE_AMOUNT"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "bridgeFee"
  ): TypedContractMethod<[], [bigint], "view">;
  getFunction(
    nameOrSignature: "convertStarknetAddress"
  ): TypedContractMethod<[_starknetAddressHex: string], [bigint], "view">;
  getFunction(
    nameOrSignature: "emergencyPause"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "emergencyWithdraw"
  ): TypedContractMethod<
    [_token: AddressLike, _amount: BigNumberish],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "getHtlc"
  ): TypedContractMethod<
    [id: BytesLike],
    [
      [string, bigint, bigint, string, bigint, boolean, boolean] & {
        initiator: string;
        starknetAddress: bigint;
        amount: bigint;
        hash: string;
        timelock: bigint;
        executed: boolean;
        refunded: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "htlcs"
  ): TypedContractMethod<
    [arg0: BytesLike],
    [
      [string, bigint, bigint, string, bigint, boolean, boolean] & {
        initiator: string;
        starknetAddress: bigint;
        amount: bigint;
        hash: string;
        timelock: bigint;
        executed: boolean;
        refunded: boolean;
      }
    ],
    "view"
  >;
  getFunction(
    nameOrSignature: "initiateFromStarknet"
  ): TypedContractMethod<
    [
      id: BytesLike,
      _ethereumAddress: AddressLike,
      _amount: BigNumberish,
      _hash: BytesLike,
      _timelock: BigNumberish
    ],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "initiateToStarknet"
  ): TypedContractMethod<
    [
      id: BytesLike,
      _starknetAddress: BigNumberish,
      _hash: BytesLike,
      _timelock: BigNumberish
    ],
    [void],
    "payable"
  >;
  getFunction(
    nameOrSignature: "isValidHtlc"
  ): TypedContractMethod<[id: BytesLike], [boolean], "view">;
  getFunction(
    nameOrSignature: "owner"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "redeem"
  ): TypedContractMethod<
    [id: BytesLike, _preimage: BytesLike],
    [void],
    "nonpayable"
  >;
  getFunction(
    nameOrSignature: "refund"
  ): TypedContractMethod<[id: BytesLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "renounceOwnership"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "transferOwnership"
  ): TypedContractMethod<[newOwner: AddressLike], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "updateBridgeFee"
  ): TypedContractMethod<[_newFee: BigNumberish], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "wethToken"
  ): TypedContractMethod<[], [string], "view">;
  getFunction(
    nameOrSignature: "withdrawFees"
  ): TypedContractMethod<[], [void], "nonpayable">;
  getFunction(
    nameOrSignature: "wstarkToken"
  ): TypedContractMethod<[], [string], "view">;

  getEvent(
    key: "Initiated"
  ): TypedContractEvent<
    InitiatedEvent.InputTuple,
    InitiatedEvent.OutputTuple,
    InitiatedEvent.OutputObject
  >;
  getEvent(
    key: "OwnershipTransferred"
  ): TypedContractEvent<
    OwnershipTransferredEvent.InputTuple,
    OwnershipTransferredEvent.OutputTuple,
    OwnershipTransferredEvent.OutputObject
  >;
  getEvent(
    key: "Redeemed"
  ): TypedContractEvent<
    RedeemedEvent.InputTuple,
    RedeemedEvent.OutputTuple,
    RedeemedEvent.OutputObject
  >;
  getEvent(
    key: "Refunded"
  ): TypedContractEvent<
    RefundedEvent.InputTuple,
    RefundedEvent.OutputTuple,
    RefundedEvent.OutputObject
  >;

  filters: {
    "Initiated(bytes32,address,uint256,uint256)": TypedContractEvent<
      InitiatedEvent.InputTuple,
      InitiatedEvent.OutputTuple,
      InitiatedEvent.OutputObject
    >;
    Initiated: TypedContractEvent<
      InitiatedEvent.InputTuple,
      InitiatedEvent.OutputTuple,
      InitiatedEvent.OutputObject
    >;

    "OwnershipTransferred(address,address)": TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;
    OwnershipTransferred: TypedContractEvent<
      OwnershipTransferredEvent.InputTuple,
      OwnershipTransferredEvent.OutputTuple,
      OwnershipTransferredEvent.OutputObject
    >;

    "Redeemed(bytes32,bytes32)": TypedContractEvent<
      RedeemedEvent.InputTuple,
      RedeemedEvent.OutputTuple,
      RedeemedEvent.OutputObject
    >;
    Redeemed: TypedContractEvent<
      RedeemedEvent.InputTuple,
      RedeemedEvent.OutputTuple,
      RedeemedEvent.OutputObject
    >;

    "Refunded(bytes32)": TypedContractEvent<
      RefundedEvent.InputTuple,
      RefundedEvent.OutputTuple,
      RefundedEvent.OutputObject
    >;
    Refunded: TypedContractEvent<
      RefundedEvent.InputTuple,
      RefundedEvent.OutputTuple,
      RefundedEvent.OutputObject
    >;
  };
}
