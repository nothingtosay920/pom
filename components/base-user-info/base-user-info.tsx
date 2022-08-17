import { Divider, Space } from "@arco-design/web-react"
import { FC } from "react"
import style from './base-user-info.module.sass'
type BaseUserInfoProps = {
  authorName: string,
  edit_time: string  
}

const BaseUserInfo: FC<BaseUserInfoProps> = (props) => {
  return (
     <Space className={style.infoWrapper} split={<Divider type='vertical' />}  >
        <span className={style.authorName}>{props.authorName} </span>
        <span className={style.editTime}>{props.edit_time}</span>
      </Space>
  )
}


export default BaseUserInfo