import 'react-native-webview'
declare module 'react-native-webview' {
  /**
   *
   */
  interface WebView {
    addEventListener: (eventName: string, cb: Function) => void
    removeEventListener: (eventName: string, cb: Function) => void
  }
}
