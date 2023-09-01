import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { postMessage } from "../utils/message";

const consoleLog = (
  args: WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
) => {
  postMessage(WebBridgeActions.DEV_CONSOLE_LOG, args);
};

export const useDev = () => {
  return { consoleLog };
};
