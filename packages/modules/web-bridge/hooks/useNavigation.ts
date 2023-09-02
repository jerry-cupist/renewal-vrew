import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import messageUtil from "../utils/message";

const navigate = (
  args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
) => {
  messageUtil.postMessage({
    action: WebBridgeActions.NAVIGATION_NAVIGATE,
    data: args,
  });
};

const goBack = () => {
  messageUtil.postMessage({ action: WebBridgeActions.NAVIGATION_GO_BACK });
};

const navigationMessages = {
  navigate,
  goBack,
};

export const useNavigation = () => navigationMessages;
