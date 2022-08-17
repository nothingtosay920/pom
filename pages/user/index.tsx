import { Avatar, Button, Divider, Empty, Image, Layout, Menu, Pagination, Space } from "@arco-design/web-react";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";
import { InfiniteData } from "react-query";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { DynamicApi, GetAllArticles, GetArticle, GetDynamic, GetUserInfo, useGetUserByCookie } from "../../api/interface/api";
import { AllArticlesType, ArticleMainType, ArticleType, DymicApiRes, dynamicApi, getUserType } from "../../api/interface/types";
import ArticleCompoent from "../../components/aritlce-component/article-component";
import getBasicLayout from "../../components/Layout";
import PanelHz from "../../components/panel-hz";
import ShowDate, { TimeTamp } from "../../components/show-date/show-date";
import style from './index.module.sass'

type UserInfo = {
  author_id: string,
  name: string,
  author_img: string,
  timestamp: string
}

const Header = Layout.Header;
const Content = Layout.Content;
const MenuItem = Menu.Item;


export const ColumnArticleComponent = () => {
  const {data: articles, isSuccess, fetchNextPage, hasNextPage } = GetAllArticles()
  const [page, setpage] = useState(0)

  if (articles === undefined) {
    return <Empty></Empty>
  }

  const list = articles.pages.reduce<ArticleMainType[]>((prev, current) => {
     prev.push(...current.AllArticles)            
     return prev
  }, [])

  const onScroll = () => {}

  const RecordsComponent = ({key, index}: ListRowProps) => {
    return (
      <ArticleCompoent user={{name: '123'}} data={list[index]}></ArticleCompoent>
    )
  }

  return (
    <WindowScroller onScroll={onScroll}>
    {({ height, isScrolling, onChildScroll, scrollTop }) => (
      <List
        autoHeight
        rowCount={list.length}
        height={height}
        isScrolling={isScrolling}
        onScroll={onChildScroll}
        rowHeight={130}
        rowRenderer={RecordsComponent}
        scrollTop={scrollTop}
        width={750}

      />
    )}
  </WindowScroller>
  )
}

export const DymicBaseComponent = () => {
  const {data: dynamic, isSuccess, fetchNextPage, hasNextPage } = GetDynamic()


  if (dynamic === undefined || dynamic.pages.length === 0) {
    return (
      <Empty className={style.entry}></Empty>
    )
  }

  

  const onScroll = () => {

  }
  
  const list = dynamic.pages.reduce<{
    content: string,
    type: string,
    time_tamp: string,
    dynamic_id: string
  }[]>((prev, current) => {
     prev.push(...current.getDynamic.dynamic)            
     return prev
    // return [...prev.dynamic, ...current.dynamic]
  }, [])

  
  const RecordsComponent = ({key, index, style}: ListRowProps) => {

    return (
      <div key={key} style={style}>
        <Dymic key={list[index].dynamic_id} dymic={list[index]}></Dymic>
      </div>
    )
  }



  return (
      <WindowScroller onScroll={onScroll}>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            rowCount={list.length}
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            rowHeight={260}
            rowRenderer={RecordsComponent}
            scrollTop={scrollTop}
            width={750}

          />
        )} 
      </WindowScroller>
  )
}

const Dymic = (props: {
  dymic: {
    content: string,
    type: string,
    time_tamp: string
  }
}) => {

  const {data} = useGetUserByCookie()
  const {data: item, isError} = DynamicApi(props.dymic.content, props.dymic.type)

  if (!item || !data) {
    return <div></div>
  }

  switch (props.dymic.type) {
    case "RELEASE":
      return (
        <DymicItem 
          data={data} 
          item={item} 
          type={props.dymic.type} 
          userInfo={{
            author_id: item.outer_id,
            name: item.author_name,
            author_img: item.author_img,
            timestamp: item.edit_time
          }}
        ></DymicItem>
      )
    case 'FollowArticle':
      return (
        <DymicItem 
          data={data} 
          item={item} 
          type={props.dymic.type} 
          userInfo={{
            author_id: item.outer_id,
            name: item.name,
            author_img: item.author_img,
            timestamp: item.edit_time

          }}
        ></DymicItem>
      )
    case 'ZAN':
      return (
        <DymicItem 
          data={data} 
          item={item} 
          type={props.dymic.type} 
          userInfo={{
            author_id: item.outer_id,
            name: item.name,
            author_img: item.author_img,
            timestamp: item.edit_time

          }}
        ></DymicItem>
      )
    case 'COLLECTION':
      return (
        <DymicItem 
          data={data} 
          item={item} 
          type={props.dymic.type} 
          userInfo={{
            author_id: item.outer_id,
            name: item.name,
            author_img: item.author_img,
            timestamp: item.edit_time

          }}
        ></DymicItem>
      )
    case "Follow":
      return (
        <>
          {
            item !== undefined && data !== undefined ?
            <div>{data?.name}关注了{item.name}</div>  : <></>
          }
        </>
      )
    default :
      return  <div></div>
  }
}

