import {
  AppBridgeActionDatas,
  AppBridgeReqActions,
} from '@vrew/modules/enfpyBridge/appBrdige/actions'

import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/commonBridge/appBridge/utils'
import {
  AppBridgeActionDatas,
  AppBridgeReqActions,
} from '@vrew/modules/enfpyBridge/appBrdige/actions';
import { StartWith } from '../../../types/util'
import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/commonBridge/appBridge/utils'

const consoleLog = createMessageHandler<
  'dev-console-log',
  AppBridgeActionDatas['dev-console-log']
>(({ data }) => {
  console.log('✉️   [LOG]', data.message)
})

type DevActionPrefix = 'dev-'
type DevActionType = StartWith<AppBridgeReqActions, DevActionPrefix>

export const devHandlers = createMessageHandlers<DevActionType>({
  'dev-console-log': consoleLog,
})
