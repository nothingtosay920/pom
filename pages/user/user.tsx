import { Avatar, Button, Divider, Empty, Image, Layout, Menu, Pagination, Skeleton, Space } from "@arco-design/web-react";
import { useVisitorData } from "@fingerprintjs/fingerprintjs-pro-react";
import { useRouter } from "next/router";
import React, { FC, useEffect, useRef, useState } from "react";
import LazyLoad from "react-lazyload";
import { InfiniteData } from "react-query";
import { Link, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { List, ListRowProps, WindowScroller } from "react-virtualized";
import { DynamicApi, GetAllArticles, GetArticle, GetDynamic, GetUserInfo, useGetUserByCookie } from "../../api/interface/api";
import { AllArticlesType, ArticleClassType, ArticleType, DymicApiRes, GatherType, getUserType } from "../../api/interface/types";
import getBasicLayout from "../../components/Layout";
import PanelHz from "../../components/panel-hz";
import ShowDate, { TimeTamp } from "../../components/show-date/show-date";
import style from './index.module.sass'

type UserInfo = {
  name: string,
  author_img: string,
  timestamp: string
}

const Header = Layout.Header;
const Content = Layout.Content;
const MenuItem = Menu.Item;


export const DymicBaseComponent = () => {
  const {data} = useGetUserByCookie()
  const router = useRouter()
  const {data: dynamic, isError, fetchNextPage, hasNextPage, isLoading, isIdle } = GetDynamic(data?.uuid)

  if (isIdle) {
    router.push('/unauth')
  }

  if (isLoading || isError || !dynamic) {
    return <Skeleton
    loading={true}
    className={style.skeleton}
    text={{
      rows: 8,
      width: [400, '80%', 700, 500, 600, 400, 800, 700],
    }}
    animation
  >
  </Skeleton> 
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

  if (!list.length) {
    return (
      <Empty className={style.entry}></Empty>
    )
  }

  const loadMore = (params: {
    scrollLeft: number;
    scrollTop: number;
  }) => {
    
      if (document.body.scrollHeight - params.scrollTop - document.body.clientHeight < 250) {
        fetchNextPage()
      }
  }
  

  const RecordsComponent = ({key, index, style}: ListRowProps) => {
    return (
      <div key={key} style={style}>
        <Dymic key={list[index].dynamic_id} dymic={list[index]}></Dymic>
      </div>
    )
  }



  return (
      <WindowScroller onScroll={loadMore}>
        {({ height, isScrolling, onChildScroll, scrollTop }) => (
          <List
            autoHeight
            rowCount={list.length}
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            rowHeight={240}
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
  const {data: item} = DynamicApi(props.dymic.content, props.dymic.type, data?.uuid)
  
  if (!item || !data) {
    return <></>
  }

  switch (props.dymic.type) {
    case "RELEASE":
      return (
        <DymicItem 
          data={data} 
          item={item} 
          type={props.dymic.type} 
          userInfo={{
            name: item.author.name,
            author_img: item.author.user_img,
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
            name: item.author.name,
            author_img: item.author.user_img,
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
            name: item.author.name,
            author_img: item.author.user_img,
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
            name: item.author.name,
            author_img: item.author.user_img,
            timestamp: item.edit_time

          }}
        ></DymicItem>
      )
    case "Follow":
      return (
        <>
          {
            item !== undefined && data !== undefined ?
            <div>{data?.name}关注了{item.author.name}</div>  : <></>
          }
        </>
      )
    default :
      return  <div></div>
  }
}

const DymicItem = (props: {
  data: getUserType , 
  item: ArticleType, 
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
          name={props.userInfo.name} 
          author_img={props.userInfo.author_img}
          timestamp={props.userInfo.timestamp}
        />
        <DynamicEntry item={props.item} type={props.type as ArticleClassType} />
      <Divider style={{'margin': '12px'}} />
    </div>
  )
}

const UserInfoCompontents: FC<UserInfo> = ({author_img, name, timestamp}) => {
  return (
    <div className={style.baseuserInfo}>
      <LazyLoad height={40}>
        <Image alt="the author logo" src={author_img} width="40" height={"40"}></Image>
      </LazyLoad>
      <div className={style.InfoName}>
        <div className={style.userName}>{name}</div>
        <TimeTamp className={style.timestamp} time={timestamp} ></TimeTamp>
      </div>

    </div>
  )
}

export const DynamicEntry = (props: {
  item: ArticleType,
  type: ArticleClassType
}) => {
  return (
    <Link to={{pathname: '/article' + `/${props.item.outer_id}`}}>
      <div className={style.descWrapper}>
        <div className={style.entryItem}>
          <div className={style.desc}>
              <div className={style.itemTitle}>{props.item.title}</div>
              <div className={style.descText}>{props.item.description}</div>
          </div>
          <PanelHz
            article_data={props.item}
            >
            
            </PanelHz>
        </div>
        
        {
          props.item.article_img  && <Image
            width={140}
            height={95}
            src={props.item.article_img}
            alt='lamp'
            className={style.itemImg}
          />
        }
      </div>
  </Link>
  )
}


const UserIndex = () => {
  const {data: userData, isError}  =  useGetUserByCookie()
  const {data: userInfo, isSuccess: UserInfoSuccess} = GetUserInfo(userData?.uuid)
  const router = useRouter()  
  const navigate = useNavigate()
  const [key, setKey] = useState(router.asPath)


  return (
    <Layout className={style.wrapper}>
      <Header className={style.header}>
        <div className={style.infoBg}>
          <div className={style.userInfo}>
            <Image src={userInfo?.user_img} className={style.userInfoImg} alt={'userInfo'} />
            <div className={style.userInfoText}>{userInfo?.name}</div>
          </div>
        </div>
        <Menu mode='horizontal' defaultSelectedKeys={[key]} >
          {/* <MenuItem key='/user' onClick={() => navigate('/user')}>动态</MenuItem> */}
          <MenuItem key='/user'><Link to={'/user'}>动态</Link></MenuItem>

          <MenuItem key='/user/articles' onClick={() => navigate('/user/articles')}>文章</MenuItem>
          {/* <MenuItem key='3'>关注</MenuItem> */}
          <MenuItem key='/user/collect'><Link to={'/user/collect'}>收藏</Link></MenuItem>
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