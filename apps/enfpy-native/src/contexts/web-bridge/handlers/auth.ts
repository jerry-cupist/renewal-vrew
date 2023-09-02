import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {
  createMessageHandler,
  createMessageHandlers,
} from '@vrew/modules/web-bridge/utils';

/**
 * 토큰 동기화 요청
 */
const syncToken = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.AUTH_TOKEN_SYNC]
>(({data: token}) => {
  console.log(token);
});

export const authHandlers = createMessageHandlers({
  [WebBridgeActions.AUTH_TOKEN_SYNC]: syncToken,
});
