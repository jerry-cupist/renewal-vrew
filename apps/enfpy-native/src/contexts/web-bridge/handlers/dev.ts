import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/commonBridge/appBridge/utils';
import {
  AppBridgeActionDatas,
  AppBridgeReqActions,
} from '@vrew/modules/enfpyBridge/appBrdige/actions';

const consoleLog = createMessageHandler<
  'dev-console-log',
  AppBridgeActionDatas['dev-console-log']
>(({data}) => {
  console.log('✉️   [LOG]', data.message);
});

type StartWith<
  Types extends string,
  PrefixType extends string,
> = Types extends `${PrefixType}${string}` ? Types : never;

type DevActionType = StartWith<AppBridgeReqActions, 'dev-'>;

export const devHandlers = createMessageHandlers<DevActionType>({
  'dev-console-log': consoleLog,
});
