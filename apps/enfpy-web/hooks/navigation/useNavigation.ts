import {
  WebBridgeActionDatas,
  WebBridgeActions,
} from "@vrew/modules/web-bridge/types/action";
import { useBridgeMessageCreator } from "@vrew/modules/web-bridge/hooks/useBridgeMessageCreator";
import { useRouter } from "next/navigation";
import { NavigateOptions as _NavigateOptions } from "next/dist/shared/lib/app-router-context";
import CONFIG from "../../constant/config";
import {
  ScreenName,
  ValueOfScreenName,
} from "@vrew/modules/web-bridge/constants/screen-enfpy";
import { NavigateArg } from "@vrew/modules/web-bridge/types/data/navigation";
import { useCallback } from "react";

interface NavigateOptions extends _NavigateOptions {
  /** RN에서만 전달된다. */
  params?: NavigateArg["params"];
}

/**
 *
 * @example convertScreenName("/profile/mbti") // "profile/mbti"
 * TODO: ScreenName이 컨벤션으로 생성되는 것이 아쉽다. 좀 더 강하게 묶는 방법 고민
 */
const convertScreenName = (pathName: string) => {
  if (pathName === "/") {
    return ScreenName.Root;
  }

  return pathName
    .split("/")
    .filter((item) => item !== "")
    .join("/") as ValueOfScreenName;
};

/**
 *
 * TODO: next/navigation useRouter 와 함께 사용하는 것을 고려해야 한다.
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
        const screenName = convertScreenName(href);

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
