/** @type {import('next').NextConfig} */
const path = require('path')
// module.exports = withSass({
  /* bydefault config  option Read For More Optios
  here https://github.com/vercel/next-plugins/tree/master/packages/next-sass
  */
  // cssModules: true
  // })

const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `@import "styles/globalVar.module.sass"`
  },
  images: {
    domains: ['ending-homework.oss-cn-beijing.aliyuncs.com'],
  },
}

module.exports = nextConfig
