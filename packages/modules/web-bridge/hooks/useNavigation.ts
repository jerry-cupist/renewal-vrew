import { WebBridgeActionDatas, WebBridgeActions } from "../types/action";
import { useMessage } from "./useMessage";

export const useNavigation = () => {
  const message = useMessage();

  const navigate = (args: WebBridgeActionDatas.NAVIGATION_NAVIGATE) => {
    const requestMessage = message.createRequestMessage(
      WebBridgeActions.NAVIGATION_NAVIGATE,
      args
    );
    message.post(requestMessage);
  };

  const goBack = () => {
    const requestMessage = message.createRequestMessage(
      WebBridgeActions.NAVIGATION_GO_BACK
    );
    message.post(requestMessage);
  };
  return { navigate, goBack };
};
