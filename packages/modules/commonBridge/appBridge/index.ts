/**
 * WEB => APP 요청 흐름 관리
 */

import { AppPostMessage, postMessage } from "./utils";

export interface AppBridge<Actions extends string = string> {
  postMessage: AppPostMessage<Actions>;
}

const appBridge: AppBridge = {
  postMessage,
};

export default appBridge;
