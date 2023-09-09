import webBridge, { WebBridge } from '../../commonBridge/webBridge'
import { AppBridgeAction } from './actions'

/**
 * APP(RN)에서 WEB에 요청
 */
export const enfpyWebBridge = webBridge as WebBridge<AppBridgeAction>
