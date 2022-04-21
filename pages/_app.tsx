import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'md-editor-rt/lib/style.css';
import "@arco-design/web-react/dist/css/arco.css";
import {QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {

  return ( 
    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} />
      {/* <ReactQueryDevtools initialIsOpen /> */}
    </QueryClientProvider>
  )  
}

export default MyApp
