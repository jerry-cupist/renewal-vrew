import {
  CommonActions,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';
import WebView from 'react-native-webview';

interface Navigation extends NavigationProp<any> {}
interface NavigationHandlerArgs {
  navigation: Navigation;
  webView: WebView;
}

const navigate = (
  {
    data,
  }: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]>,
  {navigation}: NavigationHandlerArgs,
) => {
  const {screenName, params} = data;

  navigation.dispatch(CommonActions.navigate(screenName, params));
};

const goBack = (
  _: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_GO_BACK]>,
  {navigation}: NavigationHandlerArgs,
) => {
  navigation.dispatch(CommonActions.goBack());
};

const canGoBack = (
  _: RequestMessage<
    WebBridgeActionDatas[WebBridgeActions.NAVIGATION_CAN_GO_BACK]
  >,
  {navigation}: NavigationHandlerArgs,
) => {
  navigation.canGoBack();
};

const push = (
  {
    data,
  }: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_PUSH]>,
  {navigation}: NavigationHandlerArgs,
) => {
  const {screenName, params} = data;
  navigation.dispatch(StackActions.push(screenName, params));
};

const popToTop = (
  _: RequestMessage<
    WebBridgeActionDatas[WebBridgeActions.NAVIGATION_POP_TO_TOP]
  >,
  {navigation}: NavigationHandlerArgs,
) => {
  navigation.dispatch(StackActions.popToTop());
};

const pop = (
  {data}: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_POP]>,
  {navigation}: NavigationHandlerArgs,
) => {
  navigation.dispatch(StackActions.pop(data));
};

const replace = (
  {
    data,
  }: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_REPLACE]>,
  {navigation}: NavigationHandlerArgs,
) => {
  const {screenName, params} = data;

  navigation.dispatch(StackActions.replace(screenName, params));
};

const reset = (
  {
    data,
  }: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_RESET]>,
  {navigation}: NavigationHandlerArgs,
) => {
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
};

const reload = (
  _: RequestMessage<WebBridgeActionDatas[WebBridgeActions.NAVIGATION_RELOAD]>,
  {webView}: NavigationHandlerArgs,
) => {
  webView.reload();
};

const setOptions = (
  {
    data,
  }: RequestMessage<
    WebBridgeActionDatas[WebBridgeActions.NAVIGATION_SET_OPTIONS]
  >,
  {navigation}: NavigationHandlerArgs,
) => {
  navigation.setOptions(data);
};

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
