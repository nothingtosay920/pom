import { Breadcrumb, Empty, Input, Skeleton } from "@arco-design/web-react"
import { useRouter } from "next/router"
import { useState } from "react"
import { List, ListRowProps, WindowScroller } from "react-virtualized"
import { GetAllArticlesPagenation, useGetUserByCookie } from "../../api/interface/api"
import { GatherType } from "../../api/interface/types"
import ArticleCompoent from "../aritlce-component/article-component"
import GatherComponent from "../gather-component/gather-component"
import styles from './all-articles.module.sass'


const BreadcrumbItem = Breadcrumb.Item
const InputSearch = Input.Search


export const AllArticleComponent = () => {
  const {data: userData, isError}  =  useGetUserByCookie()
  const router = useRouter()
  const {data: columnArticles, isLoading, fetchNextPage, hasNextPage, isIdle } = GetAllArticlesPagenation(userData?.uuid)

  if (isIdle) {
    router.push('/unauth')
  }

  if (isLoading) {
    return <Skeleton
    loading={true}
    text={{
      rows: 4,
      width: [400, '80%', 700, 400],
    }}
    animation
  >
  </Skeleton>
  }

  if (columnArticles === undefined) {
    return <Empty></Empty>
  }

  const list = columnArticles.pages.reduce<(GatherType)[]>((prev, current) => {
     prev.push(...current.data)            
     return prev
  }, [])

  
  const onScroll = () => {}

  const RecordsComponent = ({key, index}: ListRowProps) => {

    if (list[index].article_type === 'GATHER') {
      return <GatherComponent key={list[index].gather_id } author={list[index].author} data={list[index]}></GatherComponent>
    } else {
      return <ArticleCompoent key={list[index].gather_id} author={list[index].author} data={list[index].articles[0]}></ArticleCompoent>
    }
  }

  return (
    <div>
      <div className={styles.gatherWrapper}>
        <Breadcrumb className={styles.bread}>
          <BreadcrumbItem className={styles.breadTitle}>文章管理</BreadcrumbItem>
        </Breadcrumb>
        </div>

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
    </div>
  )
}
