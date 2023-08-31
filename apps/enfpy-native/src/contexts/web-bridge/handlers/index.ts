import {
  CreateMessageHandlerArgs,
  MessageError,
  RequestMessage,
  WebBridgeMessageHandler,
} from '@vrew/modules/web-bridge/types/message';
import {devHandlers} from './dev';
import {navigationHandlers} from './navigation';
import {WebViewMessageEvent} from 'react-native-webview';
import {
  createErrorMessage,
  createResponseMessage,
} from '@vrew/modules/web-bridge/utils';

// TODO: createHandler 등을 통해 각 핸들러의 매개변수와 반환값이 추론되도록 변경
const webBridgeMessageHandler = {
  ...navigationHandlers,
  ...devHandlers,
};

export const createMessageHandler =
  (args: CreateMessageHandlerArgs) =>
  async (e: WebViewMessageEvent): Promise<boolean> => {
    if (!e?.nativeEvent?.data) {
      return false;
    }

    const {data: message} = e.nativeEvent;
    const {webView} = args;
    const requestMessage = JSON.parse(message) as RequestMessage;
    const {action, request_id: requestId} = requestMessage;

    const handler: WebBridgeMessageHandler = webBridgeMessageHandler[action];

    if (!webView?.postMessage) {
      console.log('webView를 찾을 수 없습니다!!', {webView});
      return false;
    }

    console.log({action, requestMessage});

    // 에러 전송(정의되지 않은 action)
    if (typeof handler !== 'function') {
      const errorMessage = createErrorMessage(action, requestId, {
        err_code: MessageError.NOT_REGISTERED_ACTION,
        err_msg: 'Not registered action',
      });
      webView.postMessage(JSON.stringify(errorMessage));

      return false;
    }

    // 응답결과 전송
    try {
      const responseData = await handler(requestMessage, args);
      const responseMessage = createResponseMessage(
        action,
        requestId,
        responseData,
      );
      webView.postMessage(JSON.stringify(responseMessage));
    } catch (err) {
      if (!webView) {
        console.log('2.webView를 찾을 수 없습니다!!');
        return false;
      }

      // TODO: 에러 타입에 따른 error message 전송
      // 1. timeout
      // 2. 각 handler 이벤트 실패
      const errorMessage = createErrorMessage(action, requestId, {
        err_code: 0,
        err_msg: 'error message',
      });
      webView.postMessage(JSON.stringify(errorMessage));
      return false;
    }

    return true;
  };
