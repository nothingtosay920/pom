import { Divider, Empty, Skeleton } from "@arco-design/web-react"
import { FC } from "react"
import { Link } from "react-router-dom"
import { AutoSizer, List, ListRowProps, WindowScroller } from "react-virtualized"
import { GetRelateRecommend } from "../../api/interface/api"
import styles from './relate-recommend.module.sass'

const RelateRecommend: FC<{label: string}> = ({label}) => {
  const {data, isLoading} = GetRelateRecommend(label)

  if (isLoading) {
    return <Skeleton
        loading={true}
        text={{
          rows: 4,
          width: [400, '80%', 700, 400],
        }}
        animation
        className={styles.skeleton}
      > 
      </Skeleton>
  }

  if ( !data || !data.length) {
    return <Empty className={styles.skeleton}></Empty>
  }

  const RecordsComponent = ({key, index}: ListRowProps) => {
    return (
      <Link key={data[index].outer_id} to={'/article/' + data[index].outer_id}>
        <div  className={styles.articleTitle}>{data[index].title}</div>
      </Link>
    )
  }

  return (
    <div className={styles.bg}>
      <div className={styles.title}>相关文章</div>
    
          <List
            className={styles.wrapper}
            autoHeight
            rowCount={data.length}
            height={165}
            rowHeight={35}
            rowRenderer={RecordsComponent}
            width={200}
          />
    </div>
  )
}

export default RelateRecommend