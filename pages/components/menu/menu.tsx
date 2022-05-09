import { Menu, Input, Avatar, Button, Trigger, Tooltip, Space } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import React, { useMemo } from 'react';
import { GetCategorys } from '../../api/interface/api';
import Login from './login';
// import style from  '../../../styles/menu.module.scss'
import style from './menu.module.sass'
const MenuItem = Menu.Item;
const InputSearch = Input.Search;

export default React.memo(function MenuDom() {
  const router = useRouter()
  const {data, isError} = GetCategorys()
  
  return (
        <div className={style.menu}>
          <Avatar size={32} shape='square' className={style.canClick} onClick={() => router.push('/')}>
            LOGO
          </Avatar>

          <Input
            allowClear
            placeholder='Please Enter something'
            className={style.inputArea}
          />

          <Menu mode='horizontal' theme='dark' className={style.main} defaultSelectedKeys={['1']}>
      
            <div style={{'display': 'inline-block'}}>
              <MenuItem key='1'>综合</MenuItem>
              <MenuItem key='2'>综合</MenuItem>
              <MenuItem key='3'>综合</MenuItem>
              <MenuItem key='4'>综合</MenuItem>
              <MenuItem key='5'>综合</MenuItem>
            </div>
          </Menu>
          {/* {
                !data?.length ? <></> : data.map((item, index) => {
                  return <MenuItem key={index + 2 + ''}>{item.name}</MenuItem>
                })
              } */}


          {/* <Button className={style.writen} type='primary' onClick={() => router.push('/writing')}>
            写文章
          </Button> */}
          {/* <div className={style.creator}>
            <Login></Login>
          </div> */}
        </div>
  );
})

