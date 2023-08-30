import enfpyApiClient from "@vrew/apis/enfpy";
import storeUtil from "../utils/storeUtil";
import tokenUtil from "../utils/tokenUtil";

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
  tokenUtil.delete();
  if (!token.refreshToken) {
    return;
  }

  const { data } = await enfpyApiClient.auth.silentRefresh(token.refreshToken);
  tokenUtil.update(data.data.accessToken);
});

export default enfpyApiClient;
