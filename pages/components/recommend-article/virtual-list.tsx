import { Avatar, Image, List, Space } from "@arco-design/web-react"
import AvatarComponent from "@arco-design/web-react/es/Avatar"
import React, { useRef, useState } from "react"
import { useVirtual } from "react-virtual"
import style from './virtual-list.module.sass'

type RecomVirtualListType = {
  data: any[]
}


const RecomVirtualList: React.FunctionComponent<RecomVirtualListType> = (props) => {
  const [testList, settestList] = useState([{
    title: '这是一个测试',
    description: '据分析微信健康打卡系统的需求，本着小程序设计开发的三大原则：在功能上，小程序要比原生的APP更加单一；在设计上，小程序要比原生APP更简洁；在',
    hot: '6584545',
    author: '我是一个作者',
    date: '1个月前',
    labels: ['vue', 'react']
  }])

  if (typeof window !== 'undefined') {
    require('../../../public/svg')
  }


  return (
    <List
    style={{ width: 600 }}
    virtualListProps={{
      height: 660,
      
    }}
    dataSource={testList}
    
    render={(item, index) => (
      <List.Item key={index} className={style.listItem}>
        <div className={style.itemTitle}>{item.title}</div>
        <div className={style.itemDesc}>
          <div className={style.descText}>{item.description}</div>
          <Image
            width={100}
            height={70}
            src='https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a8c8cdb109cb051163646151a4a5083b.png~tplv-uwbnlip3yd-webp.webp'
            alt='lamp'
          />
        </div>
        <Space className={style.actionList}>
          <div>
            <svg aria-hidden="true" className={style.panel}>
              <use xlinkHref={"#icon-hot"}></use>
            </svg>
            <div>123123</div>
          </div>
          
        </Space>
      </List.Item>
    )}
  />
  )

} 

export default RecomVirtualList