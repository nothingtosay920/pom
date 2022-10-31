import React, { FC } from "react"
import { GatherResType } from "../../api/interface/types";
import { Link } from "react-router-dom";
import styles from './gather-info.module.sass'
import { AutoSizer, List, ListRowProps, WindowScroller } from "react-virtualized";
import { Divider } from "@arco-design/web-react";


type InfoProps = {
  gather: GatherResType
}

const GatherInfo:FC<InfoProps> = ({gather}) => {
  
  const RecordsComponent = ({key, index}: ListRowProps) => {
    return (
      <Link to={'/article/' + gather.articles[index].outer_id}>
        <div className={styles.articleTitle}>
          <div className={styles.titleText}>{gather.articles[index].title}</div>
        </div>
      </Link>
    )
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.gatherName}>{gather.gather_name}</div>
      <Divider style={{'margin': '5px 0'}} />

      <AutoSizer>
        {({height, width}) => (
          <List
          height={200}
          rowCount={gather.articles.length}
          rowHeight={30}
          rowRenderer={RecordsComponent}
          width={width}
        />
      )}
      </AutoSizer>
    </div>
  )
}


export default GatherInfo