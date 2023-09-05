"use client";

import { PropsWithChildren, useEffect } from "react";
import enfpyApiClient from "../apis";
import { EnfpyRequestConfig } from "@vrew/apis/enfpy";

import {
  MessageError,
  RequestMessage,
} from "@vrew/modules/commonBridge/types/message";
import { AppBridgeAction } from "@vrew/modules/enfpyBridge/webBrdige/actions";
import { BridgeError } from "@vrew/modules/commonBridge/utils/messageUtil";
import { enfpyAppBridge } from "@vrew/modules/enfpyBridge/appBrdige";
import {
  FETCHER_ACTION,
  FetcherActionType,
} from "@vrew/modules/commonBridge/webBridge/buildFetcher";

/**
 * TODO: 메세지 출처 검증 필요
 */
const isNetworkRequestMessage = (message: RequestMessage<AppBridgeAction>) =>
  message.action === FETCHER_ACTION.FETCHER_REQUEST &&
  message.type === "request" &&
  typeof message.requestId === "number";

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
        requestId = message.requestId;

        if (!isNetworkRequestMessage(message)) {
          return;
        }

        const axiosConfig = message.data;
        const response = await enfpyApiClient.request(axiosConfig);

        enfpyAppBridge.response({
          action: FETCHER_ACTION.FETCHER_REQUEST,
          requestId: message.requestId,
          data: {
            data: response.data,
            config: {
              baseURL: response.config.baseURL,
              url: response.config.url,
              timeout: response.config.timeout,
            },
          },
        });
      } catch (error) {
        let responseError = error;

        if (requestId !== null) {
          // TODO: 에러 메세지 가공필요
          const errorMessage = "통신에러";
          responseError = new BridgeError({
            action: FETCHER_ACTION.FETCHER_REQUEST,
            requestId,
            error: {
              err_code: MessageError.NOT_REGISTERED_ACTION,
              err_msg: errorMessage,
            },
          });

          enfpyAppBridge.response({
            action: FETCHER_ACTION.FETCHER_REQUEST,
            requestId,
            data: responseError,
          });
        }
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
