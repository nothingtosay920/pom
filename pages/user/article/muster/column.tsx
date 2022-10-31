import { Button, Empty, Image, Menu } from "@arco-design/web-react"
import { useRouter } from "next/router"
import { FC } from "react"
import LazyLoad from "react-lazyload"
import { useMutation } from "react-query"
import { AutoSizer, List, ListRowProps, WindowScroller } from "react-virtualized"
import { createMuster } from "../../../../api/gql/gql"
import graphqlClient from "../../../../api/GqlClient"
import { GetMusterInfoById } from "../../../../api/interface/api"
import ArticleCompoent from "../../../../components/aritlce-component/article-component"
import getBasicLayout from "../../../../components/Layout"
import style from './muster_id.module.sass'

const MenuItem = Menu.Item

const MusterIndex = () => {
  const router = useRouter()
  const query = router.asPath.split('/')
  const {data} = GetMusterInfoById(query[query.length - 1])

  if (!data) {
    return (
      <div>error</div>
    )
  }

  const onScroll = () => {}
  
  const RecordsComponent = ({key, index}: ListRowProps) => {
    return (
      <div className={style.item}>
        <ArticleCompoent 
        data={{
          ...data.articles[index],
          article_type: data.article_type,
          author: data.author,
          zan: data.articles[index].zan.map((item) => ({authorId: item.article_id})),
          follow_user: data.articles[index].follow_status
        }}
        author={data.author}
      ></ArticleCompoent>
      </div>
    )
  }

  return (
    <div className={style.wrapper}>
      <div className={style.nav}>
        <div className={style.gatherName}>{data.gather_name}</div>
        <div className={style.info}>
          <LazyLoad height={120}>
            <Image className={style.muster_img} src={data.gather_img} alt="article" width={150} height={120} />
          </LazyLoad>
          <div className={style.infoContent}>
            <div className={style.authorInfo}>
              <div className={style.authorName}>{data.author.name}</div>
              <div>{data.article_description}</div>
            </div>
            <Button>关注专栏</Button>
          </div>
        </div>
      </div>
      <div className={style.menu}>
        <Menu mode='horizontal' defaultSelectedKeys={['1']}>
          <MenuItem key='1'>收录的文章</MenuItem>
        </Menu>
        {
        data.articles.length ?
        <AutoSizer onScroll={onScroll}>
          {({ height, width }) => (
            <List
              autoHeight
              rowCount={data.articles.length}
              height={height}
              rowHeight={150}
              rowRenderer={RecordsComponent}
              width={width}
  
            />
          )} 
          </AutoSizer>
          : <Empty className={style.empty}></Empty>
        }
      </div>
    </div>
  )
}

MusterIndex.getLayout = getBasicLayout


export default MusterIndex