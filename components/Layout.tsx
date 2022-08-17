import React from "react";
import { ReactElement } from "react-markdown/lib/react-markdown";
import Menu from "./menu/menu";


const Layout: React.FC = (props) => {
  
  return (
    <>
      <Menu></Menu>
      <main>{props.children}</main>
    </>
  )
}

 const getBasicLayout = (page: ReactElement) => {
  return (
      <Layout>{page}</Layout>
  )
}

export default getBasicLayout