const DymicItem = (props: {
  data: getUserType , 
  item: dynamicApi, 
  type: string,
  userInfo: UserInfo
}) => {
  let dynamicText = undefined
  switch (props.type) {
    case 'ZAN':
      dynamicText = '赞了'
      break;
    case 'RELEASE':
      dynamicText = '发布了'
      break;
    case 'FollowArticle':
      dynamicText = '关注了'
      break;
    case 'COLLECTION':
      dynamicText = '收藏了'
      break;
  }

  return (
    <div className={style.dynamicItem}>
      <div>{props.data.name}<span className={style.dynamicText}>{' '+ dynamicText}这篇文章</span></div>
      <Divider style={{'margin': '12px'}} />
        <UserInfoCompontents 
          author_id={props.userInfo.author_id} 
          name={props.userInfo.name} 
          author_img={props.userInfo.author_img}
          timestamp={props.userInfo.timestamp}
        />
        <DynamicEntry item={props.item} type={props.type as ArticleType} />
      <Divider style={{'margin': '12px'}} />
    </div>
  )
}

const UserInfoCompontents: FC<UserInfo> = ({author_img, name, author_id, timestamp}) => {
  return (
    <div className={style.baseuserInfo}>
      <Image src={author_img} width="40" height={"40"}></Image>
      <div className={style.InfoName}>
        <div className={style.userName}>{name}</div>
        <TimeTamp className={style.timestamp} time={timestamp} ></TimeTamp>
      </div>

    </div>
  )
}

export const DynamicEntry = (props: {
  item: dynamicApi,
  type: ArticleType
}) => {
  return (
    <Link to={{pathname: '/article' + `/${props.item.id}`}}>
      <div className={style.descWrapper}>
        <div className={style.entryItem}>
          <div className={style.desc}>
              <div className={style.itemTitle}>{props.item.title}</div>
              <div className={style.descText}>{props.item.description}</div>
          </div>
          <PanelHz
            article_data={{
              zan: props.item.zan,
              zan_status: props.item.zan_status,
              follow_status: props.item.follow_status,
              collection_status: props.item.collection_status,
              article_type: props.item.type
            }}
            article_id={props.item.id}
            zan_status={false}></PanelHz>
        </div>
        
        <Image
          width={140}
          height={95}
          src={props.item.article_img}
          alt='lamp'
          className={style.itemImg}
        />
      </div>
  </Link>
  )
}


const UserIndex = () => {
  const [page, setpage] = useState(1)
  const {data: userInfo, isSuccess: UserInfoSuccess} = GetUserInfo()
  const router = useRouter()

  // if (isSuccess && dynamic !== undefined && UserInfoSuccess) {
  //   refs.current.push(...dynamic)
  // }

  return (
    <Layout className={style.wrapper}>
      <Header className={style.header}>
        <div className={style.infoBg}>
          <div className={style.userInfo}>
            <Image src={userInfo?.user_img} className={style.userInfoImg} alt={'userInfo'} />
            <div className={style.userInfoText}>{userInfo?.name}</div>
          </div>
          <Button className={style.editBtn} >编辑状态</Button>
        </div>
        <Menu mode='horizontal' defaultSelectedKeys={['1']} >
          <MenuItem key='1' onClick={() => router.push('/user/dynamic')}>动态</MenuItem>
          <MenuItem key='2' onClick={() => router.push('/user/articles')}>文章</MenuItem>
          <MenuItem key='3'>关注</MenuItem>
          <MenuItem key='4'><Link to={'/user/collection'}>收藏</Link></MenuItem>
        </Menu>
      </Header>
      <Content>
        <div className={style.mainContent}>
          {/* <DymicComponent dynamic={dynamic}></DymicComponent> */}
          <Outlet></Outlet>
        </div>
      </Content>
    </Layout>
  )
}

UserIndex.getLayout = getBasicLayout


export default UserIndex