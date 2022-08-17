import ReactMarkdown from 'react-markdown';     // 解析 markdown
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import MarkdownNavbar from 'markdown-navbar';          // markdown 目录
import style from '../../styles/Article.module.sass'
import Head from 'next/head';
import Panel from '../../components/panel/panel';
import { Affix, Button, Image, Menu } from '@arco-design/web-react';
import { NextPageWithLayout } from 'next';
import getBasicLayout from '../../components/Layout';
import { useRouter } from 'next/router';
import { GetArticle } from '../../api/interface/api';
import { Articles } from '../../api/interface/types';
import { useEffect, useState } from 'react';


type AsiderType = {
  markdown: string,
  type: 'MUSTER' | 'GATHER',
  author_img: string,
  author_name: string,
  zan_status: boolean,
  zan: string,
}

type CatalogueType = {
  markdown: string
}


// 侧边栏
const Catalogue: React.FC<CatalogueType> = (props) => <MarkdownNavbar source={props.markdown} ordered={false} />

const Asider: React.FC<AsiderType> = (props) => {
  // 目录 和 作者w
  const [fixed, setfixed] = useState(false)
  const gather_top =  600
  const muster_top = 400
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop
      const top = props.type === 'GATHER' ? gather_top : muster_top
      if (scrollTop > top && fixed === false) {
        setfixed(true)
      } else if (scrollTop < top && fixed === true) {
        setfixed(false)
      }
    })
    return () => {
      window.removeEventListener('scroll', () => {})
    }
  })

  return (
    <div className={style.asiderWrapper}>
        <div className={style.asider}>
            <div className={style.asiderHeadWrapper}>
              <div className={style.asiderHead}>
                <Image src={props.author_img} className={style.userImg} width={60} height={40}></Image>
                <div className={style.userName}>{props.author_name}</div>
              </div>   
              <div className={style.btnPanel}>
                  <Button type='primary' shape='round'>点赞</Button>
                  <Button type='outline' shape='round' className={style.follow}>+关注 {500}</Button>
              </div>    
              
            </div>    
          {
            props.type === 'GATHER' ? <div>123</div> : <></>
          }

        </div>  
        <div className={style.catelogue} style={{'top': fixed ? '20px' : (props.type === 'GATHER' ? gather_top + 'px' : muster_top + 'px')}}>
          <Catalogue markdown={props.markdown} /> 
        </div>

    </div>
  )
}

const NextArticle = () => {
  return (
    <div className={style.ngArticle}>
      <svg aria-hidden="true" className={style.panel}>
        <use xlinkHref={"#icon-arrow-right-bold"}></use>
      </svg>
    </div>
  )
}

// 文章主体
const Main = (props: {
  data: Articles
}) => {

  return (
    <div className={style.warpper}>
      <div className={style.main}>
        <div className={style.articleTitle}>{props.data.title}</div>
        <Image src={props.data.article_img} style={{width: 500, height: 400}}></Image>
        <div>{props.data.description}</div>
        <ReactMarkdown className={style.markdown} remarkPlugins={[remarkGfm]}>
          {props.data.article as string}
        </ReactMarkdown>
      </div>
     
      <Affix offsetTop={150} className={style.panelAffix}>
        <Panel 
          panel_type='vertical' 
          article_data={{
            'article_id': props.data.outer_id,
            'article_type': props.data.type,
            'collection_status': false,
            'follow': props.data.befollowed,
            'follow_status': props.data.follow_status,
            'zan': props.data.zan,
            'zan_status': props.data.zan_status
          }}
          article_id={props.data.outer_id}
          type={props.data.type}
          zan_status={props.data.zan_status}
        />
      </Affix>
      <Asider 
        markdown={props.data.article as string} 
        type={props.data.type} 
        author_img={props.data.author_img}
        author_name={props.data.author_name}
        zan_status={props.data.zan_status}
        zan={props.data.zan}
      />
      <NextArticle />
    </div>
  )
}

const Article: NextPageWithLayout = () => {
  const router = useRouter()
  const {data, isError} = GetArticle(router.query.id as string)

  return (
    <>
      <Head>
        <title>{isError? '出错了': data?.title}</title>
      </Head>
      {
        data === undefined || isError ? <></>: <Main data={data} />
      }
    </>
  )

} 

Article.getLayout = getBasicLayout

export default Article