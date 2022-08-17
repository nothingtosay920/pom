import { Badge, Message, Space } from "@arco-design/web-react"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { addZan, followedArticle } from "../../api/gql/gql"
import graphqlClient from "../../api/GqlClient"
import { ArticleType } from "../../api/interface/types"
import style from './panel.module.sass'

interface ActiveType {
  zan: boolean,
  guanzhu: boolean,
  save: boolean
}

type PanelProps = {
  article_data: {
    zan: string,
    zan_status: boolean,
    follow: number,
    follow_status: boolean,
    collection_status: boolean,
    article_id: string,
    article_type: ArticleType
  }
  panel_type: 'horizontal' | 'vertical',
  article_id: string,
  type: ArticleType,
  zan_status: boolean
}

const Panel:React.FunctionComponent<PanelProps> = (props) => {

  const [active, setactive] = useState<ActiveType>({
    zan: props.zan_status,
    guanzhu: false,
    save: false,
  })
  

  function AddZanMutation(data: string, type: ArticleType) {
    
    return useMutation(async () => {
      await graphqlClient.request(addZan, {
        data,type
      }, ).then()
    }, {
      onSuccess: () => {
        Message.success('点赞成功!')
        setactive((state) => {
          return {
            ...state,
            zan: !state.zan
          }
        })
      }
    })


  }

  function FollowedArticle(id: string, type: ArticleType) {
    return useMutation(async () => {
      await graphqlClient.request(followedArticle, {id, type}).then()
    }, {
      onSuccess: () => {
        Message.success('关注成功!')
        setactive((state) => {
          return {
            ...state,
            guanzhu: !state.guanzhu
          }
        })
      }
    })
  }

  const addZanMutation = AddZanMutation(props.article_id, props.type)
  const followArticle = FollowedArticle(props.article_id, props.type)

  const zanClick = (e: SyntheticEvent) => {
    if (active.zan) {
      return
    } else {
      addZanMutation.mutate()
    }
  }

  const followClick = () => {
    if (active.guanzhu) {
      return 
    } else {
      followArticle.mutate()
    }
  }

  return (
      <Space direction={props.panel_type} size={'large'}>

          <div className={style.panelWrapper}  data-panel="zan" onClick={zanClick}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={active.zan === false ? "#icon-yiguanzhu" : '#icon-yiguanzhu-copy'}></use>
              </svg>
                {
                  props.panel_type === 'horizontal' ? <div className={style.panelText}>{props.article_data.zan}</div> : <></>
                }
          </div>
          <div className={style.panelWrapper} data-panel="guanzhu" onClick={followClick}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={active.guanzhu === false ? "#icon-guanzhuxuanzhong" : '#icon-guanzhuxuanzhong-copy'}></use>
              </svg>
              {
                props.panel_type === 'horizontal' ? <div className={style.panelText}>{props.article_data.zan}</div> : <></>
              }

          </div>

          <div className={style.panelWrapper} data-panel="save">
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={active.save === false ? "#icon-shoucangshixin" : '#icon-shoucangshixin-copy'} ></use>
            </svg>
            {
                props.panel_type === 'horizontal' ? <div className={style.panelText}>{props.article_data.zan}</div> : <></>
              }
          </div>

        {/* <div className={style.panelWrapper} data-panel="chat">
          <Badge count={1}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref='#icon-bg-chat'></use>
            </svg>
          </Badge>
        </div> */}

      </Space>
  )
}


export default Panel