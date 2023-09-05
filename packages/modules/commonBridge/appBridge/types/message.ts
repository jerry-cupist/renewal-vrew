import WebView from "react-native-webview";
import { NavigationProp } from "@react-navigation/native";
import { BridgeMessage } from "../../types/message";

export interface CreateMessageHandlerArgs {
  navigation: NavigationProp<any>;
  webView: WebView;
  id: string;
}

export type AppBridgeMessageHandler<
  ActionType extends string = string,
  TPayload = any,
  TResult = any
> = (
  payload: BridgeMessage<"request", ActionType, TPayload>,
  messageHandlerArgs: CreateMessageHandlerArgs
) => TResult | Promise<TResult>;
