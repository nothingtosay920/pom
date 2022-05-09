import { Badge, Space } from "@arco-design/web-react"
import { AppInitialProps } from "next/app"
import React, { SyntheticEvent, useState } from "react"
import style from './panel.module.sass'

interface ActiveType {
  zan: boolean,
  guanzhu: boolean,
  save: boolean
}

const Panel:React.FunctionComponent = () => {
  if (typeof window !== 'undefined') {
    require('../../../public/svg')
  }

  const [active, setactive] = useState<ActiveType>({
    zan: false,
    guanzhu: false,
    save: false,
  })

  const zanClick = (e: SyntheticEvent) => {
    console.log('zan');
    setactive((state) => {
      return {
        ...state,
        zan: !state.zan
      }
    })
  }

  return (
      <Space direction='vertical' size={'large'}>

        <div className={style.panelWrapper} data-panel="zan" onClick={zanClick}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={active.zan === false ? "#icon-yiguanzhu" : '#icon-yiguanzhu-copy'}></use>
            </svg>
        </div>
        <div className={style.panelWrapper} data-panel="guanzhu">
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={active.zan === false ? "#icon-guanzhuxuanzhong" : '#icon-guanzhuxuanzhong-copy'}></use>
            </svg>
        </div>

        <div className={style.panelWrapper} data-panel="save">
          <svg className={style.panel} aria-hidden="true">
            <use xlinkHref={active.zan === false ? "#icon-shoucangshixin" : '#icon-shoucangshixin-copy'} ></use>
          </svg>
        </div>

        <div className={style.panelWrapper} data-panel="chat">
          <Badge count={1}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref='#icon-bg-chat'></use>
            </svg>
          </Badge>
        </div>

      </Space>
  )
}


export default Panel