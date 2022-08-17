import { Button, Empty, Image, Menu } from "@arco-design/web-react"
import { useRouter } from "next/router"
import { FC } from "react"
import { useMutation } from "react-query"
import { List, ListRowProps, WindowScroller } from "react-virtualized"
import { createMuster } from "../../../../api/gql/gql"
import graphqlClient from "../../../../api/GqlClient"
import { GetMusterInfoById } from "../../../../api/interface/api"
import ArticleCompoent from "../../../../components/aritlce-component/article-component"
import ColumnEntry from "../../../../components/column-entry/column-entry"
import getBasicLayout from "../../../../components/Layout"
import style from './muster_id.module.sass'

const MenuItem = Menu.Item

type CollectArticlesProp = {
  data: {
    article: string,
    description: string,
    edit_time: string,
    hot: string,
    zan: string,
    title: string
  }[],
  author: {
    name: string
  }
}

const CollectArticles: FC<CollectArticlesProp> = ({data, author}) => {
  
  if (data.length === 0) {
    return <div className={style.collect}>
      <Empty className={style.empty}></Empty>
    </div>
  }

  const onScroll = () => {}

  const RecordsComponent = ({key, index}: ListRowProps) => {
    return (
      <ArticleCompoent user={{name: author.name}} data={data[index]}></ArticleCompoent>

    )
  }

  return (
    <WindowScroller onScroll={onScroll}>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <List
          autoHeight
          rowCount={data.length}
          height={height}
          isScrolling={isScrolling}
          onScroll={onChildScroll}
          rowHeight={110}
          rowRenderer={RecordsComponent}
          scrollTop={scrollTop}
          width={750}

        />
      )}
    </WindowScroller>
  )
}

const MusterIndex = () => {
  const router = useRouter()
  const query = router.asPath.split('/')
  const {data} = GetMusterInfoById(query[query.length - 1])


  console.log(data, '---');

  if (!data) {
    return (
      <div>error</div>
    )
  }


  
  return (
    <div className={style.wrapper}>
      <div className={style.nav}>
        <div className={style.head}>
          <div>{data?.name}</div>
          <Button>关注专栏</Button>
        </div>
        <div className={style.info}>
          <Image className={style.muster_img} src={data.muster_img} alt="article" width={150} height={100} />
          <div>
            <div>{data.author.name}</div>
            <div>{data.description}</div>
          </div>
        </div>
      </div>
      <div className={style.menu}>
        <Menu mode='horizontal' defaultSelectedKeys={['1']}>
          <MenuItem key='1'>收录的文章</MenuItem>
        </Menu>
        <CollectArticles data={data.article_data} author={{name: '123 '}}></CollectArticles>
      </div>
    </div>
  )
}

MusterIndex.getLayout = getBasicLayout


export default MusterIndex