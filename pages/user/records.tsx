import { Breadcrumb, Button, Divider, Empty, Layout, Space } from "@arco-design/web-react"
import { FC, useState } from "react"
import { List, ListRowProps, WindowScroller } from "react-virtualized"
import { GetRecords } from "../../api/interface/api"
import ShowDate from "../../components/show-date/show-date"
import getBasicLayout from "../../components/Layout"
import style from './records.module.sass'

const Content = Layout.Content
const BreadcrumbItem = Breadcrumb.Item


const time = undefined 



const RecordsComponent = () => {
  const {data} = GetRecords()
  const [page, setpage] = useState(0)

  if (data === undefined) {
    return <Empty className={style.empty}></Empty>
  }

  const list = data.pages.concat().reduce<{
    timestamp: string;
    title: string;
    description: string;
    author: string;
    hot: string;
    zan: string;
    zan_status: string;
    id: string;
    type: string
    }[]>((prev, current) => {
    prev.push(...current.article_data)
    return prev
  }, [])

  const RenderComponent = ({key, index}: ListRowProps) => {

    return (
     <>
        <ShowDate date={list[index].timestamp}></ShowDate>
        <div className={style.contentMain}>
          <div className={style.contentHead}>
            <Button size='mini' type='outline'>文章</Button>
            <div className={style.contentTitle}>{list[index].title}</div>
          </div>
          <div className={style.contentDesc}>{list[index].description}</div>
        </div>
          <Space className={style.infoWrapper} >
            <span className={style.authorName}>{list[index].author} </span>
            <span className={style.editTime}>{list[index].timestamp}</span>
          </Space>
     </>
    )
  }

  const onScroll = ({}) => {
  
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
            rowHeight={150}
            rowRenderer={RenderComponent}
            scrollTop={scrollTop}
            width={730}

          />
        )}
      </WindowScroller>
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