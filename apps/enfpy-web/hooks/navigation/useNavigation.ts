import { useRouter } from "next/navigation";
import { NavigateOptions as _NavigateOptions } from "next/dist/shared/lib/app-router-context";
import CONFIG from "../../constant/config";
import { useCallback } from "react";
import { NavigateArg } from "@vrew/modules/commonBridge/appBridge/types/data/navigation";
import { useBridgeMessageCreator } from "@vrew/modules/enfpyBridge/appBrdige/hooks/useBridgeMessageCreator";
import { convertToScreenNameFromWebUrl } from "@vrew/modules/enfpyBridge/shared/constants/screen-enfpy";
import { EnfpyWebPathnameType } from "@vrew/modules/enfpyBridge/shared/constants/page-enpfy";

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
          href as EnfpyWebPathnameType
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
