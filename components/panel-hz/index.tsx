import { Badge, Message, Space } from "@arco-design/web-react"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { addZan, SavedArticle } from "../../api/gql/gql"
import graphqlClient from "../../api/GqlClient"
import { ArticleClassType, ArticleType } from "../../api/interface/types"
import style from './index.module.sass'

interface ActiveType {
  zan: boolean,
  guanzhu: boolean,
  save: boolean
}

type PanelProps = {
  article_data: ArticleType
}

const PanelHz:React.FunctionComponent<PanelProps> = ({article_data}) => {

  const [active, setactive] = useState<ActiveType>({
    zan: article_data.zan_status,
    guanzhu: false,
    save: false,
  })
  

  function AddZanMutation(data: string, type: ArticleClassType) {
    
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

  function SavedArticleMutation(id: string, type: ArticleClassType) {
    return useMutation(async () => {
      await graphqlClient.request(SavedArticle, {id, type}).then()
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

  const addZanMutation = AddZanMutation(article_data.outer_id, article_data.article_type)
  const followArticle = SavedArticleMutation(article_data.outer_id, article_data.article_type)

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
              article_data.zan_status &&  Number(article_data.zan.length) > 0 ? <div className={style.panelText}>{article_data.zan.length}个点赞！</div>: <div className={style.panelText}>快来点赞吧！</div> 
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