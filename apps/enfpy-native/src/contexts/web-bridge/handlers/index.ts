import {
  AppBridgeMessageHandler,
  CreateMessageHandlerArgs,
} from '@vrew/modules/commonBridge/appBridge/types/message'
import { devHandlers } from './dev'
import { navigationHandlers } from './navigation'
import { WebViewMessageEvent } from 'react-native-webview'
import {
  MessageError,
  RequestMessage,
} from '@vrew/modules/commonBridge/types/message'
import { AppBridgeReqActions } from '@vrew/modules/enfpyBridge/appBrdige/actions'
import {
  BridgeError,
  createResponseMessage,
} from '@vrew/modules/commonBridge/utils/messageUtil'

// TODO: createHandler 등을 통해 각 핸들러의 매개변수와 반환값이 추론되도록 변경
const appBridgeMessageHandler = {
  ...navigationHandlers,
  ...devHandlers,
}

/**
 * WEB => APP 요청에 대한 응답 처리
 * webView에서 수신한 web의 요청을 처리한다.
 */
export const createRequestMessageHandler = (args: CreateMessageHandlerArgs) =>
  async function messageHandler(e: WebViewMessageEvent): Promise<boolean> {
    if (!e?.nativeEvent?.data) {
      return false
    }

    const { data: message } = e.nativeEvent
    const { webView } = args
    const requestMessage = JSON.parse(
      message,
    ) as RequestMessage<AppBridgeReqActions>
    const { action, requestId: requestId } = requestMessage

    // WEB => APP 요청이 아닌 경우
    if (requestMessage.type !== 'request') {
      return false
    }

    console.log(`⚪️ [WEBVIEW_MESSAGE]_[REQUEST]_[${action}] \n ►`, {
      message: requestMessage,
    })

    const handler = appBridgeMessageHandler[
      action
    ] as AppBridgeMessageHandler<AppBridgeReqActions>

    try {
      if (!webView?.postMessage) {
        throw new BridgeError({
          action,
          requestId,
          error: {
            err_code: MessageError.NOT_FOUND_WEBVIEW,
            err_msg: 'webView를 찾을 수 없습니다!!',
          },
        })
      }

      // 에러 전송(정의되지 않은 action)
      if (typeof handler !== 'function') {
        throw new BridgeError({
          action,
          requestId,
          error: {
            err_code: MessageError.NOT_REGISTERED_ACTION,
            err_msg: 'Not registered action',
          },
        })
      }

      // 응답결과 전송
      const responseData = await handler(requestMessage, args)
      const responseMessage = createResponseMessage({
        action,
        requestId,
        data: responseData,
      })
      console.log(`🟢 [WEBVIEW_MESSAGE]_[RESPONSE]_[${action}] \n ►`, {
        message: responseMessage,
      })
      webView.postMessage(JSON.stringify(responseMessage))
    } catch (error: unknown) {
      console.log(`🔴 [WEBVIEW_MESSAGE]_[ERROR]_[${action}] \n ►`, { error })
      if (!webView) {
        throw new Error(`webView를 찾을 수 없습니다!! ${webView}`)
      }

      if (error instanceof BridgeError) {
        // TODO: [HANDLED_ERROR]error메세지 가공처리
        webView.postMessage(JSON.stringify(error))
        return false
      }

      // [UNHANDLED_ERROR] 예측하지 못한 에러
      webView.postMessage(JSON.stringify(error))

      throw error
    }

    return true
  }
