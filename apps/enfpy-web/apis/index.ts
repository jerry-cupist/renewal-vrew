import enfpyApiUtil from "@vrew/apis/enfpy";

/**
 * app 환경설정 baseUrl등
 * 디바이스 세팅
 */

enfpyApiUtil.apiClient.defaults.baseURL = "https://enfpy.cupist.dev/api/enfpy";
enfpyApiUtil.apiClient.defaults.headers["device-type"] = "web";
enfpyApiUtil.apiClient.defaults.headers["device-name"] = "SM-N986N";
enfpyApiUtil.apiClient.defaults.headers["device-os-version"] = "12";
/**
 * DeviceInfo.getUniqueIdSync
 * @todo 길이나 제한 확인해보기
 * @see https://www.npmjs.com/package/react-native-device-info
 */
enfpyApiUtil.apiClient.defaults.headers["device-identification"] =
  "2CF6F155-1E3B-4611-99C5-1EB5BEF9FC20";
enfpyApiUtil.apiClient.defaults.headers["device-app-version"] = "1.0.0";

export default enfpyApiUtil;
