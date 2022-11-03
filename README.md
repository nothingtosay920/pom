# Pom
pom的设计是结合推荐系统、elasticSearch为用户提供文章的推送和阅读以及创作。

技术栈：next.js、typescript、react-router、react-toolkit、react-query和graphql-request。

功能：pom的推荐文章、搜索文章功能是通过在云服务器上部署[开源的推荐系统gorse](https://github.com/gorse-io/gorse)、elasticSearch再结合我的后端服务完成。   
引入了fingerprintjs库，为了解决未登录用户的识别问题。pom为了解决next.js路由缺少路由嵌套的功能，引入了react-router结合next.js的路由，提高了用户的体验。
pom的页面渲染结合了next.js的SSR、SSG渲染提高文章的阅读体验。pom引入了阿里云oss存储，结合oss提供的图片上传API和阿里云的自定义图片样式，让pom能够上传图片。

