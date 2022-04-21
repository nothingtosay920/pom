import { Layout } from "@arco-design/web-react";
import MenuDom from "./components/menu/menu";
import style from '../styles/User.module.sass'


const Sider = Layout.Sider
const Content = Layout.Content

export default function User() {
  return (
  <>
    <MenuDom></MenuDom>
    <Layout className={style.layout}>
      <Layout>
        <Sider>sider</Sider>
        <Content className={style.content}>Content</Content>
        <Sider className={style.rSider}>sider</Sider>
      </Layout>
    </Layout>
  </>
  )
}