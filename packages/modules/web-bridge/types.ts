export enum BridgeActions {
  NAVIGATION_NAVIGATE = "navigation-navigate",
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

export interface EventMessage<D = any> {
  type: "event";
  action: BridgeActions;
  connect_id: number;
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
