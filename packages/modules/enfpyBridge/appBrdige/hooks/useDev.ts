import { enfpyAppBridge } from '..'
import { AppBridgeActionDatas } from '../actions'

export const devMessages = {
  consoleLog: (args: AppBridgeActionDatas['dev-console-log']) => {
    return enfpyAppBridge.request({
      action: 'dev-console-log',
      data: args,
    })
  },
}

export const useDev = () => devMessages
