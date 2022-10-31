import { Button, Divider, Empty, Image, List, Popover } from "@arco-design/web-react"
import { IconMore } from "@arco-design/web-react/icon"
import Link from "next/link"
import { FC } from "react"
import { ListRowProps, WindowScroller } from "react-virtualized"
import { ArticleClassType, ArticleType } from "../../api/interface/types"
import style from './column-entry.module.sass'

export type ColumnItem = {
  gather_img?: string,
  gather_name?: string,
  gather_id?: string,
  article_description?: string,
  outer_id?: string,
  article_img?: string,
  description?: string
  title?: string,
  article_type: ArticleClassType
  articles?: {
    outer_id: string;
  }[]
}

type ColumnEntryItem = {
  data: ColumnItem,
  index: number | undefined
}

 type CloumnEntryProps = {
  data: ColumnItem[],
}

const ColumnEntryComponent: FC<ColumnEntryItem> = ({data, index}) => {
    return (
      <Link href={
        data.article_type === 'SINGLE' ? '/article/' + data.outer_id : 'column/' + data.gather_id
      } passHref>
        <a target="_blank" rel="noreferrer">
        <div className={style.columnEntry}>

          <div className={style.entryContent}>
            {
              (data.article_type=== 'SINGLE' ?  data.article_img : data.gather_img) && 
              <Image
                width={140}
                height={95}
                src={data.article_type === 'SINGLE' ?  data.article_img : data.gather_img}
                alt='lamp'
                className={style.entryImg}
              />
            }
            <div>
              <div>{data.article_type=== 'SINGLE' ? data.title : data.gather_name}</div>
              <div className={style.colunmDesc}>{data.article_type=== 'SINGLE' ? data.description : data.article_description}</div>
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

          {
            data.article_type === 'SINGLE' || index === 0 || !index || !data.article_img ?  <></> :
            <div className={style.colunmNums}>{index}</div>
          }
          
        </div>
        </a>
      </Link>
    )
}


const ColumnEntry: FC<CloumnEntryProps> = ({data}) => {
  
  const RecordsComponent = (item: any, index: number) => {
    return <ColumnEntryComponent 
      data={data[index]}
      index={data[index].article_type === 'SINGLE' ? 0 : data[index].articles?.length}
      key={data[index].article_type === 'SINGLE' ? data[index].outer_id : data[index].gather_id }
    ></ColumnEntryComponent>
  }

  return (
    <List
      className='list-demo-action-layout'
      wrapperStyle={{ maxWidth: 840 }}
      bordered={false}
      pagination={{ pageSize: 3 }}
      dataSource={data}
      render={RecordsComponent}
      noDataElement={<Empty className={style.empty}></Empty>}
    />
  )
}

export default ColumnEntry