import { Button, Collapse, Descriptions, Divider, Layout, List, Menu, Message, Popconfirm, Popover, Space, Tabs, Typography } from "@arco-design/web-react";
import React, { useState } from "react";
import { GetGatherArtilces, GetMusterArticles } from "../../../api/interface/api";
import style from './articles.module.sass'
import Entry from '../../../components/entry/entry'
import { IconApps, IconBug, IconBulb, IconMore, IconMoreVertical } from '@arco-design/web-react/icon';
import MusterComponent from "./muster/muster";
import GatherComponent from "./gather/gather";
import Draft from "./draft";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useRouter } from "next/router";
import getBasicLayout from "../../../components/Layout";
import { ArticleType } from "../../../api/interface/types";


const TabPane = Tabs.TabPane;
const CollapseItem = Collapse.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Content = Layout.Content;


const UserArticle = () => {
  const router = useRouter()
  const query = router.query
  const keyLen = query['index'] ? query['index'].length : 0
  const defaultKey = query['index'] ? query['index'][keyLen - 1] as string : 'all'

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
       
      <Menu
        hasCollapseButton={false}
        defaultOpenKeys={['article']}
        defaultSelectedKeys={[defaultKey]}
        className={style.menu}
      >
        <Link to={'/creator/all'}>
        <MenuItem
          key='all'
        >
            <IconApps /> 全部文章
        </MenuItem>
        </Link>
        <SubMenu
          key='article'
          title={
            <>
              <IconApps /> 文章管理
            </>
          }
        >
          <Link to={'/creator/muster'} >
            <MenuItem key='muster'>专栏文章</MenuItem>
          </Link>
          
          <Link to={'/creator/single'}>
            <MenuItem key='single'>单一文章</MenuItem>
          </Link>

          <Link to={'/creator/gather'}>
            <MenuItem key='gather'>聚合文章</MenuItem>
          </Link>
        </SubMenu>
      
           <Link to={'/creator/draft'}>
            <MenuItem key='draft'>草稿箱</MenuItem>
          </Link>
      </Menu>
      <Content className={style.content}>
        <Outlet></Outlet>
      </Content>

      </div>
    </div>
  )
}

UserArticle.getLayout = getBasicLayout

export default UserArticle

