import { ConsoleLogArgs } from '../../commonBridge/appBridge/types/data/dev'
import {
  NavigateArg,
  OptionArgs,
  PopArgs,
  PushArgs,
  ReplaceArgs,
  ResetArgs,
} from '../../commonBridge/appBridge/types/data/navigation'
import { FETCHER_ACTION } from '../../commonBridge/webBridge/buildFetcher'

/** 수신 */
const AppBridgeResActions = {
  ...FETCHER_ACTION,
} as const

/** 송신 */
const AppBridgeReqActions = {
  /** navigation */
  NAVIGATION_NAVIGATE: 'navigation-navigate',
  NAVIGATION_GO_BACK: 'navigation-go-back',
  NAVIGATION_CAN_GO_BACK: 'navigation-can-go-back',
  NAVIGATION_PUSH: 'navigation-push',
  NAVIGATION_POP_TO_TOP: 'navigation-pop-to-top',
  NAVIGATION_POP: 'navigation-pop',
  NAVIGATION_REPLACE: 'navigation-replace',
  NAVIGATION_RESET: 'navigation-reset',
  NAVIGATION_RELOAD: 'navigation-reload',
  NAVIGATION_SET_OPTIONS: 'navigation-set-options',
  /** dev */
  DEV_CONSOLE_LOG: 'dev-console-log',
} as const

export type AppBridgeResActions =
  (typeof AppBridgeResActions)[keyof typeof AppBridgeResActions]

export type AppBridgeReqActions =
  (typeof AppBridgeReqActions)[keyof typeof AppBridgeReqActions]

export type AppBridgeActionDatas = {
  [AppBridgeReqActions.NAVIGATION_NAVIGATE]: NavigateArg
  [AppBridgeReqActions.NAVIGATION_GO_BACK]: undefined
  [AppBridgeReqActions.NAVIGATION_CAN_GO_BACK]: undefined
  [AppBridgeReqActions.NAVIGATION_PUSH]: PushArgs
  [AppBridgeReqActions.NAVIGATION_POP_TO_TOP]: undefined
  [AppBridgeReqActions.NAVIGATION_POP]: PopArgs
  [AppBridgeReqActions.NAVIGATION_REPLACE]: ReplaceArgs
  [AppBridgeReqActions.NAVIGATION_RESET]: ResetArgs
  [AppBridgeReqActions.NAVIGATION_RELOAD]: undefined
  [AppBridgeReqActions.NAVIGATION_SET_OPTIONS]: OptionArgs
  [AppBridgeReqActions.DEV_CONSOLE_LOG]: ConsoleLogArgs
}
