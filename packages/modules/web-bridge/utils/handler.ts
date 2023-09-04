import { WebBridgeActions } from "../types/action";
import { WebBridgeMessageHandler } from "../types/message";

export const createMessageHandler = <P, R = void>(
  handler: WebBridgeMessageHandler<P, R>
) => handler;

export const createMessageHandlers = <T extends WebBridgeActions>(
  handler: Record<T, WebBridgeMessageHandler>
) => {
  return handler;
};
