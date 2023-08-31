import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/web-bridge/utils';

const consoleLog = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.DEV_CONSOLE_LOG]
>(({data}) => {
  console.log(data.message);
});

export const devHandlers = createMessageHandlers({
  [WebBridgeActions.DEV_CONSOLE_LOG]: consoleLog,
});
