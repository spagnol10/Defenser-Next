import { LayoutProvider } from "@context/LayoutContext"
import { QueryContext } from "@context/queryContext"
import { UserProvider } from "@context/userContext"
import { Analytics } from "@vercel/analytics/react"
import dayjs from "dayjs"
import * as ptbr from "dayjs/locale/pt-br"
import isBetween from "dayjs/plugin/isBetween"
import isToday from "dayjs/plugin/isToday"
import { Metadata } from "next"
import { Mulish } from "next/font/google"
import { FloatingMenu } from "./components/FloatingMenu"
import { Footer } from "./components/Footer"
import { Header } from "./components/Header"
import { InstallPwaBoundary } from "./components/InstallPwa"
import { Toast } from "./components/Toast"
import "./globals.css"
dayjs.locale(ptbr)
dayjs.extend(isToday)
dayjs.extend(isBetween)
const mulish = Mulish({ subsets: ["latin"] })

export const metadata: Metadata = {
  themeColor: "#B1DBCE",
  appleWebApp: {
    statusBarStyle: "black-translucent",
    capable: true,
    title: "Defenser",
    startupImage: {
      url: "/images/logo.png",
    },
  },
  title: {
    default: "Defenser",
    template: "%s | Defenser",
  },
  manifest: "/manifest.json",
  description: "Monitoramento de aplica\u00e7\u00f5es de defensivos agricolas",
}

const className = mulish.className

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
        <link href="splashscreens/iphone5_splash.png" media="(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphone6_splash.png" media="(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphoneplus_splash.png" media="(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonex_splash.png" media="(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonexr_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/iphonexsmax_splash.png" media="(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipad_splash.png" media="(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro1_splash.png" media="(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro3_splash.png" media="(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <link href="splashscreens/ipadpro2_splash.png" media="(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)" rel="apple-touch-startup-image" />
        <script
          dangerouslySetInnerHTML={{
            __html: process.env.NEXT_PUBLIC_CLARITY
              ? `(function (c, l, a, r, i, t, y) {
          c[a] =
            c[a] ||
            function () {
              ;(c[a].q = c[a].q || []).push(arguments)
            }
          t = l.createElement(r)
          t.async = 1
          t.src = "https://www.clarity.ms/tag/" + i
          y = l.getElementsByTagName(r)[0]
          y.parentNode.insertBefore(t, y)
        })(window, document, "clarity", "script", '${process.env.NEXT_PUBLIC_CLARITY}")`
              : "",
          }}
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `if(window.navigator && navigator.serviceWorker) {
              navigator.serviceWorker.getRegistrations()
              .then(function(registrations) {
                for(let registration of registrations) {
                  registration.unregister();
                }
              });
            }`,
          }}
        />
      </head>
      <QueryContext>
        <UserProvider>
          <LayoutProvider>
            <body className={className}>
              <main className="relative w-screen items-center overflow-y-scroll">
                <Header />
                {children}
                <InstallPwaBoundary />
                <Footer />
              </main>
              <Toast />
              <FloatingMenu />
              <Analytics />
            </body>
          </LayoutProvider>
        </UserProvider>
      </QueryContext>
    </html>
  )
}
