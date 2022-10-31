import { Breadcrumb, Button, Divider, Empty, List, Message, Popover, Skeleton } from "@arco-design/web-react"
import { IconMore } from "@arco-design/web-react/icon"
import { Link } from "react-router-dom"
import { GetDraft } from "../../../../api/interface/api"
import { draft } from "../../../../api/interface/types"
import ShowDate, { TimeTamp } from "../../../../components/show-date/show-date"
import style from './draft.module.sass'

const BreadcrumbItem = Breadcrumb.Item

const DraftComponents = () => {

  const {data, isLoading} = GetDraft()

  if (data === undefined || data.pages.length === 0) {
    return <Empty className={style.empty}></Empty>
  }

  if (isLoading) {
    return (
      <div className={style.gatherSkeleton}>
      <Skeleton
         text={{
           rows: 3,
           width: ['100%', 600, 400],
           
         }}
         animation={true}
         image
   ></Skeleton> 
   </div>
    )
  }

  const list = data.pages.concat().reduce<draft[]>((prev, current) => {
    prev.push(...current.data)
    return prev
  }, [])

  const renderComponent = (item: any, index: number) => {
    return (
      <Link to={'/edit/' + list[index].outer_id} key={list[index].outer_id} className={style.draftInfo}>
        <div>
          <div>{list[index].title}</div>
          <div className={style.time}>{list[index].edit_time}</div>
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
      </Link>
    )
  }

  return (
        <List
          wrapperStyle={{ width: 750 }}
          bordered={false}
          pagination={{ pageSize: 3 }}
          dataSource={list}
          render={renderComponent}
          noDataElement={<Empty className={style.empty}></Empty>}
        />
  )
}

const Draft = () => {
  
  return (
    <div className={style.draftWrapper}>
      <Breadcrumb className={style.draftBread}>
        <BreadcrumbItem className={style.draftBreadTitle}>草稿箱</BreadcrumbItem>
      </Breadcrumb>
        <DraftComponents></DraftComponents>
    </div>
  )
}

export default Draft