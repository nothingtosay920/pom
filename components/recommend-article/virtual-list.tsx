import React, { useEffect, useMemo, useRef, useState } from "react"
import { FetchNextPageOptions, InfiniteQueryObserverResult } from "react-query"
import { useVirtual } from "react-virtual"
import { AutoSizer, Index, IndexRange, InfiniteLoader, InfiniteLoaderProps, List, ListRowProps, WindowScroller } from "react-virtualized"
import { ArticleType } from "../../api/interface/types"
import Entry from "../entry/entry"
import styles from './virtual-list.module.sass'

type RecomVirtualListType = {
  data: ArticleType[],
  fetchNextPage: (options?: FetchNextPageOptions | undefined) => Promise<InfiniteQueryObserverResult<{
    data: ArticleType[];
    next: number;
  }, unknown>>
}


const RecomVirtualList: React.FunctionComponent<RecomVirtualListType> = ({data, fetchNextPage}) => {

  const RecordsComponent = ({index}: {index: number}) => (
    <div role={'row'} key={data[index].outer_id} className={styles.listItem}>
      <Entry item={data[index]}></Entry>
    </div>
  )

  const loadMore = (params: {
      scrollLeft: number;
      scrollTop: number;
  }) => {
      if (document.body.scrollHeight - params.scrollTop - document.body.clientHeight < 250) {
        fetchNextPage()
      }
  }

  return (
    <WindowScroller 
      onScroll={loadMore}
    >
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <List
          autoHeight
          rowCount={data.length}
          height={height}
          isScrolling={isScrolling}
          rowHeight={150}
          rowRenderer={RecordsComponent}
          width={740}
        />
      )}
    </WindowScroller>

    )
} 

export default RecomVirtualList