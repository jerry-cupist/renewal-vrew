import {BridgeActions, RequestMessage} from '@vrew/modules/web-bridge/types';

export const useDebugToolsHandler = () => {
  const consoleLog = ({data}: RequestMessage<{message: string}>) => {
    console.log(data.message);
  };

  return {
    [BridgeActions.CONSOLE_LOG]: consoleLog,
  };
};
