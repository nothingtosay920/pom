import { Button, Divider, Empty } from '@arco-design/web-react'
import { NextPageWithLayout } from 'next'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { List, ListRowProps, WindowScroller } from 'react-virtualized'
import { SerachApi } from '../../api/interface/api'
import ArticleCompoent from '../../components/aritlce-component/article-component'
import getBasicLayout from '../../components/Layout'
import styles from '../../styles/Search.module.sass'

const SearchList = () => {
  const [page, setPage] = useState(0)
  const [getParams, setParams] = useSearchParams()

  const {data, isSuccess, fetchNextPage, hasNextPage, isLoading } = SerachApi(getParams.get('query') + '', 0)

  if (!data?.pages || !data.pages[0].data.length) {
    return <Empty description="数据为空"></Empty>
  }
  
  console.log(data);
  

  const onScroll = () => {}
  
  const RecordsComponent = ({key, index}: ListRowProps) => {
    return <ArticleCompoent key={data?.pages[page].data[index].outer_id} data={{
      ...data?.pages[page].data[index]
    }} author={data?.pages[page].data[index].author}></ArticleCompoent>
  }

  return (
    <WindowScroller onScroll={onScroll}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <List
          autoHeight
          rowCount={data.pages[page].data.length}
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          rowHeight={125}
          rowRenderer={RecordsComponent}
          scrollTop={scrollTop}
          width={750}

        />
      )}
    </WindowScroller>
  )
}

const Search: NextPageWithLayout = () => {
  return (
    <div className={styles.searchMain}>
        <div>
        <Button size='large' type='text'>
            综合
          </Button>
        </div>
        <SearchList></SearchList>
    </div>
  )
}

Search.getLayout = getBasicLayout

export default Search
