import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { postMessage } from "../utils/message";

const navigate = (
  args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
) => {
  postMessage(WebBridgeActions.NAVIGATION_NAVIGATE, args);
};

const goBack = () => {
  postMessage(WebBridgeActions.NAVIGATION_GO_BACK);
};

export const useNavigation = () => {
  return {
    navigate,
    goBack,
  };
};
