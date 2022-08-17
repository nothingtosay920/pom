import { Breadcrumb, Empty, Layout, Space } from "@arco-design/web-react"
import { FC, useState } from "react"
import { List, ListRowProps, ListRowRenderer, WindowScroller } from "react-virtualized"
import { DynamicEntry } from "."
import { GetCollectionArticlesArticles } from "../../api/interface/api"
import { dynamicApi } from "../../api/interface/types"
import BaseUserInfo from "../../components/base-user-info/base-user-info"
import getBasicLayout from "../../components/Layout"
import style from './collection.module.sass'

const Content = Layout.Content
const BreadcrumbItem = Breadcrumb.Item

type CollectionEntryProps = {
  data: dynamicApi
}

const CollectionEntry: FC<CollectionEntryProps> = (props) => {
  return (
    <div className={style.entry}>
      <Space direction='horizontal' size='small'>
        <div>{props.data.author_name}</div>
        <div className={style.editTime}>{props.data.edit_time}</div>
        <div>labels</div>
      </Space>
      <div>
        <div className={style.entryTitle}>{props.data.title}</div>
        <div className={style.entryDesc}>{props.data.description}</div>
      </div>
      <div>
        panel
      </div>
    </div>
  )
}


const CollectionArticleComponent = () => {
  const {data: articles, isSuccess, fetchNextPage, hasNextPage, isLoading } = GetCollectionArticlesArticles()
  const [page, setpage] = useState(0)

  if (articles === undefined || articles.pages.length) {
    return <Empty className={style.empty}></Empty>
  }
  console.log(
    articles  , 'aricle'
  );
  
  
  
  const list = articles.pages.concat().reduce<dynamicApi[]>((prev, current) => {
    prev.push(...current.list)
    return prev
  }, [])

function rowRenderer({key, index, style}: ListRowProps) {
  return (
    <div key={key}>
      <CollectionEntry data={list[index]}></CollectionEntry>
    </div>
  );
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
          rowHeight={120}
          rowRenderer={rowRenderer}
          scrollTop={scrollTop}
          width={730}

        />
      )}
    </WindowScroller>
  )
}

const UserCollection = () => {
  return (
    // <DynamicEntry item={}></DynamicEntry>
    <Content className={style.recordsWrapper}>
      <div className={style.recordsContent}>
          <Breadcrumb className={style.bread}>
            <BreadcrumbItem className={style.breadTitle}>我的收藏</BreadcrumbItem>
          </Breadcrumb>
          <CollectionArticleComponent></CollectionArticleComponent>
      </div>
    </Content>
  )
}


UserCollection.getLayout = getBasicLayout

export default UserCollection