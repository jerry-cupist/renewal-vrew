import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';

const consoleLog = ({
  data,
}: RequestMessage<WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]>) => {
  console.log(data.message);
};

export const devHandlers = {
  [WebBridgeActions.DEV_CONSOLE_LOG]: consoleLog,
};
