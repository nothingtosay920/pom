import { Avatar, Button, Divider, Dropdown, Input, InputNumber, Menu, Message, Modal, Space, Spin } from "@arco-design/web-react"
import request, { gql } from "graphql-request"
import Head from "next/head"
import { useRouter } from "next/router"
import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import { useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import { LoginApi, LogOutMutation, useGetUserByCookie } from "../../api/interface/api"
import { close, logIn, logOut, show } from "../../store/features/status"
import { RAF } from "../../utills/RAF"
import style from './login.module.sass'
import Link from 'next/link'


const InputSearch = Input.Search



export default function Login() {
  const [showM, setShowM] = useState(false)
  const [phone, setphone] = useState<number | undefined>(undefined)
  const [code, setcode] = useState<string>('')
  const [placeholder, setplaceholder] = useState("获取验证码")
  const {data, isError}  =  useGetUserByCookie()
  const [status, setstatus] = useState(true)
  const router = useRouter()
  const createMutation = LoginApi({
    phone: phone+''
  })
  // const dispatch = useDispatch()

  
  const logOutMutation = LogOutMutation()

  const onSearch = () => {
    if (status) {
      RAF((time) => {
        // setplaceholder(`\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0${time / 1000}\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0`)
        if (time === 0) {
          // setplaceholder("获取验证码")
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
      // dispatch(show())
      setShowM(false)
      const res = await createMutation.mutateAsync()
      if (res.Login.code=== 200) {
        router.reload()
        // dispatch(close())
        }
      
    } else {
      Message.error('手机号格式错误!')
    }
  }

  const logOutFuc = async () => {
    const res = await logOutMutation.mutateAsync()
    if (res.LogOut.code === 200) {
      router.reload()

    }
  }

  const dropList =  (
    <Menu style={{'minHeight': '300px', 'minWidth': '120px'}}>
     <Menu.Item key='1'>
      {/* <Link href={'/writing'} passHref >
        <a href={'/writing'} rel="noopener">写文章</a>
      
      </Link> */}
      <div onClick={() => router.push('/edit')}>写文章</div>
      
       </Menu.Item>
      <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='2'>
      
      {/* <Link href={'/user'} passHref>
        <a href={'/user'} rel="noopener">我的主页</a>
      </Link> */}
      
      <div onClick={() => router.push('/user')}>我的主页</div>
      
      </Menu.Item>
     <Menu.Item key='3'>
      {/* <Link href={'/user/article'} passHref>
      <a href={'/user/article'} rel="noopener">我的文章</a>
      </Link> */}
      <div onClick={() => router.push('/user/article')}>我的文章</div>
      
      </Menu.Item>
     <Menu.Item key='4'>我的关注</Menu.Item>
     <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='5'><Link href={'/user/collection'} passHref>
      <a>我的收藏</a>
      </Link></Menu.Item>
     <Menu.Item key='6'><Link href={'/user/records'} >浏览记录</Link></Menu.Item>
     <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='7' onClick={() => logOutFuc()}>退出</Menu.Item>
   </Menu>
);


  return (
    <>
      <Head>
        <title>短文-短文章阅读网站</title>
      </Head>

          { data?.open_id
          ? <Dropdown droplist={dropList} position="bottom">
              <Avatar size={50} className={style.avatar}
              //  onClick={() => router.push('/user')}
              >
              Arco
              </Avatar>
            </Dropdown>
          : 
            <Button type='outline' className={style.lBtn} onClick={() => setShowM(true)}>
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
          <InputNumber value={phone} className={style.inputPhoneNumber} onChange={setphone} prefix='+86' placeholder={'请输入手机号'} />
          <InputSearch
            className={style.inputPhoneNumber}
            searchButton={placeholder}
            defaultValue={code}
            placeholder='验证码'
            maxLength={11}
            onSearch={onSearch}
          />
          <Button type="primary" className={style.loginBtn} onClick={() => login()}>
            登录
          </Button>
        </div>
      </Modal>
    </>
  )
}