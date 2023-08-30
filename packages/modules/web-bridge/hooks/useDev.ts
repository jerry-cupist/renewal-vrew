import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { postMessage } from "../utils/message";

export const useDev = () => {
  const consoleLog = (
    args: WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
  ) => {
    postMessage(WebBridgeActions.DEV_CONSOLE_LOG, args);
  };

  return { consoleLog };
};
