import { Divider, Dropdown, Empty, Layout } from "@arco-design/web-react";
import { compareAsc, parse } from "date-fns";
import Image from "next/image";
import { FC, memo, useMemo, useRef } from "react";
import { Link } from "react-router-dom";
import { AutoSizer, List, ListRowProps } from "react-virtualized";
import { GetUserMessage, useGetUserByCookie } from "../../../api/interface/api";
import styles from './dynamic.module.sass'

const Header = Layout.Header

type RecordsDidverProps = {
  dateStr: string,
  compontentDateStr: string
}

const RecordsDivider:FC<RecordsDidverProps> = ({dateStr, compontentDateStr}) => {
  const date = parse(dateStr, 'yyyy-MM-dd HH:mm:ss', new Date())
  const compontentDate = parse(compontentDateStr, 'yyyy-MM-dd HH:mm:ss', new Date())
  const compare = compareAsc(date, compontentDate)

  if (compare === 1) {
    return <Divider></Divider>
  } else {
    return <div>123</div>
  }
}

const RecordsDividerMemo = memo(RecordsDivider, (prev, next) => {
  if (prev.dateStr === next.dateStr) {
    return true
  } 
  return false
})

const DynamicComponents = () => {
  const {data: userData} = useGetUserByCookie()
  const {data, isLoading, isSuccess} = GetUserMessage(userData?.uuid)
  let list:{
    timestamp: string;
    article_id: string;
    article_type: string;
    title: string
    info: {
      reading_time: string
    }
  }[]  = []

  if (isSuccess && data) {
    list = data.pages.reduce<{
      timestamp: string;
      article_id: string;
      article_type: string;
      title: string
      info: {
        reading_time: string
      }
    }[]>((prev, current) => {
       prev.push(...current.data)            
       return prev
    }, [])
  }

  const dropList = (
    <div className={styles.droplist}>
      {
        !list.length ? <Empty className={styles.empty}></Empty> : 
        <div>
          <Header className={styles.header}>
            动态
          </Header>
            <AutoSizer>
              {({ height, width }) => (
                  <List
                    autoHeight
                    rowCount={list.length}
                    height={height}
                    rowHeight={60}
                    rowRenderer={RecordsComponent}
                    width={width}
                    onScroll={onScroll}
                  />
              )}
          </AutoSizer>
        </div>
      }
    </div>
  )


  const onScroll = () => {}

  const RecordsComponent = ({key, index, style}: ListRowProps) => {
    return (
      <Link to={'/article/' + list[index].article_id}>
        <a href="" target={'_blank'}>
          <div className={styles.wrapper} key={key}>
            {/* <RecordsDividerMemo
              dateStr={list[index].info.reading_time} 
              compontentDateStr={list[index].timestamp} 
            /> */}
            <div className={styles.info}>
              <div className={styles.title}>{list[index].title}</div>
              </div>
              <div className={styles.imgWrapper}>
              <Image 
              src={'https://ending-homework.oss-cn-beijing.aliyuncs.com/avatar.png?x-oss-process=style/pom-img'} 
              layout="fill"
              alt="the article image"
              ></Image>
            </div>   
          </div>
        </a>
      </Link>
    )
  }



  return (
    <Dropdown droplist={dropList} position='bottom'>
      <svg aria-hidden="true" className={styles.panel}>
        <use xlinkHref={"#icon-iconfontdongtai"}></use>
      </svg> 
    </Dropdown>
  )
}

export default DynamicComponents