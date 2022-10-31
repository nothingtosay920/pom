import { Carousel, Divider, Grid, Space } from '@arco-design/web-react'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { CSSProperties, FC } from 'react';
import { GetAllArticles, useGetUserByCookie } from '../../api/interface/api';
import styles from './entrance.module.sass'
import BackgroundImg from '../../public/disappointed.png'
import WhiteImg from '../../public/white.png'
const Row = Grid.Row;
const Col = Grid.Col;


type IContentProps = {
  firstContnet: string,
  secoundContent: string,
  style?:  CSSProperties | undefined,
  className?: string | undefined
}


const ContentComponent: FC<IContentProps> = ({firstContnet, secoundContent, style, className}) => {
  return (
    <div style={style} className={className}>
      <div className={styles.infoImage}>
        <Image
          layout='fill'
          src={WhiteImg}
          alt="artices info"
        />
      </div>

      <div
        className={styles.infosWrapper}
      >
        <div className={styles.info}>
          <div>文章获得的热度</div>
          <div className={styles.value}>{firstContnet}</div>
        </div>
        <div className={styles.info}>
          <div>文章获得的赞</div>
          <div className={styles.value}>{secoundContent }</div>
        </div>
      </div>

    </div>
  )
}

const Entrance = () => {
  const router = useRouter()
  const {data: userData, isError }  =  useGetUserByCookie()
  const {data, isLoading, isIdle} = GetAllArticles(userData?.uuid)

  if (!data || isIdle) {
    return <div className={styles.creatorEntrance}>
      <div>创作中心</div>
      <Divider  />
      <div className={styles.strikTitle}>登录后解锁更多哦</div>
      <div className={styles.wrapperImg}>
        <Image 
          alt='no login'
          layout='fill'
          src={BackgroundImg}></Image>
      </div>
    </div>
  }

  const {zan, hot} = data.reduce((prev, current) => {

    return {
      zan: prev.zan + Number(current.articles.reduce((prev, item) =>{
        prev += item.zan.length
        return prev
      }, 0)),
      hot: prev.hot + Number(current.articles.reduce((prev, item) => {
        prev += Number(item.hot)
        return prev
      }, 0))
    }
  }, {zan: 0, hot: 0})

  return (
    <div className={styles.creatorEntrance}>
      <div>创作中心</div>
      <Divider  />
      <Row gutter={24}>
       <Col className={styles.wrapper} span={8} onClick={() => router.push('/edit')}>
          
            <div className={styles.musterBg}>
              <svg className={styles.panel} aria-hidden="true">
                <use xlinkHref={'#icon-wenzhang'}></use>
              </svg>
            </div>
            <div className={styles.panelText} >写文章</div>
       </Col>
       <Col className={styles.wrapper} span={8} onClick={() => router.push('/user/records')}>
          <div className={styles.gatherBg}>
            <svg className={styles.panel} aria-hidden="true">
              <use xlinkHref={'#icon-wenzhang1'}></use>
            </svg>
          </div>
          <div className={styles.panelText}>足迹</div>
        </Col>
        <Col className={styles.wrapper} span={8} onClick={() => router.push('/user/articles')}>
          <div className={styles.draftBg}>
            <svg className={styles.panel} aria-hidden="true">
              <use xlinkHref={'#icon-caogaoxiang'}></use>
            </svg>
          </div>
          <div className={styles.panelText}>管理文章</div>
        </Col>
      </Row > 
      <Carousel 
        className={styles.carousel}
        direction='vertical'
        showArrow={'never'}
        autoPlay={true}
        indicatorType={'never'}
        // indicatorPosition={'right'}
      >
        <ContentComponent firstContnet={hot+''} secoundContent={zan+''} />  
      </Carousel>
    </div>
  )
}

export default Entrance