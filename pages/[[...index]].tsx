import { Route, RouteObject, Routes, useRoutes } from "react-router-dom"
import MenuDom from "../components/menu/menu"
import Home from "./home"
import UserArticle from "./user/article"
import GatherIndex from "./user/article/gather/gather"
import MusterComponent, { SingleComponent } from "./user/article/muster/muster"
import Search from "./search/search"
import Custom404 from "./404"
import getBasicLayout from "../components/Layout"
import RecommendArticle from "../components/recommend-article/recommend-article"
import Entrance from "../components/entrance/entrance"
import { useRouter } from "next/router"
import UserIndex, { DymicBaseComponent } from "./user/user"
import { CollectionArticleComponent } from "./user/collection"
import UserRecords from "./user/records"
import { AllArticleComponent } from "../components/all-articles/all-articles"
import Draft from "./user/article/draft"
import MusterIndex from "./user/article/muster/column"
import Unauth from "./unauth"


const _Routes: RouteObject[] = [
  {
    path: ''
  }
]

// export async function getStaticPaths() {
//   return { paths: [
//     {
//       params: {
//         'index': ['user']
//       },
//     },
//     {
//       params: {
//         index: ['user', 'collect']
//       },
//     },
//     {
//       params: {
//         index: ['user', 'articles']
//       },
//     },
//     {
//       params: {
//         index: ['search']
//       },
//     },
//     {
//       params: {
//         index: null
//       },
//     }
//   ], fallback: true }
// }

// export async function getStaticProps({}) {
//   // params 包含此片博文的 `id` 信息。

//   return { props: { } }
// }

function App() {
  // const AppRoutes = useRoutes(_Routes)

  return (
    <>
      {/* <MenuDom></MenuDom> */}
      <Routes>
        <Route path="/user" element={<UserIndex/>}>
          <Route index element={<DymicBaseComponent/>}></Route>
          <Route path="articles" element={<AllArticleComponent/>}></Route>
          <Route path="collect" element={<CollectionArticleComponent/>}></Route>
          <Route path="records" element={<UserRecords/>}></Route>
        </Route>
        <Route path="creator" element={<UserArticle></UserArticle>}>
          <Route path='muster' element={<MusterComponent/>}></Route>
          <Route path='gather' element={<GatherIndex/>}></Route>
          <Route path='single' element={<SingleComponent/>}></Route>
          <Route path='draft' element={<Draft/>}></Route>
          <Route path='all' element={<AllArticleComponent/>}></Route>
        </Route>
        <Route path='column/:columnId' element={<MusterIndex/>}></Route>
        <Route path="search" element={<Search/>}></Route>
        <Route path="unauth" element={<Unauth/>}></Route>
        <Route path="*" element={<Home/>}></Route>
      </Routes>
    </>
  )
}

App.getLayout = getBasicLayout
export default App

