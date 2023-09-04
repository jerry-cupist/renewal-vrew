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
  WebViewMessageError,
  createResponseMessage,
} from '@vrew/modules/web-bridge/utils';

// TODO: createHandler 등을 통해 각 핸들러의 매개변수와 반환값이 추론되도록 변경
const webBridgeMessageHandler = {
  ...navigationHandlers,
  ...devHandlers,
};

export const createMessageHandler = (args: CreateMessageHandlerArgs) =>
  async function messageHandler(e: WebViewMessageEvent): Promise<boolean> {
    if (!e?.nativeEvent?.data) {
      return false;
    }

    const {data: message} = e.nativeEvent;
    const {webView} = args;
    const requestMessage = JSON.parse(message) as RequestMessage;
    const {action, request_id: requestId} = requestMessage;
    console.log(`⚪️ [WEBVIEW_MESSAGE]_[REQUEST]_[${action}] \n ►`, {
      message: requestMessage,
    });

    const handler: WebBridgeMessageHandler = webBridgeMessageHandler[action];

    try {
      if (!webView?.postMessage) {
        throw new Error(`webView를 찾을 수 없습니다!! ${webView}`);
      }

      // 에러 전송(정의되지 않은 action)
      if (typeof handler !== 'function') {
        throw new WebViewMessageError(action, requestId, {
          err_code: MessageError.NOT_REGISTERED_ACTION,
          err_msg: 'Not registered action',
        });
      }

      // 응답결과 전송
      const responseData = await handler(requestMessage, args);
      const responseMessage = createResponseMessage(
        action,
        requestId,
        responseData,
      );
      console.log(`🟢 [WEBVIEW_MESSAGE]_[RESPONSE]_[${action}] \n ►`, {
        message: responseMessage,
      });
      webView.postMessage(JSON.stringify(responseMessage));
    } catch (error: unknown) {
      console.log(`🔴 [WEBVIEW_MESSAGE]_[ERROR]_[${action}] \n ►`, {error});
      if (!webView) {
        throw new Error(`webView를 찾을 수 없습니다!! ${webView}`);
      }

      // error메세지 가공처리
      if (error instanceof WebViewMessageError) {
        webView.postMessage(JSON.stringify(error));
        return false;
      }

      throw error;
    }

    return true;
  };
