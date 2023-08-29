import {WebBridgeActions} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';

interface consoleLogArgs {
  message: string;
}

export const useDebugToolsHandler = () => {
  const consoleLog = ({data}: RequestMessage<consoleLogArgs>) => {
    console.log(data.message);
  };

  return {
    [WebBridgeActions.CONSOLE_LOG]: consoleLog,
  };
};
