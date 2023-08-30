import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { postMessage } from "../utils/message";

export const useNavigation = () => {
  const navigate = (
    args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
  ) => {
    postMessage(WebBridgeActions.NAVIGATION_NAVIGATE, args);
  };

  const goBack = () => {
    postMessage(WebBridgeActions.NAVIGATION_GO_BACK);
  };

  return {
    navigate,
    goBack,
  };
};
