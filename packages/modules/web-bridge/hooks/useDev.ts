import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { useBridge } from "./useBridge";

export const useDev = () => {
  const bridge = useBridge();

  const consoleLog = (
    args: WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
  ) => {
    bridge.postMessage(WebBridgeActions.DEV_CONSOLE_LOG, args);
  };

  return { consoleLog };
};
