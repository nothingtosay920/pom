import ReactMarkdown from 'react-markdown';     // 解析 markdown
import remarkGfm from 'remark-gfm';             // markdown 对表格/删除线/脚注等的支持
import MarkdownNavbar from 'markdown-navbar';          // markdown 目录
import style from '../../styles/Article.module.sass'
import Head from 'next/head';
import Panel from '../../components/panel/panel';
import { Affix, Button, Divider, Menu, Message } from '@arco-design/web-react';
import { GetServerSideProps, NextPageWithLayout } from 'next';
import getBasicLayout from '../../components/Layout';
import { GetArticle, GetUserRecommend, InsertFeebackApi, useGetUserByCookie } from '../../api/interface/api';
import { FC, MutableRefObject, ReactElement, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import FingerprintJS from '@fingerprintjs/fingerprintjs-pro'
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { ArticleClassType, ArticleType, GatherResType } from '../../api/interface/types';
import RecommendNavBtn from '../../components/recommend-nav-btn/recommendNavBtn';
import GatherInfo from '../../components/gather-info/gather-info';
import RelateRecommend from '../../components/relate-recommend/relate-recommend';
import { debounce } from 'debounce';
import { useMutation } from 'react-query';
import graphqlClient from '../../api/GqlClient';
import { followUser } from '../../api/gql/gql';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { down, increment, open, up } from '../../store/features/status';
import { useAppDispatch, useAppSelector } from '../../store';
import { Link } from 'react-router-dom';

type ArticleValueType = {
  article: string
  gather: {
    articles: {
      outer_id: string,
      title: string
    }[],
    gather_id: string,
    gather_name: string
  }
} & ArticleType

type ArticlePageProps = {
  data: ArticleValueType,
} 

type AsiderType = {
  markdown: string,
  type: ArticleClassType
  author: {
    name: string;
    uuid: string;
    user_img: string;
  }
  zan_status: boolean,
  zan: string,
  gather: GatherResType,
  category: string,
  follow_user: boolean
}
type CatalogueType = {
  markdown: string
}



// 侧边栏
const Catalogue: React.FC<CatalogueType> = (props) => <MarkdownNavbar updateHashAuto={false} source={props.markdown} ordered={false} />

const Asider: React.FC<AsiderType> = (props) => {
  // 目录 和 作者w
  const [fixed, setfixed] = useState(false)
  const {data} = useGetUserByCookie()
  const goingUp = useRef(0)
  const dispatch = useAppDispatch()

  const gather_top =  700
  const muster_top = 580

  const UseDebounce = debounce((value: boolean) => {setfixed(value)}, 100)
  
  useEffect(() => {

    const loop = () => {
      const scrollTop = document.documentElement.scrollTop
      const top = props.type === 'GATHER' ? gather_top : muster_top
      
      if (scrollTop > top && fixed === false) {
        // debounce(() => {
          UseDebounce(true)
        // }, 500);
        goingUp.current = scrollTop
      } else if (scrollTop <= top && fixed === true) {
        UseDebounce(false)
        goingUp.current = scrollTop
      } else {
        requestAnimationFrame(loop)
      }
      
      
    }
    requestAnimationFrame(loop)
  }, [fixed, goingUp, UseDebounce, props.type])
  
  function FollowedUserMutation(followed_id: string) {
    return useMutation(async (followStatus: boolean) => {
      await graphqlClient.request(followUser, {followed_id}).then()
    })
  }

  const followUserMutation = FollowedUserMutation(props.author.uuid)

  const followUserHandle = () => {
    if (data?.uuid) {
      followUserMutation.mutate(props.follow_user)
    }else {
      Message.info('当前未登录')
      dispatch(open())
    }
  }

  return (
    <div className={style.asiderWrapper}>
        <div className={style.asider}>
            <div className={style.asiderHeadWrapper}>
              <div className={style.asiderHead}>
                <div className={style.asiderImage}>
                  <Image layout='fill' alt='the user logo' src={props.author.user_img}></Image>
                </div>
                <div className={style.userName}>{props.author.name}</div>
              </div>  
              <div className={style.btnPanel}>
                  <Button 
                    type={props.follow_user ? 'primary' : 'outline'}
                    shape='round' 
                    className={style.follow}
                    onClick={() => followUserHandle()}
                  >{props.follow_user ? '已关注' : '+关注'}</Button>
              </div>    
              
            </div>    
        </div>  
        {
          props.type === 'GATHER' ? <GatherInfo gather={props.gather}></GatherInfo> : <></>
        }
        <RelateRecommend label={props.category}></RelateRecommend>
        <div className={!fixed ? style.catelogue : style.fixedCatelogue}>
          <Catalogue markdown={props.markdown} /> 
        </div>

      </div>
  )
}

// 文章主体
const Main = (props: {
  data: ArticleValueType,
}) => {
  
 
  const router = useRouter()
  const {page, num} = useAppSelector((store) => store.relateStatus)
  const {data, isSuccess} = GetUserRecommend(page)
  const dispatch = useDispatch()


  const prev = (isSuccess && data) ? data[num - 1] : undefined
  const next =  (isSuccess && data) ? data[num + 1] : undefined

  const upClick = () => {
    if (!!(page !== 0 || prev)) {
      dispatch(up())
      router.push('/article/' + prev)
    }
  }

  const downClick = () => {
    
    if (next) {
      dispatch(down())
      router.push('/article/' + next)
    }

  }

  return (
    <div className={style.warpper}>
      <div className={style.main}>
        <div className={style.articleTitle}>{props.data.title}</div>
        {
          props.data.article_img && <div className={style.article_img}>
          <Image 
            alt='the author logo' 
            src={props.data.article_img} layout="fill">
          </Image>
        </div>
        }
        <div>{props.data.description}</div>
        <ReactMarkdown className={style.markdown} remarkPlugins={[remarkGfm]}>
          {props.data.article}
        </ReactMarkdown>
      </div>
     
      <RecommendNavBtn 
        className={style.NavBtn} 
        upClick={upClick} 
        downClick={downClick}
        prev={prev}
        next={next}
        page={page}
      ></RecommendNavBtn>

      <Affix offsetTop={200} className={style.panelAffix}>
         <Panel 
          panel_type='vertical' 
          article_id={props.data.outer_id}
          type={props.data.article_type}
        />
      </Affix>
      <Asider 
        markdown={props.data.article as string} 
        type={props.data.article_type} 
        author={props.data.author}
        zan_status={props.data.zan_status}
        zan={props.data.zan.length + ''}
        gather={props.data.gather}
        category={props.data.categorys[0].category_id}
        follow_user={props.data.follow_user}
      />
    </div>
  )
}

export const getServerSideProps:GetServerSideProps = async (context) => {
  // Fetch data from external API

  const id = context.params?.id
  const token = context.req.cookies['token']
  const data = await GetArticle(id as string, token)

  // Pass data to the page via props
  return { props: { data } }
}


const Article: FC<ArticlePageProps> & {  getLayout:(page: ReactElement) => ReactNode } = ({data}) => {

  const [extendedResult, updateExtendedResult] = useState(false)
  const { isLoading, error, data: userAgentData, getData } = useVisitorData({ extendedResult }, { immediate: true })
  useEffect(() => {
    InsertFeebackApi(data.outer_id, userAgentData?.visitorId)
    return 
  }, [userAgentData?.visitorId, data.outer_id])
  
  return (
    <div>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Main data={data}></Main>
    </div>
  )

} 



Article.getLayout = getBasicLayout

export default Article