import { UserToken } from "./data/auth";
import { ConsoleLogArgs } from "./data/dev";
import {
  NavigateArg,
  PushArgs,
  PopArgs,
  ReplaceArgs,
  ResetArgs,
  OptionArgs,
} from "./data/navigation";

/**
 * WEB => RN 수신 액션
 */
export enum WebBridgeActions {
  /** 네비게이션 */
  NAVIGATION_NAVIGATE = "navigation-navigate",
  NAVIGATION_GO_BACK = "navigation-go-back",
  NAVIGATION_CAN_GO_BACK = "navigation-can-go-back",
  NAVIGATION_PUSH = "navigation-push",
  NAVIGATION_POP_TO_TOP = "navigation-pop-to-top",
  NAVIGATION_POP = "navigation-pop",
  NAVIGATION_REPLACE = "navigation-replace",
  NAVIGATION_RESET = "navigation-reset",
  NAVIGATION_RELOAD = "navigation-reload",
  NAVIGATION_SET_OPTIONS = "navigation-set-options",

  /** dev */
  DEV_CONSOLE_LOG = "dev-console-log",

  /** auth */
  /** 토큰 동기화 */
  AUTH_TOKEN_SYNC = "auth-token-sync",
}

/**
 * RN => Web 요청 액션
 */
export enum WebBridgeRequestActions {}

export type WebBridgeActionDatas = {
  [WebBridgeActions.NAVIGATION_NAVIGATE]: NavigateArg;
  [WebBridgeActions.NAVIGATION_GO_BACK]: undefined;
  [WebBridgeActions.NAVIGATION_CAN_GO_BACK]: undefined;
  [WebBridgeActions.NAVIGATION_PUSH]: PushArgs;
  [WebBridgeActions.NAVIGATION_POP_TO_TOP]: undefined;
  [WebBridgeActions.NAVIGATION_POP]: PopArgs;
  [WebBridgeActions.NAVIGATION_REPLACE]: ReplaceArgs;
  [WebBridgeActions.NAVIGATION_RESET]: ResetArgs;
  [WebBridgeActions.NAVIGATION_RELOAD]: undefined;
  [WebBridgeActions.NAVIGATION_SET_OPTIONS]: OptionArgs;
  [WebBridgeActions.DEV_CONSOLE_LOG]: ConsoleLogArgs;
  [WebBridgeActions.AUTH_TOKEN_SYNC]: UserToken;
};
