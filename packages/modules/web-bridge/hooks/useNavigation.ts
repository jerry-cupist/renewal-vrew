import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { useBridge } from "./useBridge";

export const useNavigation = () => {
  const bridge = useBridge();

  const navigate = (
    args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
  ) => {
    bridge.postMessage(WebBridgeActions.NAVIGATION_NAVIGATE, args);
  };

  const goBack = () => {
    bridge.postMessage(WebBridgeActions.NAVIGATION_GO_BACK);
  };
  return { navigate, goBack };
};
