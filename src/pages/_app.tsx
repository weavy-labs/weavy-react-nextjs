import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Layout from '@/components/Layout'
import { SessionProvider } from 'next-auth/react'
import "@weavy/uikit-react/dist/css/weavy.css";


export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  if (Component.getLayout) {    
    return Component.getLayout(
      <SessionProvider session={session}><Component {...pageProps} /></SessionProvider>
        )
    }

    return <SessionProvider session={session}><Layout><Component {...pageProps} /></Layout></SessionProvider>

}
