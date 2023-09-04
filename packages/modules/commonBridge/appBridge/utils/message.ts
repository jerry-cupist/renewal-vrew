import { ResponseMessage } from "../../types/message";
import {
  createRequestMessage,
  createResponseMessage,
} from "../../utils/messageUtil";

type PostMessageType = "request" | "response";
type MessageEventHandler = (event: MessageEvent) => void;

/**
 * WEB => APP의 요청과 APP => WEB의 응답을 처리한다.
 * @param param.timeout {number} (default:3000)
 * TODO: 응답타입 추론
 */
export const postMessage = <
  ActionType extends string = string,
  DataType = any
>(params: {
  action: ActionType;
  data?: DataType;
  timeout?: number;
  type: PostMessageType;
  /** MessageType이 response인 경우 필수 */
  requestId?: number;
}): Promise<ResponseMessage<ActionType>> =>
  new Promise((resolve, reject) => {
    const { action, data, timeout = 3000, type } = params;
    const isRequestMessage =
      type === "request" && typeof params.requestId === "undefined";
    const isResponseMessage = type === "response";

    let timeId: null | number = null;
    let handleResponseMessage: MessageEventHandler = () => {};

    try {
      const webView =
        typeof window !== "undefined"
          ? (window as any).ReactNativeWebView
          : null;

      if (!webView) {
        throw new Error("[POST_MESSAGE] 웹뷰를 찾을 수 없습니다");
      }

      if (isRequestMessage) {
        timeId = setTimeout(() => {
          reject(new Error(`[POST_MESSAGE]_[TIMEOUT] ${action}`));
        }, timeout);
      }

      if (isResponseMessage && typeof params.requestId !== "number") {
        throw new Error(
          `[POST_MESSAGE]_RES requestId를 찾을 수 없습니다: ${params.requestId}`
        );
      }

      const message =
        params.type === "request"
          ? createRequestMessage(action, data)
          : createResponseMessage(action, params.requestId as number, data);

      webView.postMessage(JSON.stringify(message));

      if (isRequestMessage) {
        handleResponseMessage = (event: MessageEvent<string>) => {
          try {
            const { data } = event;
            const requestMessage = message;
            const responseMessage = JSON.parse(
              data
            ) as ResponseMessage<ActionType>;
            if (requestMessage.request_id !== responseMessage.request_id) {
              return;
            }

            window.removeEventListener("message", handleResponseMessage);
            if (typeof timeId === "number") {
              clearTimeout(timeId);
            }

            resolve(responseMessage);
          } catch (error: unknown) {
            reject(error);
          }
        };

        window.addEventListener("message", handleResponseMessage);
      }
    } catch (error: unknown) {
      if (isRequestMessage) {
        window.removeEventListener("message", handleResponseMessage);
      }
      reject(error);
    }
  });

export type AppPostMessage<
  ActionType extends string = string,
  DataType = any
> = (params: {
  action: ActionType;
  data?: DataType | undefined;
  timeout?: number | undefined;
  type: PostMessageType;
  requestId?: number | undefined;
}) => Promise<ResponseMessage<ActionType>>;
