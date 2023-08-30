import enfpyApiClient from "@vrew/apis/enfpy";
import storeUtil from "../utils/storeUtil";

/**
 * apiClient에 대한 환경 설정
 */

enfpyApiClient.setConfig({
  baseUrl: process.env.NEXT_PUBLIC_MAIN_API_HOST,
});

/**
 * 만료시 갱신요청
 */
enfpyApiClient.addEventListener("onUnauthorizedRequest", async () => {
  const token = storeUtil.get("token", {});
  storeUtil.remove("token");
  if (!token.refreshToken) {
    return;
  }

  const { data } = await enfpyApiClient.auth.silentRefresh(token.refreshToken);
  enfpyApiClient.updateToken(data.data.accessToken);

  storeUtil.set("token", {
    refreshToken: data.data.refreshToken,
  });
});

export default enfpyApiClient;
