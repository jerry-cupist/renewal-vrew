"use client";

import { PropsWithChildren, useEffect } from "react";
import enfpyApiClient from "../apis";
import { EnfpyRequestConfig } from "@vrew/apis/enfpy";

import {
  MessageError,
  RequestMessage,
} from "@vrew/modules/commonBridge/types/message";
import { AppBridgeAction } from "@vrew/modules/enfpyBridge/webBrdige/actions";
import { WebViewMessageError } from "@vrew/modules/commonBridge/utils/messageUtil";
import { enfpyAppBridge } from "@vrew/modules/enfpyBridge/appBrdige";
import {
  FETCHER_ACTION_TYPES,
  FetcherActionType,
} from "@vrew/modules/commonBridge/webBridge/buildFetcher";

/**
 * TODO: 메세지 출처 검증 필요
 */
const isNetworkRequestMessage = (message: RequestMessage<AppBridgeAction>) =>
  message.action === FETCHER_ACTION_TYPES.FETCHER_REQUEST &&
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
          FetcherActionType["FETCHER_REQUEST"],
          EnfpyRequestConfig
        >;
        requestId = message.request_id;

        if (!isNetworkRequestMessage(message)) {
          return;
        }

        const axiosConfig = message.data;
        const response = await enfpyApiClient.request(axiosConfig);

        enfpyAppBridge.postMessage({
          action: FETCHER_ACTION_TYPES.FETCHER_REQUEST,
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
            FETCHER_ACTION_TYPES.FETCHER_REQUEST,
            requestId,
            {
              err_code: MessageError.NOT_REGISTERED_ACTION,
              err_msg: errorMessage,
            }
          );
        }

        enfpyAppBridge.postMessage({
          action: FETCHER_ACTION_TYPES.FETCHER_REQUEST,
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
