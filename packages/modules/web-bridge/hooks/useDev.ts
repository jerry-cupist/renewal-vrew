import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import messageUtil from "../utils/message";

export const devMessages = {
  consoleLog: (
    args: WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
  ) => {
    messageUtil.postMessage({
      action: WebBridgeActions.DEV_CONSOLE_LOG,
      data: args,
    });
  },
};

export const useDev = () => devMessages;
