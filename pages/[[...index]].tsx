import { Route, Routes } from "react-router-dom"
import MenuDom from "../components/menu/menu"
import UserEditor from "./edit/[[...articleId]]"
import Home from "./home"
import UserIndex, { ColumnArticleComponent, DymicBaseComponent } from "./user"
import UserArticle from "./user/article"
import GatherIndex from "./user/article/gather/gather"
import MusterComponent from "./user/article/muster/muster"

function App() {
  return (
    <>
      <MenuDom></MenuDom>
      <Routes>
        <Route path="/user" element={<UserIndex/>}>
          <Route path="dynamic" element={<DymicBaseComponent/>}></Route>
          <Route path="articles" element={<ColumnArticleComponent/>}></Route>
          {/* <Route path="articles" element={<ColumnArticleComponent/>}></Route> */}
        </Route>
        <Route path="creator">
          <Route path="article" element={<UserArticle></UserArticle>}>
            <Route path='muster' element={<MusterComponent/>}></Route>
            <Route path='gather' element={<GatherIndex/>}></Route>
          </Route>
        </Route>
        {/* <Route path='/collection' element={<UserCollection/>}></Route> */}

        {/* <Route path="/edit" element={<UserEditor/>}></Route> */}
        {/* <Route path='/test' element={<TestUs/>}>
          <Route path='about' element={<AboutUs/>}></Route>
        </Route> */}
        <Route path="*" element={<Home/>}></Route>

      </Routes>
    </>
  )
}

export default App
