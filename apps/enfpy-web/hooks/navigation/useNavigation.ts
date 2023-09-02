import { useBridgeMessageCreator } from "@vrew/modules/web-bridge/hooks/useBridgeMessageCreator";
import { useRouter } from "next/navigation";
import { NavigateOptions as _NavigateOptions } from "next/dist/shared/lib/app-router-context";
import CONFIG from "../../constant/config";
import { NavigateArg } from "@vrew/modules/web-bridge/types/data/navigation";
import { useCallback } from "react";
import {
  PathName,
  WebPathnameType,
  convertToScreenNameFromWebUrl,
} from "@vrew/modules/web-bridge/constants/screen-enfpy";

interface NavigateOptions extends _NavigateOptions {
  /** RN에서만 전달된다. */
  params?: NavigateArg["params"];
}

/**
 *
 * TODO: goBack에 분기처리
 */
export const useNavigation = () => {
  const bridge = useBridgeMessageCreator();
  const router = useRouter();

  const navigate = useCallback(
    (
      href: string,
      options?: NavigateOptions
      // args: WebBridgeActionDatas[WebBridgeActions.NAVIGATION_NAVIGATE]
    ) => {
      if (CONFIG.IS_WEB) {
        router.push(href, options);
      } else {
        const { params } = options || {};
        const screenName = convertToScreenNameFromWebUrl(
          href as WebPathnameType
        );

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
