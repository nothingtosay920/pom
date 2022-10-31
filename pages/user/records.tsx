import { Breadcrumb, Button, Divider, Empty, Layout, Skeleton, Space } from "@arco-design/web-react"
import { FC, useState } from "react"
import { AutoSizer, List, ListRowProps, WindowScroller } from "react-virtualized"
import { GetRecords, useGetUserByCookie } from "../../api/interface/api"
import ShowDate, { ShowDateDistance } from "../../components/show-date/show-date"
import getBasicLayout from "../../components/Layout"
import style from './records.module.sass'
import { Link } from "react-router-dom"

const Content = Layout.Content
const BreadcrumbItem = Breadcrumb.Item


const RecordsComponent = () => {
  const {data: userData, isError}  =  useGetUserByCookie()

  const {data, isLoading} = GetRecords(userData?.uuid)

  if (isLoading) {
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


  if (data === undefined) {
    return <Empty className={style.empty}></Empty>
  }

  const list = data.pages.concat().reduce<{
    timestamp: string;
    title: string;
    description: string;
    author:{
      name: string
      uuid: string
      user_img: string
    }
    hot: string;
    zan: string;
    zan_status: string;
    outer_id: string;
    type: string
    }[]>((prev, current) => {
    prev.push(...current.data)
    return prev
  }, [])

  if (list.length === 0) {
    return <Empty className={style.empty}></Empty>
  }

  const RenderComponent = ({key, index}: ListRowProps) => {

    return (
     <div key={list[index].outer_id} className={style.contentWrapper}>
        <ShowDateDistance date={list[index].timestamp}></ShowDateDistance>
        <div className={style.contentMain}>
          <div className={style.contentHead}>
            <Button size='mini' type='outline'>文章</Button>
            <Link to={'/article/' + list[index].outer_id}>
              <div className={style.contentTitle}>{list[index].title}</div>
            </Link>
          </div>
          <div className={style.contentDesc}>{list[index].description}</div>
        </div>
          <Space className={style.infoWrapper} >
            <span className={style.authorName}>{list[index].author.name} </span>
            <span className={style.editTime}>{list[index].timestamp}</span>
          </Space>
     </div>
    )
  }

  const onScroll = ({}) => {
  
  }


  return (
    <AutoSizer onScroll={onScroll}>
        {({ height, width }) => (
          <List
            autoHeight
            rowCount={list.length}
            height={height}
            rowHeight={130}
            rowRenderer={RenderComponent}
            width={width}

          />
        )}
      </AutoSizer>
  )
}


const UserRecords = () => {

  return (
    <Content className={style.recordsWrapper}>
      <div className={style.recordsContent}>
        <Breadcrumb className={style.bread}>
          <BreadcrumbItem className={style.breadTitle}>浏览记录</BreadcrumbItem>
        </Breadcrumb>
        <RecordsComponent></RecordsComponent>
      </div>
    </Content>
  )
}


UserRecords.getLayout = getBasicLayout

export default UserRecords