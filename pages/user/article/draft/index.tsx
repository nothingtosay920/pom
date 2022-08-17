import { Breadcrumb, Button, Divider, Popover } from "@arco-design/web-react"
import { IconMore } from "@arco-design/web-react/icon"
import style from './draft.module.sass'

const BreadcrumbItem = Breadcrumb.Item

const Draft = () => {
  return (
    <div className={style.draftWrapper}>
      <Breadcrumb className={style.draftBread}>
        <BreadcrumbItem className={style.draftBreadTitle}>草稿箱</BreadcrumbItem>
      </Breadcrumb>
      <div className={style.draftInfo}>
        <div>
          <div>sadasd</div>
          <div>2022-7-21 20:00</div>
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
      </div>
    </div>
  )
}

export default Draft