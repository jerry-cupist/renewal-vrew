import enfpyApiClient from "../apis";
import storeUtil from "./storeUtil";

const tokenUtil = {
  update(refreshToken: string) {
    const token = {
      refreshToken,
    };

    storeUtil.set("token", token);
    enfpyApiClient.updateToken(refreshToken);
    // TODO RN에 토큰 동기화
    // return postMessage('token',token)
  },
  delete() {
    storeUtil.remove("token");
    enfpyApiClient.deleteToken();
  },

  get() {
    return storeUtil.get("token", {});
  },
};

export default tokenUtil;
