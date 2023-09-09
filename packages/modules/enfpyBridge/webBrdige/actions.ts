import { FETCHER_ACTION } from '../../commonBridge/webBridge/buildFetcher'

const AppBridgeAction = {
  ...FETCHER_ACTION,
} as const

export type AppBridgeAction =
  (typeof AppBridgeAction)[keyof typeof AppBridgeAction]
