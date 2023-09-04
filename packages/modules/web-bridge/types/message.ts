import { WebBridgeActions } from "./action";
import WebView from "react-native-webview";
import { NavigationProp } from "@react-navigation/native";
import { AppBridgeAction } from "../../app-bridge";

export enum MessageError {
  NOT_REGISTERED_ACTION = 4004,
  REQUEST_TIMEOUT = 5000,
}

export type BridgeActions = WebBridgeActions | AppBridgeAction;

export interface BridgeMessage<
  ActionType extends BridgeActions,
  DataType = any
> {
  type: "request" | "response";
  action: ActionType;
  request_id: number;
  data: DataType;
}
export interface RequestMessage<
  ActionType extends BridgeActions = BridgeActions,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "request";
}

export interface ResponseMessage<
  ActionType extends BridgeActions = BridgeActions,
  DataType = any
> extends BridgeMessage<ActionType, DataType> {
  type: "response";
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

export interface CreateMessageHandlerArgs {
  navigation: NavigationProp<any>;
  webView: WebView;
  id: string;
}

export type WebBridgeMessageHandler<TPayload = any, TResult = any> = (
  payload: BridgeMessage<WebBridgeActions, TPayload>,
  messageHandlerArgs: CreateMessageHandlerArgs
) => TResult | Promise<TResult>;
