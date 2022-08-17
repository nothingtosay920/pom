import { Button, Divider, Image, Input, List, Skeleton, Typography } from '@arco-design/web-react'
import React, { useState } from 'react'
import { useVirtual } from 'react-virtual'
import { GetLatestArticles } from '../../api/interface/api'
import { LatestArticles } from '../../api/interface/types'
import style from  './recommend-article.module.sass'
import RecomVirtualList from './virtual-list'
// import RecomVirtualList from './virtual-list'

type RecommendArticleProps = {
  data: LatestArticles,
}

export default function RecommendArticle(props: RecommendArticleProps) {
  

  return (
    <div className={style.wrapper}>
      <div className={style.listHader}>
        <Button size='large' type='text'>
          推荐
        </Button>
        <Divider type='vertical' />
        <Button size='large' type='text'>
          最新
        </Button>
      </div>
      {/* <Divider style={{'margin': '0' }} type='horizontal' /> */}
      <RecomVirtualList data={props.data?.recommendList}></RecomVirtualList>

    </div>
  ) 
}