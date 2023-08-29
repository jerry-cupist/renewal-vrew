import {
  CommonActions,
  NavigationProp,
  StackActions,
} from '@react-navigation/native';
import {useCallback, useRef} from 'react';

import {
  WebBridgeActions,
  WebBridgeActionDatas,
} from '@vrew/modules/web-bridge/types/action';
import {RequestMessage} from '@vrew/modules/web-bridge/types/message';
import WebView from 'react-native-webview';

interface Navigation extends NavigationProp<any> {}

export interface NavigationHandlerArgs {
  navigation: Navigation;
  webView: WebView;
}

export const PUSH_INTERVAL = 500;

export const useNavigationHandler = () => {
  const pushTimeStampRef = useRef<number>(0);

  const navigate = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_NAVIGATE>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const {screenName, params} = data;

      navigation.dispatch(CommonActions.navigate(screenName, params));
    },
    [],
  );

  const goBack = useCallback(
    (
      _: RequestMessage<WebBridgeActionDatas.NAVIGATION_GO_BACK>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      navigation.dispatch(CommonActions.goBack());
    },
    [],
  );

  const canGoBack = useCallback(
    (
      _: RequestMessage<WebBridgeActionDatas.NAVIGATION_CAN_GO_BACK>,
      {navigation}: NavigationHandlerArgs,
    ) => navigation.canGoBack(),
    [],
  );

  const push = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_PUSH>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const now = new Date().valueOf();
      if (now - pushTimeStampRef.current >= PUSH_INTERVAL) {
        const {screenName, params} = data;

        navigation.dispatch(StackActions.push(screenName, params));

        pushTimeStampRef.current = now;
      }
    },
    [],
  );

  const popToTop = useCallback(
    (
      _: RequestMessage<WebBridgeActionDatas.NAVIGATION_POP_TO_TOP>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      navigation.dispatch(StackActions.popToTop());
    },
    [],
  );

  const pop = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_POP>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      navigation.dispatch(StackActions.pop(data));
    },
    [],
  );

  const replace = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_REPLACE>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      const {screenName, params} = data;

      navigation.dispatch(StackActions.replace(screenName, params));
    },
    [],
  );

  const reset = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_RESET>,
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
    },
    [],
  );

  const reload = useCallback(
    (
      _: RequestMessage<WebBridgeActionDatas.NAVIGATION_RELOAD>,
      {webView}: NavigationHandlerArgs,
    ) => {
      webView.reload();
    },
    [],
  );

  const setOptions = useCallback(
    (
      {data}: RequestMessage<WebBridgeActionDatas.NAVIGATION_SET_OPTIONS>,
      {navigation}: NavigationHandlerArgs,
    ) => {
      navigation.setOptions(data);
    },
    [],
  );

  return {
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
};
