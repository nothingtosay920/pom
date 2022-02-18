import type { NextPage } from 'next'
import Image from 'next/image'
import styles from '../styles/Home.module.sass'
import MenuDom from './components/menu/menu'
import UserArticle from './components/user-article/user-article';

const Home: NextPage = () => {
  return (
    <div>
      <MenuDom></MenuDom>
      <div className={styles.main}>
        <div className='user-article'>
          <UserArticle></UserArticle>
        </div>
        <div className='article-list'></div>
      </div>
     
    </div>
  )
}

export default Home
