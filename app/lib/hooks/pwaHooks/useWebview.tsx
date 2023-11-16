type WebviewQuery = {
  isOnWebview: boolean
  isIOS: boolean
  isSafari: boolean
  isWebview: boolean
}

// isOnWebview is true when the user is on a webview on iOS or Android
// although it is not possible to detect if the user is on a webview on iOS
// we can assume that if the user is on iOS and is not on Safari, then it is on a webview
export default function (): WebviewQuery {
  const userAgent = navigator.userAgent.toLowerCase()

  const isSafari = /safari/.test(userAgent) && !/chrome/.test(userAgent)
  const isIOS = /iphone|ipad|ipod/.test(userAgent)
  const isWebview = /wv/.test(userAgent)

  return {
    isOnWebview: (isIOS && !isSafari) || isWebview,
    isIOS,
    isSafari,
    isWebview,
  }
}
