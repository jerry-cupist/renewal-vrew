import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';

export const useDevHandler = () => {
  const consoleLog = ({
    data,
  }: RequestMessage<
    WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
  >) => {
    console.log(data.message);
  };

  return {
    [WebBridgeActions.DEV_CONSOLE_LOG]: consoleLog,
  };
};
