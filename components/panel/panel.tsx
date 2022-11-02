import { Badge, Message, Space } from "@arco-design/web-react"
import { useRouter } from "next/router"
import React, { SyntheticEvent, useEffect, useState } from "react"
import { useMutation } from "react-query"
import { useParams } from "react-router-dom"
import { addZan, collectArticle, followArticle, SavedArticle } from "../../api/gql/gql"
import graphqlClient from "../../api/GqlClient"
import { GetArticlePanelStatus, useGetUserByCookie } from "../../api/interface/api"
import { ArticleClassType, ArticleType } from "../../api/interface/types"
import { useAppDispatch, useAppSelector } from "../../store"
import { open } from "../../store/features/status"
import style from './panel.module.sass'

type PanelProps = {
  panel_type: 'horizontal' | 'vertical',
  article_id: string,
  type: ArticleClassType,
}

const Panel:React.FunctionComponent<PanelProps> = ({panel_type = 'vertical', article_id}) => {
  const router = useRouter()
  const addZanMutation = AddZanMutation(article_id)
  const followArticleMuation = FollowedArticleMutation(article_id)
  const collectArticles = CollectMuation(article_id)
  const {data: userData} = useGetUserByCookie()
  const {data, error, refetch, isSuccess} = GetArticlePanelStatus(router.query.id as string, userData?.uuid)
  const dispatch = useAppDispatch()
 
  function AddZanMutation(data: string) {
    return useMutation(async (zan: boolean) => {
      await graphqlClient.request(addZan, {
        data
      } ).then()
    }, 
      {
        onSuccess: () => {
          refetch()
        },
        onError: (err) => {
          console.log(err);
          
        }
      }
    )


  }

  function FollowedArticleMutation(article_id: string) {
    return useMutation(async (follow: boolean) => {
      await graphqlClient.request(followArticle, {article_id}).then()
    }, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  function CollectMuation(id: string) {
    return useMutation(async (collect: boolean) => {
      await graphqlClient.request(collectArticle, {id}).then((res) => res)
    }, {
      onSuccess: () => {
        refetch()
      }
    })
  }

  const zanClick = () => {
    if (isSuccess && data) {
      addZanMutation.mutate(!data.zan_status)
    } else {
      Message.info('当前未登录')
      dispatch(open())
    }
  }

  const followClick = () => {
    if (isSuccess && data) {
      followArticleMuation.mutate(!data.follow_status)
    } else {
      Message.info('当前未登录')
      dispatch(open())
    }
  }

  const collectClick = () => {
    if (isSuccess && data) {
      collectArticles.mutate(!data.collect_status)
    }else {
      Message.info('当前未登录')
      dispatch(open())
    }
  }

  return (
      <Space direction={panel_type} size={'large'}>

          <div className={style.panelWrapper}  data-panel="zan" onClick={zanClick}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={!!data?.zan_status === false ? "#icon-yiguanzhu" : '#icon-yiguanzhu-copy'}></use>
              </svg>
                {
                  panel_type === 'horizontal' ? <div className={style.panelText}>{data?.zan_status}</div> : <></>
                }
          </div>
          <div className={style.panelWrapper} data-panel="guanzhu" onClick={followClick}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={!!data?.follow_status === false ? "#icon-guanzhuxuanzhong" : '#icon-guanzhuxuanzhong-copy'}></use>
              </svg>
              {
                panel_type === 'horizontal' ? <div className={style.panelText}>{data?.follow_status}</div> : <></>
              }

          </div>

          <div className={style.panelWrapper} data-panel="save"  onClick={collectClick}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={!!data?.collect_status === false ? "#icon-shoucangshixin" : '#icon-shoucangshixin-copy'} ></use>
            </svg>
            {
                panel_type === 'horizontal' ? <div className={style.panelText}>{data?.collect_status}</div> : <></>
              }
          </div>
      </Space>
  )
}


export default Panel