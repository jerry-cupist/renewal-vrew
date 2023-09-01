import { WebBridgeActions } from "./action";
import WebView from "react-native-webview";
import { NavigationProp } from "@react-navigation/native";

export enum MessageError {
  NOT_REGISTERED_ACTION = 4004,
  REQUEST_TIMEOUT = 5000,
}

export interface RequestMessage<D = any> {
  type: "request";
  action: WebBridgeActions;
  request_id: number;
  data: D;
}

export interface ResponseMessage<D = any> {
  type: "response";
  action: WebBridgeActions;
  request_id: number;
  data: D;
}

export interface BridgeError {
  err_code: number;
  err_msg: string;
}

export interface ErrorMessage {
  type: "error";
  action: WebBridgeActions;
  request_id: number;
  error: BridgeError;
}

export interface CreateMessageHandlerArgs {
  navigation: NavigationProp<any>;
  webView: WebView;
  id: string;
}

<<<<<<< HEAD
export type WebBridgeMessageHandler<TPayload = any, TResult = any> = (
=======
export type WebBridgeMessageHandler<TPayload = any, TResult = void> = (
>>>>>>> d70c0acd15d57a388898c7531e99829fa5906a0a
  payload: RequestMessage<TPayload>,
  messageHandlerArgs: CreateMessageHandlerArgs
) => TResult | Promise<TResult>;
