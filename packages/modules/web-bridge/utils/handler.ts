import { WebBridgeMessageHandler } from "../types/message";

export const createMessageHandler = <P, R = void>(
  handler: WebBridgeMessageHandler<P, R>
) => handler;

export const createMessageHandlers = <T extends string, P, R>(
  handler: Record<T, WebBridgeMessageHandler<P, R>>
) => {
  return handler;
};
