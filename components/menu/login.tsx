import { Avatar, Button, Divider, Dropdown, Input, InputNumber, Menu, Message, Modal, Space, Spin } from "@arco-design/web-react"
import request, { gql } from "graphql-request"
import Head from "next/head"
import { useRouter } from "next/router"
import { FC, ReactElement, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "react-query"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
// import { Link } from "react-router-dom"
import { close, open } from "../../store/features/status"
import { RAF } from "../../utills/RAF"
import style from './login.module.sass'
import Link from 'next/link'
import { useNavigate } from "react-router-dom"
import { createUserParam } from "../../api/interface/types"
import graphqlClient from "../../api/GqlClient"
import { createUserMutaion, logOutGql } from "../../api/gql/gql"
import { useGetUserByCookie } from "../../api/interface/api"
import { useAppSelector } from "../../store"


const InputSearch = Input.Search



export default function Login() {
  const [phone, setphone] = useState<number | undefined>(undefined)
  const [code, setcode] = useState<string>('')
  const {data, isError}  =  useGetUserByCookie()
  const [status, setstatus] = useState(true)
  const router = useRouter()
  const createMutation = LoginApi({
    phone: phone+''
  })
  const dispatch = useDispatch()
  const {value: showStatus} = useAppSelector((state) => state.loginStatus)

  const logOutMutation = LogOutMutation()


  function LogOutMutation() {
    return useMutation(async () => {
      return await graphqlClient.request(logOutGql).then((res) => {
        return res
      })
    }, 
    {
      onSuccess: () => {
        router.reload()
      }
    })
  }

  function LoginApi(data: createUserParam) {
    return useMutation(
      async () => {
        return await graphqlClient.request(createUserMutaion, { ...data }).then((data) => data)
      }, 
      {
        onSuccess: () => {
          dispatch(close())
          router.reload()
        }
      }
    )
  }
  

  const onSearch = () => {
    if (status) {
      RAF((time) => {
        if (time === 0) {
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
      await createMutation.mutateAsync()
    } else {
      Message.error('手机号格式错误!')
    }
  }

  const logOutFuc = async () => {
    await logOutMutation.mutateAsync()
  }

  const dropList =  (
    <Menu style={{'minHeight': '260px', 'minWidth': '120px'}}>
     <Menu.Item key='1'>
      {/* <Link href={'/writing'} passHref >
        <a href={'/writing'} rel="noopener">写文章</a>
      
      </Link> */}
      <div onClick={() => router.push('/edit')}>写文章</div>
      
       </Menu.Item>
      <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='2'>
      
      <Link href={'/user'} passHref>
        <a href={'/user'} rel="noopener">我的主页</a>
      </Link>
      </Menu.Item>
     <Menu.Item key='3'>
      <div onClick={() => router.push('/creator/all')}>我的文章</div>
      </Menu.Item>
     <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='4'><Link href={'/user/collection'} passHref>
      <a>我的收藏</a>
      </Link></Menu.Item>
     <Menu.Item key='5'><Link href={'/user/records'} >浏览记录</Link></Menu.Item>
     <Divider style={{'margin': '5px 0'}} />
     <Menu.Item key='6' onClick={() => logOutFuc()}>退出</Menu.Item>
   </Menu>
);


  return (
    <>
      <Head>
        <title>短文-短文章阅读网站</title>
      </Head>

          { data && data.uuid
          ? <Dropdown droplist={dropList} position="bottom">
              <Avatar size={50} className={style.avatar}
              //  onClick={() => router.push('/user')}
              >
              Arco
              </Avatar>
            </Dropdown>
          : 
            <Button type='outline' className={style.lBtn} onClick={() => dispatch(open())}>
              登录
            </Button>
          }
      <Modal
        title="手机登录"
        visible={showStatus}
        footer={null}
        onCancel={() => {dispatch(close())}}
        className={style.modal}
      >
        <div className={style.inputGroup}>
          <InputNumber value={phone} className={style.inputPhoneNumber} onChange={setphone} prefix='+86' placeholder={'请输入手机号'} />
          <Button type="primary" className={style.loginBtn} onClick={() => login()}>
            登录
          </Button>
        </div>
      </Modal>
    </>
  )
}