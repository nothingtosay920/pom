import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang='zh'>
      <Head>
        <meta name='description' content='pom是一个短文章阅读网站。' />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}