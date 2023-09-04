import { enfpyAppBridge } from "..";
import { AppBridgeActionDatas } from "../actions";

export const devMessages = {
  consoleLog: (args: AppBridgeActionDatas["dev-console-log"]) => {
    enfpyAppBridge.postMessage({
      action: "dev-console-log",
      data: args,
      type: "request",
    });
  },
};

export const useDev = () => devMessages;
