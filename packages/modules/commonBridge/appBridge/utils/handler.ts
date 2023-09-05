import { AppBridgeMessageHandler } from "../types/message";

export const createMessageHandler = <
  ActionType extends string,
  PlayLoadType = any,
  ResultType = void
>(
  handler: AppBridgeMessageHandler<ActionType, PlayLoadType, ResultType>
) => handler;

export const createMessageHandlers = <Actions extends string>(handlers: {
  [Action in Actions]: AppBridgeMessageHandler<Action>;
}) => handlers;
