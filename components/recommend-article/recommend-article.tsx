import { Button, Divider, Empty, Image, Input, List, Message, Skeleton, Typography } from '@arco-design/web-react'
import { useRouter } from 'next/router'
import React, { FC, useState } from 'react'
import { useVirtual } from 'react-virtual'
import { GetRecommendListApi } from '../../api/interface/api'
import { ArticleType, LatestArticles } from '../../api/interface/types'
import style from  './recommend-article.module.sass'
import RecomVirtualList from './virtual-list'

export default function RecommendArticle() {
  const router = useRouter()
  const aspath = router.asPath
  const query = router.query
  const {data, isError, isLoading, fetchNextPage, refetch} = GetRecommendListApi(aspath, query['sort'] as string)

  if (isLoading) {
    return <Skeleton
    loading={true}
    className={style.skeleton}
    text={{
      rows: 8,
      width: [400, '80%', 700, 500, 600, 400, 800, 700],
    }}
    animation
  >
  </Skeleton>
  } 

  if (!data || isError) {
    Message.error("error")
    return <></>
  }


  const list = data.pages.reduce<ArticleType[]>((prev, current) => {
      prev.push(...current.data)            
      return prev
  }, [])
  const list_puar:ArticleType[] = []
  list.forEach(element => {
    let flag = true
    list_puar.forEach((item) => {
      if (item.outer_id === element.outer_id) {
        flag = false
      } 
    }) 
    if (flag) {
      list_puar.push(element)
    }
  });
  console.log(list_puar);
  
  if (!list_puar.length) {
    
    return <Empty 
      className={style.empty} 
      description={<Button type='primary' onClick={() => refetch()}>若无数据，请点击刷新！</Button>}
    ></Empty>
  }

  return (
    <main className={style.wrapper}>
      <div className={style.listHader}>
        <Button size='large' type='text'onClick={() => {
          router.push(aspath.replace('?sort=newest', ''))
        }}>
          推荐
        </Button>
        <Divider type='vertical' />
        <Button size='large' type='text' onClick={() => {
          router.replace(aspath + '?sort=newest') 
          }
        }>
          最新
        </Button>
      </div>
      <RecomVirtualList data={list_puar} fetchNextPage={fetchNextPage}></RecomVirtualList>

    </main>
  ) 
}