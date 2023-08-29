export enum BridgeActions {
  NAVIGATION_NAVIGATE = "navigation-navigate",
  NAVIGATION_GO_BACK = "navigation-go-back",
  NAVIGATION_CAN_GO_BACK = "navigation-can-go-back",
  NAVIGATION_PUSH = "navigation-push",
  NAVIGATION_POP_TO_TOP = "navigation-pop-to-top",
  NAVIGATION_POP = "navigation-pop",
  NAVIGATION_REPLACE = "navigation-replace",
  NAVIGATION_RESET = "navigation-reset",
  NAVIGATION_RELOAD = "navigation-reload",
  NAVIGATION_SET_OPTIONS = "navigation-set-options",
}

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