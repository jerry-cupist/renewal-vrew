import { BridgeActions } from "./action";

export enum MessageError {
  NOT_REGISTERED_ACTION = 4004,
  REQUEST_TIMEOUT = 5000,
}

export interface RequestMessage<D = any> {
  type: "request";
  action: BridgeActions;
  request_id: number;
  data: D;
}

export interface ResponseMessage<D = any> {
  type: "response";
  action: BridgeActions;
  request_id: number;
  data: D;
}

export interface BridgeError {
  err_code: number;
  err_msg: string;
}

export interface ErrorMessage {
  type: "error";
  action: BridgeActions;
  request_id: number;
  error: BridgeError;
}
