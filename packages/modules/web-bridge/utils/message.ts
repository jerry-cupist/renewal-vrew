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

export const postMessage = <
  ActionType extends WebBridgeActions,
  DataType extends WebBridgeActionDatas[ActionType]
>(
  action: ActionType,
  data?: DataType
) =>
  new Promise<ResponseMessage>((resolve, reject) => {
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
      }, 3000);

      const message = createRequestMessage(action, data);
      webView.postMessage(JSON.stringify(message));

      handleMessage = (event: MessageEvent<string>) => {
        window.removeEventListener("message", handleMessage);
        try {
          const { data } = event;

          if (typeof timeId === "number") {
            clearTimeout(timeId);
          }

          const receivedMessage = JSON.parse(data) as ResponseMessage;
          resolve(receivedMessage);
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
