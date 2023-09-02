import { useBridgeMessageCreator } from "@vrew/modules/web-bridge/hooks/useBridgeMessageCreator";
import { useRouter } from "next/navigation";
import { NavigateOptions as _NavigateOptions } from "next/dist/shared/lib/app-router-context";
import CONFIG from "@constant/config";
import {
  ScreenPaths,
  Screens,
} from "@vrew/modules/web-bridge/constants/screen-enfpy";
import { NavigateArg } from "@vrew/modules/web-bridge/types/data/navigation";
import { useCallback } from "react";

interface NavigateOptions extends _NavigateOptions {
  /** RN에서만 전달된다. */
  params?: NavigateArg["params"];
}

/**
 *
 * TODO: next/navigation useRouter 와 함께 사용하는 것을 고려해야 한다.
 */
export const useNavigation = () => {
  const bridge = useBridgeMessageCreator();
  const router = useRouter();

  const navigate = useCallback(
    (
      screenName: Screens,
      options?: NavigateOptions
      // args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
    ) => {
      if (CONFIG.IS_WEB) {
        const path = ScreenPaths[screenName];
        router.push(path, options);
      } else {
        const { params } = options || {};

        bridge.navigation.navigate({
          screenName,
          params,
        });
      }
    },
    [bridge.navigation.navigate, router]
  );

  const goBack = bridge.navigation.goBack;

  return { navigate, goBack };
};
