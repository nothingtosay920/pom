import '../styles/globals.css'
import type { AppProps, AppPropsWithLayout } from 'next/app'
import 'md-editor-rt/lib/style.css';
import "@arco-design/web-react/dist/css/arco.css";
import {QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from "react-query/devtools";
import Head from 'next/head';
import 'markdown-navbar/dist/navbar.css';
import { ReactElement } from 'react-markdown/lib/react-markdown';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { Provider } from 'react-redux';
import store from '../store';
import Loding from '../components/loading';
import NextBrowserRouter from '../router/NextBrowserRouter';
import { Link, Route, Routes } from 'react-router-dom';
import { FpjsProvider, useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { Html } from 'next/document';

const queryClient = new QueryClient()


function MyApp({ Component, pageProps, router }: AppPropsWithLayout )  {
  const getLayout = Component.getLayout || ((page: ReactElement) => page)

  useEffect(() => {
    require('../node_modules/amfe-flexible/index')
    require('../public/svg')
  }, [])
  

  return ( 
  <div>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1" />
    </Head>
    <QueryClientProvider client={queryClient} >
      <NextBrowserRouter asPath={router.asPath}>
      <FpjsProvider
        loadOptions={{
          apiKey: '1LXHEURL21Hb7W5dbKJv',
        }}
      >
				<Provider store={store}>
						{getLayout(<Component {...pageProps}></Component>)}
				</Provider>
      </FpjsProvider>
      </NextBrowserRouter>
      <ReactQueryDevtools initialIsOpen />
    </QueryClientProvider>


  </div>
  )  
}




export default MyApp


// export default class CustomApp extends App<AppProps> {
// 	render() {
// 		const { Component, pageProps } = this.props
// 		return (
// 			<NextBrowserRouter asPath={this.props.router.asPath}>
//         {/* <Component {...pageProps} /> */}

// 				<Navigation />
// 			</NextBrowserRouter>
// 		)
// 	}
// }
