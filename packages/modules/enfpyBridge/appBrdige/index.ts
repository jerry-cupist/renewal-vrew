import appBridge, { AppBridge } from "../../commonBridge/appBridge";
import { RequestMessage } from "../../commonBridge/types/message";
import { AppBridgeReqActions, AppBridgeResActions } from "./actions";

export type EnfpyAppBridgeRequestMessage = RequestMessage<AppBridgeReqActions>;

/**
 * WEB에서 APP에 요청
 */
export const enfpyAppBridge = appBridge as AppBridge<
  AppBridgeReqActions | AppBridgeResActions
>;
