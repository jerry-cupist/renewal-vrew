const isWebView = Boolean(
  (typeof window !== "undefined" && (window as any))?.ReactNativeWebView
);
const isWeb = !isWebView;

const CONFIG = {
  IS_WEBVIEW: isWebView,
  IS_WEB: isWeb,
  IS_DEV: process.env.NODE_ENV === "development",
  NEXTAUTH_URL: process.env.NEXTAUTH_URL,
  NEXT_PUBLIC_REACT_QUERY_DEV_TOOLS:
    process.env.NEXT_PUBLIC_REACT_QUERY_DEV_TOOLS === "true",
};

export default CONFIG;
