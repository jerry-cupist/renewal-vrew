import 'react-native-webview'
declare module 'react-native-webview' {
  /**
   *
   */

  type CallbackFunction = (...args: any[]) => void
  interface WebView {
    addEventListener: (eventName: string, cb: CallbackFunction) => void
    removeEventListener: (eventName: string, cb: CallbackFunction) => void
  }
}
