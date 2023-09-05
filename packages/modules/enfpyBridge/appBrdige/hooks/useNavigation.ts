import { enfpyAppBridge } from "..";

const navigate = (args: any) => {
  enfpyAppBridge.request({
    action: "navigation-navigate",
    data: args,
  });
};

const goBack = () => {
  enfpyAppBridge.request({
    action: "navigation-go-back",
    data: {},
  });
};

const navigationMessages = {
  navigate,
  goBack,
};

export const useNavigation = () => navigationMessages;
