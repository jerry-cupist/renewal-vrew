import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { useMessage } from "./useMessage";

export const useDev = () => {
  const message = useMessage();

  const consoleLog = (args: WebBridgeActionDatas.DEV_CONSOLE_LOG) => {
    const requestMessage = message.createRequestMessage(
      WebBridgeActions.DEV_CONSOLE_LOG,
      args
    );
    message.post(requestMessage);
  };

  return { consoleLog };
};
