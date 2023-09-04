"use client";

import { PropsWithChildren, useEffect } from "react";
import enfpyApiClient from "../apis";
import { EnfpyRequestConfig } from "@vrew/apis/enfpy";
import { AppBridgeAction, RequestMessage } from "@vrew/modules/app-bridge";
import messageUtil, {
  WebViewMessageError,
} from "@vrew/modules/web-bridge/utils/message";
import { MessageError } from "@vrew/modules/web-bridge/types/message";

/**
 * TODO: 메세지 출처 검증 필요
 */
const isNetworkRequestMessage = (message: RequestMessage) =>
  message.action === AppBridgeAction.NETWORK_REQUEST &&
  message.type === "request" &&
  typeof message.request_id === "number";

/**
 * APP의 네트워크 요청 처리
 */
const RequestMessageHandler = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const requestMessageHandler = async (event: MessageEvent<string>) => {
      if (typeof event.data !== "string") {
        return;
      }

      let requestId: null | number = null;

      try {
        const message = JSON.parse(event.data) as RequestMessage<
          AppBridgeAction.NETWORK_REQUEST,
          EnfpyRequestConfig
        >;
        requestId = message.request_id;

        if (!isNetworkRequestMessage(message)) {
          return;
        }

        const axiosConfig = message.data;
        const response = await enfpyApiClient.request(axiosConfig);

        messageUtil.postMessage({
          action: AppBridgeAction.NETWORK_REQUEST,
          data: {
            data: response.data,
            config: {
              baseURL: response.config.baseURL,
              url: response.config.url,
              timeout: response.config.timeout,
            },
          },
          type: "response",
          requestId: message.request_id,
        });
      } catch (error) {
        let responseError = error;

        if (requestId !== null) {
          // TODO: 메세지 가공필요
          const errorMessage = "통신에러";
          responseError = new WebViewMessageError(
            AppBridgeAction.NETWORK_REQUEST,
            requestId,
            {
              err_code: MessageError.NOT_REGISTERED_ACTION,
              err_msg: errorMessage,
            }
          );
        }

        messageUtil.postMessage({
          action: AppBridgeAction.NETWORK_REQUEST,
          type: "response",
          data: responseError,
        });
      }
    };

    window.addEventListener("message", requestMessageHandler);

    return () => {
      window.removeEventListener("message", requestMessageHandler);
    };
  }, []);

  return <>{children}</>;
};
export default RequestMessageHandler;
