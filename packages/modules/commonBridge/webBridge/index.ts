/**
 * RN(webView) => Web 브릿지 코드
 */

import { BridgeMessage } from "../types/message";
import postMessage, { PostMessageParams } from "./postMessage";

type PostMessageType<ActionType extends string = string, ResponseType = any> = (
  params: PostMessageParams
) => Promise<BridgeMessage<ActionType, ResponseType>>;

export interface WebBridge<Actions extends string = string> {
  postMessage: PostMessageType<Actions>;
}

const webBridge: WebBridge = { postMessage };

export default webBridge;
