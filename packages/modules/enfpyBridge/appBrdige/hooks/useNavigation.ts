import { enfpyAppBridge } from "..";

const navigate = (args: any) => {
  enfpyAppBridge.postMessage({
    action: "navigation-navigate",
    data: args,
    type: "request",
  });
};

const goBack = () => {
  enfpyAppBridge.postMessage({
    action: "navigation-go-back",
    type: "request",
  });
};

const navigationMessages = {
  navigate,
  goBack,
};

export const useNavigation = () => navigationMessages;
