import {
  WebBridgeActionDatas,
  WebBridgeActions,
} from "@vrew/modules/web-bridge/types/action";
import { useBridgeMessageCreator } from "@vrew/modules/web-bridge/hooks/useBridgeMessageCreator";

export const useNavigation = () => {
  const bridge = useBridgeMessageCreator();

  const navigate = (
    args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
  ) => {
    bridge.navigation.navigate(args);
  };

  const goBack = bridge.navigation.goBack;

  return { navigate, goBack };
};
