import { Button, Empty, Image, Result, Skeleton } from '@arco-design/web-react'
import { useRouter } from 'next/router'
import { Outlet } from 'react-router-dom'
import { GetLabelsSSRAPi } from '../../api/interface/api'
import Entrance from '../../components/entrance/entrance'
import getBasicLayout from '../../components/Layout'
import RecommendArticle from '../../components/recommend-article/recommend-article'
import styles from '../../styles/Home.module.sass'


const Home = () => {
  return (
      <div className={styles.main}>
            <RecommendArticle></RecommendArticle>
            <Entrance/>
        </div>
  )
}

Home.getLayout = getBasicLayout

export default Home
