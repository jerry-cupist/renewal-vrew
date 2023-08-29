import {BridgeActions} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';

export const useDebugToolsHandler = () => {
  const consoleLog = ({data}: RequestMessage<{message: string}>) => {
    console.log(data.message);
  };

  return {
    [BridgeActions.CONSOLE_LOG]: consoleLog,
  };
};
