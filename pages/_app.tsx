import '../styles/globals.css'
import type { AppProps } from 'next/app'
import 'md-editor-rt/lib/style.css';
import "@arco-design/web-react/dist/css/arco.css";

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
