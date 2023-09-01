const isWebView = Boolean(
  (typeof window !== "undefined" && (window as any))?.ReactNativeWebView
);
const isWeb = !isWebView;

const CONFIG = {
  IS_WEBVIEW: isWebView,
  IS_WEB: isWeb,
  IS_DEV: process.env.NODE_ENV === "development",
};

export default CONFIG;
