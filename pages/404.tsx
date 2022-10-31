import { NextPageWithLayout } from "next"
import Image from "next/image"
import getBasicLayout from "../components/Layout"
import BackgroundImg from './../public/404.jpg'
import styles from './../styles/404.module.sass'
import { Button } from "@arco-design/web-react"
import { Link } from "react-router-dom"

const Custom404: NextPageWithLayout = () => {
 
  return (
    <div className={styles.main}>
      <div className={styles.errorImg}>
        <Image src={BackgroundImg} alt="error"></Image>

      </div>
      <Button 
          size='large'
          type='primary'
        ><Link to={'/'}>回到首页</Link></Button>
    </div>
  )
}

Custom404.getLayout = getBasicLayout

export default Custom404
