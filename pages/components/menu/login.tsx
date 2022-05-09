import { Avatar, Button, Input, InputNumber, Message, Modal } from "@arco-design/web-react"
import request, { gql } from "graphql-request"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useQuery } from "react-query"
import { LoginApi, useGetUserByCookie } from "../../api/interface/api"
import { RAF } from "../../utills/RAF"
import style from './login.module.sass'

const InputSearch = Input.Search

export default function Login() {
  const [showM, setShowM] = useState(false)
  const [phone, setphone] = useState<number | undefined>(undefined)
  const [code, setcode] = useState<string>('')
  const [placeholder, setplaceholder] = useState("获取验证码")
  const [status, setstatus] = useState(true)
  const router = useRouter()
  const createMutation = LoginApi({
    phone: phone+''
  })
  // const {status: loginStatus, data} = useGetUserByCookie()

  

  const onSearch = () => {
    if (status) {
      RAF((time) => {
        setplaceholder(`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${time / 1000}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`)
        if (time === 0) {
          setplaceholder("获取验证码")
          setstatus(true)
        }
      }, {
        totalDuration: 60 * 1000,
        interval: 1000
      })
    }
    setstatus(false)
  }

  const login = async () => {
    if (phone && (/^1[345789]\d{9}$/.test(phone + ''))) {
      await createMutation.mutate()
      if (createMutation.isSuccess) {
        setShowM(false)
      }
    } else {
      Message.error('手机号格式错误!')
    }
  }

  return (
    <>
      <Head>
        <title>user的个人主页</title>
      </Head>
      {'success' === 'success' 
      ?   <Avatar size={40} className={style.avatar} onClick={() => router.push('/user')}>
          Arco
        </Avatar>
      : 
        <Button size="large" type='outline' className={style.lBtn} onClick={() => setShowM(true)}>
          登录
        </Button>
      }

      <Modal
        title="手机登录"
        visible={showM}
        footer={null}
        onCancel={() => {setShowM(false);}}
        className={style.modal}
      >
        <div className={style.inputGroup}>
          <InputNumber value={phone} className={style.inputPhoneNumber} onChange={setphone} prefix='+86' placeholder='请输入手机号' />
          <InputSearch
            className={style.inputPhoneNumber}
            searchButton={placeholder}
            defaultValue={code}
            placeholder='验证码'
            maxLength={11}
            onSearch={onSearch}
          />
          <Button type="primary" className={style.loginBtn} onClick={login}>
            登录
          </Button>

        </div>
      </Modal>
    </>
  )
}