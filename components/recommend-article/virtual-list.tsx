import { Avatar, Image, List, Space } from "@arco-design/web-react"
import AvatarComponent from "@arco-design/web-react/es/Avatar"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { useVirtual } from "react-virtual"
import { Articles } from "../../api/interface/types"
import Entry from "../entry/entry"
import style from './virtual-list.module.sass'

type RecomVirtualListType = {
  data: Articles[]
}


const RecomVirtualList: React.FunctionComponent<RecomVirtualListType> = (props) => {

  return (
    <List
    className={style.list}
    dataSource={props.data}
    
    render={(item, index) => (
      <List.Item key={index} className={style.listItem}>
        {/* {useMemo(() => <Entry item={item} />, [])} */}
        <Entry item={item} />
      </List.Item>
    )}
  />
  )

} 

export default RecomVirtualList