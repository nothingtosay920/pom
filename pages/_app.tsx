import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'md-editor-rt/lib/style.css';
import "@arco-design/web-react/dist/css/arco.css";
import {QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import Head from 'next/head';


const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  if (typeof window !== 'undefined') {
    require('../node_modules/amfe-flexible/index')
  }

  return ( 
  <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no" />
    </Head>
    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  </>
  )  
}

export default MyApp
