import { useNavigation as useBridgeNavigation } from "@vrew/modules/web-bridge/hooks/useNavigation";
import { WebBridgeActionDatas } from "@vrew/modules/web-bridge/types/action";

export const useNavigation = () => {
  const bridgeNavigation = useBridgeNavigation();

  const navigate = (args: WebBridgeActionDatas.NAVIGATION_NAVIGATE) => {
    bridgeNavigation.navigate(args);
  };

  const goBack = bridgeNavigation.goBack;

  return { navigate, goBack };
};
