import apiClient from "./apiClient";
import auth from "./auth";
import user from "./user";

/**
 * TODO 클라이언트를 직접 노출하지 말고 접근해야 하는 케이스를 제한해서 관리할 것.
 * 기존  ApiClient class를 사용하는 것을 고려해보기
 */
const enfpyApi = {
  apiClient,
  auth,
  user,
};

export default enfpyApi;
