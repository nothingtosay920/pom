import { NextPageWithLayout } from "next"
import Image from "next/image"
import getBasicLayout from "../components/Layout"
import BackgroundImg from './../public/404.jpg'
import styles from './../styles/404.module.sass'
import { Button } from "@arco-design/web-react"
import { Link } from "react-router-dom"
import { useGetUserByCookie } from "../api/interface/api"
import { useRouter } from "next/router"

const Unauth: NextPageWithLayout = () => {
  const {data} = useGetUserByCookie()
  const router = useRouter()
  if (data?.uuid) {
    router.back()
  }

  return (
    <div className={styles.main}>
      <div className={styles.errorImg}>
        <Image src={BackgroundImg} alt="error"></Image>
      </div>
      <Button 
          size='large'
          type='primary'
        >当前未登录，请点击登录!</Button>
    </div>
  )
}

Unauth.getLayout = getBasicLayout

export default Unauth
