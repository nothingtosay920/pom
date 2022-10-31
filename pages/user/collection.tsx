import { Breadcrumb, Empty, Layout, Space } from "@arco-design/web-react"
import { FC, useState } from "react"
import { List, ListRowProps, ListRowRenderer, WindowScroller } from "react-virtualized"
import { DynamicEntry } from "./user"
import { GetCollectionArticlesArticles, useGetUserByCookie } from "../../api/interface/api"
import BaseUserInfo from "../../components/base-user-info/base-user-info"
import getBasicLayout from "../../components/Layout"
import styles from './collection.module.sass'
import ArticleCompoent from "../../components/aritlce-component/article-component"
import { ArticleType } from "../../api/interface/types"

const Content = Layout.Content
const BreadcrumbItem = Breadcrumb.Item


export const CollectionArticleComponent = () => {
  const {data: userData, isError}  =  useGetUserByCookie()
  const {data: collectArticles, isSuccess, fetchNextPage, hasNextPage, isLoading } = GetCollectionArticlesArticles(userData?.uuid)

  if (collectArticles === undefined || collectArticles.pages.length === 0) {
    return <Empty className={styles.empty}></Empty>
  }
 
  const list = collectArticles.pages.concat().reduce<ArticleType[]>((prev, current) => {
    prev.push(...current.data)
    return prev
  }, [])


  if (!list.length) {
    return <Empty className={styles.empty}></Empty>
  }


  function rowRenderer({key, index, style}: ListRowProps) {
    return (
      <div className={styles.render}>
        <ArticleCompoent 
          key={list[index].outer_id}
          data={list[index]}
          author={list[index].author}
        >
        </ArticleCompoent>
      </div>
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

  return (
    <WindowScroller onScroll={loadMore}>
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
          width={750}

        />
      )}
    </WindowScroller>
  )
}

const UserCollection = () => {
  return (
    // <DynamicEntry item={}></DynamicEntry>
    <Content className={styles.recordsWrapper}>
      <div className={styles.recordsContent}>
          <Breadcrumb className={styles.bread}>
            <BreadcrumbItem className={styles.breadTitle}>我的收藏</BreadcrumbItem>
          </Breadcrumb>
          <CollectionArticleComponent></CollectionArticleComponent>
      </div>
    </Content>
  )
}


UserCollection.getLayout = getBasicLayout

export default UserCollection