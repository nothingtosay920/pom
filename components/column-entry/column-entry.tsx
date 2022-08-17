import { Button, Divider, Empty, Image, Popover } from "@arco-design/web-react"
import { IconMore } from "@arco-design/web-react/icon"
import Link from "next/link"
import { FC } from "react"
import { List, ListRowProps, WindowScroller } from "react-virtualized"
import { ArticleMainType } from "../../api/interface/types"
import style from './column-entry.module.sass'

type CloumnEntryProps = {
  item: ArticleMainType[] | undefined
}

const ColumnEntryComponent: FC<ArticleMainType> = (props) => {

    return (
      <Link href={
        props.type === 'SINGLE' ? '/article/' + props.article_id : 'article/muster/' + props.muster_id
      } passHref>
        <div className={style.columnEntry}>

          <div className={style.entryContent}>
            <Image
              width={140}
              height={95}
              src={props.muster_img}
              alt='lamp'
              className={style.entryImg}
            />
            <div>
              <div>{props.name}</div>
              <div className={style.colunmDesc}>{props.description}</div>
            </div>
          </div>
          <Popover
            position='br'
            content={
              <span>
                <Button type='primary' style={{'marginRight': '10px'}}>编辑</Button>
                <Button type='primary' status='danger'>删除</Button>
              </span>
            }
          >
            <IconMore fontSize={30} cursor="pointer" />
          </Popover>


          <div className={style.colunmNums} style={{'display': props.type === 'SINGLE' ? 'none': 'block '}}></div>
        </div>
      </Link>
    )
}


const ColumnEntry: FC<CloumnEntryProps> = ({item}) => {
  
  
  if (item == undefined || item.length == 0) {
    return <Empty className={style.empty}></Empty>
  }

  const RecordsComponent = ({key, index}: ListRowProps) => {
    return <ColumnEntryComponent {...item[index]} key={key}></ColumnEntryComponent>
  }

  const onScroll = () => {}

  return (
    <WindowScroller onScroll={onScroll}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <List
          autoHeight
          rowCount={item.length}
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
  )
}

export default ColumnEntry