import { Button, Collapse, Descriptions, Divider, Layout, List, Menu, Message, Popconfirm, Popover, Space, Tabs, Typography } from "@arco-design/web-react";
import React, { useState } from "react";
import { GetGatherArtilces, GetMusterArticles } from "../../../api/interface/api";
import style from './articles.module.sass'
import Entry from '../../../components/entry/entry'
import { ArticleMainType, Articles } from "../../../api/interface/types";
import { IconApps, IconBug, IconBulb, IconMore, IconMoreVertical } from '@arco-design/web-react/icon';
import MusterComponent from "./muster/muster";
import GatherComponent from "./gather/gather";
import Draft from "./draft";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { useRouter } from "next/router";
import AboutUs from "../../../views/about";
import getBasicLayout from "../../../components/Layout";


const TabPane = Tabs.TabPane;
const CollapseItem = Collapse.Item;
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Content = Layout.Content;

type DescType = {
  item: Articles,
  index: number
}

// const Desc = (props: DescType) => {
//   const data = []
//   const data_hot = {
//     label: '热度：',
//     value: props.item.hot
//   }
//   const data_zan = {
//     label: '点赞数：',
//     value: props.item.zan
//   }
//   const data_folled = {
//     label: '被关注数：',
//     value: props.item.befollowed?.length
//   }
//   data.push(data_hot, data_zan, data_folled)
  
//   return <Descriptions layout='inline-horizontal' title={ `第${props.index + 1}小节：` + props.item.title} data={data} />
//   }

const CollapseHeader = (props: {
  header: string
}) => {
  return <div className={style.collapseHeader}>{props.header}</div>
}

// export const ArticleComponent = (props: ArticleMainType) => {
//   return (
//     <CollapseItem header={<CollapseHeader header={props.description ? props.description : props.article_data[0].description} />} name={props.gather_id ? props.gather_id : props.muster_id}
//      extra={
//       <Popover
//         position='br'
//         content={
//           <span>
//             <Button type='primary' style={{'marginRight': '10px'}}>编辑</Button>
//             <Button type='primary' status='danger'>删除</Button>
//           </span>
//         }
//       >
//         <IconMoreVertical/>
//       </Popover>
//      } >

//     </CollapseItem>

//   )

// }

const UserArticle = () => {
  const router = useRouter()

 
  // gatherData['getGatherArtilces'][0].article_data.length

  return (
    <div className={style.wrapper}>
      <div className={style.main}>
        {/* <Tabs defaultActiveTab='1'>
        <TabPane key='1' title='文章'>
          <Space>
            <Button type='text' className={actBtn === 0 ? '': style.actBtn} onClick={() => setactBtn(0)}>聚合文章（{gatherData?.length}）</Button>
            <Divider></Divider>
            <Button type='text' className={actBtn === 1 ? '': style.actBtn} onClick={() => setactBtn(1)}>专栏文章（{musterData?.length}）</Button>
          </Space>
          { data && data.length > 0 ? 
            <Collapse>
            {data.map((item, index) => {
              return <Article key={item.gather_id ? item.gather_id : item.muster_id} article_data={item.article_data} description={item.description} gather_id={item.gather_id} muster_id={item.muster_id} />
            })}
            </Collapse>
            : <></>}
        </TabPane>
        <TabPane key='2' title='草稿箱'>
          <Draft></Draft>
        </TabPane>
      </Tabs> */}
      <Menu
        hasCollapseButton={false}
        defaultOpenKeys={['article']}
        defaultSelectedKeys={['muster']}
        className={style.menu}
        // onClickMenuItem={(key) => router.push('/user/article/' + key)}
        onClickSubMenu={(key) => {
          // router.push('/user/article/' + key)
        }}
      >
        <SubMenu
          key='article'
          title={
            <>
              <IconApps /> 文章管理
            </>
          }
        >
          <Link to={'/creator/article/muster'} >
            <MenuItem key='muster'>专栏文章</MenuItem>
          </Link>
          
          <Link to={'/creator/article/gather'}>
            <MenuItem key='gather'>聚合文章</MenuItem>
          </Link>
        </SubMenu>
        <MenuItem
          key='draft'
          // onClick={() => setkey(key)}
        >
          <IconBug /> 草稿箱
        </MenuItem>
      </Menu>
      <Content className={style.content}>
        {/* {key === 'muster' && <MusterComponent></MusterComponent>}
        {key === 'gather' && <GatherComponent></GatherComponent>}
        {key === 'draft' && <Draft></Draft>} */}
        <Outlet></Outlet>
      </Content>

      </div>
    </div>
  )
}

UserArticle.getLayout = getBasicLayout

export default UserArticle

// {data && data.length >0 ? data.map((item) => {
//   return <div key={item.title}>
//       <div className={style.itemTitle}>{item.title}</div>
//       <div className={style.itemTitle}>{item.description}</div>
//           <Space className={style.actionList}>
//             <div style={{"display": 'flex'}}>
//               <svg aria-hidden="true" className={style.panel}>
//                 <use xlinkHref={"#icon-hot"}></use>
//               </svg>
//               <div>123123</div>
//             </div>
//             <div>骑驴跑路</div>
//             <div className={style.grayText}>3个月之前</div>
//             {/* 这是标签 */}
//             <div className={style.grayText}>react + vue</div>
//         </Space> 
//   </div>
// }) : <></>}