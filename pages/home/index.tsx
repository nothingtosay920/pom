import { Button, Empty, Image, Result, Skeleton } from '@arco-design/web-react'
import { useRouter } from 'next/router'
import { GetLatestArticles } from '../../api/interface/api'
import Entrance from '../../components/entrance/entrance'
import getBasicLayout from '../../components/Layout'
import RecommendArticle from '../../components/recommend-article/recommend-article'
import styles from '../../styles/Home.module.sass'


const Home = () => {
  const router = useRouter()
  const {data, isError, isLoading, status} = GetLatestArticles(router.asPath ,router.pathname)
  if (isLoading) {
    return <Skeleton
    loading={true}
    style={{'margin': '10vh auto', 'width': '60vw'}}
    text={{
      rows: 8,
      width: [400, '80%', 700, 500, 600, 400, 800, 700],
    }}
    animation
  >
  </Skeleton>
  } 

  return (
      <div className={styles.main}>
          {
          data?.recommendList.length 
            ? <>
                <RecommendArticle data={data}></RecommendArticle>
                <Entrance/>
            </>
            : 
              <Empty className={styles.empty} />
          }
        </div>
  )
}

Home.getLayout = getBasicLayout

export default Home
