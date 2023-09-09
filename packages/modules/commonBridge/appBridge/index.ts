/**
 * WEB => APP 요청 흐름 관리
 */

import {
  AppRequestMessage,
  AppResponseMessage,
  requestMessage,
  responseMessage,
} from './utils'

export interface AppBridge<Actions extends string = string> {
  request: AppRequestMessage<Actions>
  response: AppResponseMessage<Actions>
}

// TODO:에러 응답처리 확인 필요, response외에 별도로 필요할지?
const appBridge: AppBridge = {
  request: requestMessage,
  response: responseMessage,
}

export default appBridge
