export enum MessageError {
  NOT_REGISTERED_ACTION = 4004,
  REQUEST_TIMEOUT = 5000,
}

type BridgeMessageType = "request" | "response" | "error";

export interface BridgeMessage<
  ActionType extends string = string,
  DataType = any
> {
  type: BridgeMessageType;
  action: ActionType;
  data: DataType;
}
export interface RequestMessage<
  ActionType extends string = string,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "request";
  request_id: number;
}

export interface ResponseMessage<
  ActionType extends string = string,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "response";
  request_id: number;
}

export interface BridgeError {
  err_code: number;
  err_msg: string;
}

export interface ErrorMessage<
  ActionType extends string = string,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "error";
  request_id: number;
  error: BridgeError;
}
