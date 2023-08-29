import { ConsoleLogArgs } from "./data/dev";
import {
  NavigateArg,
  PushArgs,
  PopArgs,
  ReplaceArgs,
  ResetArgs,
  OptionArgs,
} from "./data/navigation";

export enum WebBridgeActions {
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

  DEV_CONSOLE_LOG = "dev-console-log",
}

export namespace WebBridgeActionDatas {
  export type NAVIGATION_NAVIGATE = NavigateArg;
  export type NAVIGATION_GO_BACK = undefined;
  export type NAVIGATION_CAN_GO_BACK = undefined;
  export type NAVIGATION_PUSH = PushArgs;
  export type NAVIGATION_POP_TO_TOP = undefined;
  export type NAVIGATION_POP = PopArgs;
  export type NAVIGATION_REPLACE = ReplaceArgs;
  export type NAVIGATION_RESET = ResetArgs;
  export type NAVIGATION_RELOAD = undefined;
  export type NAVIGATION_SET_OPTIONS = OptionArgs;

  export type DEV_CONSOLE_LOG = ConsoleLogArgs;
}
