/**
 * RN(webView) => Web 브릿지 코드
 */

import { RequestMessageType, requestMessage } from "./postMessage";

export interface WebBridge<Actions extends string = string> {
  requestMessage: RequestMessageType<Actions>;
}

const webBridge: WebBridge = { requestMessage };

export default webBridge;
