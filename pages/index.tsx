import type { NextPage } from 'next'
import Head from 'next/head';
import styles from '../styles/Home.module.sass'
import MenuDom from './components/menu/menu'
import RecommendArticle from './components/recommend-article/recommend-article';


const Home: NextPage = () => {
  return (
    <>
      <MenuDom></MenuDom>
      <div className={styles.main}>
        <div className='user-article'>
          <RecommendArticle></RecommendArticle>
        </div>
        <div className='article-list'></div>
      </div>
     
    </>
  )
}

export default Home
