import {
  RequestMessage,
  ResponseMessage,
  ErrorMessage,
  BridgeError,
} from "../types/message";
import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";

const createRequestIdUtil = () => {
  let requestId = 0;
  return { get: () => requestId, increase: () => ++requestId };
};

const requestIdUtil = createRequestIdUtil();

export const createRequestMessage = <
  ActionType extends WebBridgeActions,
  DataType extends WebBridgeActionDatas[ActionType]
>(
  action: WebBridgeActions,
  data: DataType
): RequestMessage => ({
  type: "request",
  action,
  request_id: requestIdUtil.increase(),
  data,
});

export const createResponseMessage = <D>(
  action: WebBridgeActions,
  request_id: number,
  data: D
): ResponseMessage<D> => ({
  type: "response",
  action,
  request_id,
  data,
});

/**
 * @deprecated WebViewMessageError 사용 권고
 */
export const createErrorMessage = (
  action: WebBridgeActions,
  request_id: number,
  error: BridgeError
): ErrorMessage => ({
  type: "error",
  action,
  request_id,
  error,
});

export class WebViewMessageError extends Error {
  constructor(
    public action: WebBridgeActions,
    public request_id: number,
    public error: BridgeError
  ) {
    super();
    this.name = "WebViewMessageError";
  }
}

/**
 *
 * @param param.timeout {number} (default:3000)
 * @returns
 */
export const postMessage = <
  ActionType extends WebBridgeActions,
  DataType extends WebBridgeActionDatas[ActionType]
>(params: {
  action: ActionType;
  data?: DataType;
  timeout?: number;
}) =>
  new Promise<ResponseMessage>((resolve, reject) => {
    const { action, data, timeout = 3000 } = params;

    let timeId: null | number = null;
    let handleMessage = (event: MessageEvent<string>) => {};

    try {
      const webView =
        typeof window !== "undefined"
          ? (window as any).ReactNativeWebView
          : null;

      if (!webView) {
        throw new Error("[POST_MESSAGE] 웹뷰를 찾을 수 없습니다");
      }

      timeId = setTimeout(() => {
        reject(new Error(`[POST_MESSAGE]_[TIMEOUT] ${action}`));
      }, timeout);

      const requestMessage = createRequestMessage(action, data);
      webView.postMessage(JSON.stringify(requestMessage));

      handleMessage = (event: MessageEvent<string>) => {
        try {
          const { data } = event;

          const responseMessage = JSON.parse(data) as ResponseMessage;
          if (requestMessage.request_id !== responseMessage.request_id) {
            return;
          }

          window.removeEventListener("message", handleMessage);
          if (typeof timeId === "number") {
            clearTimeout(timeId);
          }

          resolve(responseMessage);
        } catch (error: unknown) {
          reject(error);
        }
      };

      window.addEventListener("message", handleMessage);
    } catch (error: unknown) {
      window.removeEventListener("message", handleMessage);
      reject(error);
    }
  });

const messageUtil = {
  createRequestMessage,
  createResponseMessage,
  createErrorMessage,
  postMessage,
};

export default messageUtil;
