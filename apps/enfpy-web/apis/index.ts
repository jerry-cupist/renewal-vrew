import enfpyApiClient from "@vrew/apis/enfpy";
import tokenUtil from "../utils/tokenUtil";
import { silentRefresh } from "../hooks/useAuth";
import { queryClient } from "../context/QueryClientProvider";
import { authKeys, getSession } from "../hooks/server/auth";

/**
 * apiClient에 대한 환경 설정
 */

enfpyApiClient.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_MAIN_API_HOST,
});

/**
 * 만료시 갱신요청
 * @note axios와 localStorage에 토큰 갱신은 next-auth events.signIn에서 처리됩니다.
 */
enfpyApiClient.addEventListener("onUnauthorizedRequest", async () => {
  const token = tokenUtil.get();
  console.log("[onUnauthorizedRequest]", { token });
  if (token.refreshToken) {
    await silentRefresh(token.refreshToken);

    // 세션 업데이트
    queryClient.fetchQuery(authKeys.getSession(), getSession);
  }
});

export default enfpyApiClient;
