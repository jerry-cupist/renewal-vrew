const isWebView = Boolean(
  (typeof window !== "undefined" && (window as any))?.ReactNativeWebView
);
const isWeb = !isWebView;

const CONFIG = {
  IS_WEBVIEW: isWebView,
  IS_WEB: isWeb,
};

export default CONFIG;
