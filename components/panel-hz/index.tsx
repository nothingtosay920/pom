import { Badge, Message, Space } from "@arco-design/web-react"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { addZan, followedArticle } from "../../api/gql/gql"
import graphqlClient from "../../api/GqlClient"
import { ArticleType } from "../../api/interface/types"
import style from './index.module.sass'

interface ActiveType {
  zan: boolean | undefined,
  guanzhu: boolean,
  save: boolean
}

type PanelProps = {
  article_data: {
    zan: string,
    zan_status?: boolean,
    follow_status?: boolean,
    collection_status?: boolean, 
    article_type: ArticleType,

  }
  article_id: string,
  zan_status?: boolean
}

const PanelHz:React.FunctionComponent<PanelProps> = (props) => {

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

  const addZanMutation = AddZanMutation(props.article_id, props.article_data.article_type)
  const followArticle = FollowedArticle(props.article_id, props.article_data.article_type)

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
      <Space direction={'horizontal'} size={'large'}>

          <div className={style.panelWrapper}  data-panel="zan" onClick={zanClick}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={!active.zan ? "#icon-yiguanzhu" : '#icon-yiguanzhu-copy'}></use>
            </svg>
            {
              props.article_data.zan &&  Number(props.article_data.zan) > 0 ? <div className={style.panelText}>{props.article_data.zan}个点赞！</div>: <div className={style.panelText}>快来点赞吧！</div> 
            }
          </div>
  
          <div className={style.panelWrapper} data-panel="guanzhu" onClick={followClick}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={!active.guanzhu ? "#icon-guanzhuxuanzhong" : '#icon-guanzhuxuanzhong-copy'}></use>
              </svg>
              <span className={style.panelText}>关注</span>

          </div>

          <div className={style.panelWrapper} data-panel="save">
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={!active.save ? "#icon-shoucangshixin" : '#icon-shoucangshixin-copy'} ></use>
            </svg>
            <span className={style.panelText}>收藏</span>
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


export default PanelHz