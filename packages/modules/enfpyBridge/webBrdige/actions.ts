import { FETCHER_ACTION_TYPES } from "../../commonBridge/webBridge/buildFetcher";

const AppBridgeAction = {
  ...FETCHER_ACTION_TYPES,
} as const;

export type AppBridgeAction =
  (typeof AppBridgeAction)[keyof typeof AppBridgeAction];
