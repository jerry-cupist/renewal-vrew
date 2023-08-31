import {CommonActions, StackActions} from '@react-navigation/native';
import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {createMessageHandler} from '@vrew/modules/web-bridge/utils';

const navigate = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
>(({data}, {navigation}) => {
  const {screenName, params} = data;
  navigation.dispatch(CommonActions.navigate(screenName, params));
});

const goBack = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_GO_BACK]
>((_, {navigation}) => {
  navigation.dispatch(CommonActions.goBack());
});

const canGoBack = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_CAN_GO_BACK]
>((_, {navigation}) => {
  navigation.canGoBack();
});

const push = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_PUSH]
>(({data}, {navigation}) => {
  const {screenName, params} = data;
  navigation.dispatch(StackActions.push(screenName, params));
});

const popToTop = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_POP_TO_TOP]
>((_, {navigation}) => {
  navigation.dispatch(StackActions.popToTop());
});

const pop = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_POP]
>(({data}, {navigation}) => {
  navigation.dispatch(StackActions.pop(data));
});

const replace = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_REPLACE]
>(({data}, {navigation}) => {
  const {screenName, params} = data;

  navigation.dispatch(StackActions.replace(screenName, params));
});

const reset = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_RESET]
>(({data}, {navigation}) => {
  const {index, routes} = data;

  navigation.dispatch(
    CommonActions.reset({
      index,
      routes: routes.map(({screenName, params}) => ({
        name: screenName,
        params,
      })),
    }),
  );
});

const reload = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_REPLACE]
>((_, {webView}) => {
  webView.reload();
});

const setOptions = createMessageHandler<
  WebBridgeActionDatas[WebBridgeActions.NAVIGATION_SET_OPTIONS]
>(({data}, {navigation}) => {
  navigation.setOptions(data);
});

export const navigationHandlers = {
  [WebBridgeActions.NAVIGATION_NAVIGATE]: navigate,
  [WebBridgeActions.NAVIGATION_GO_BACK]: goBack,
  [WebBridgeActions.NAVIGATION_CAN_GO_BACK]: canGoBack,
  [WebBridgeActions.NAVIGATION_PUSH]: push,
  [WebBridgeActions.NAVIGATION_POP_TO_TOP]: popToTop,
  [WebBridgeActions.NAVIGATION_POP]: pop,
  [WebBridgeActions.NAVIGATION_REPLACE]: replace,
  [WebBridgeActions.NAVIGATION_RESET]: reset,
  [WebBridgeActions.NAVIGATION_RELOAD]: reload,
  [WebBridgeActions.NAVIGATION_SET_OPTIONS]: setOptions,
};
