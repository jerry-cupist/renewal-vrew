import { WebBridgeMessageHandler } from "../types/message";

export const createMessageHandler = <P, R = void>(
  handler: WebBridgeMessageHandler<P, R>
) => handler;
