import { Menu, Input, Avatar, Button, Trigger, Tooltip, Space, Dropdown, Message } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';
import { useRouter } from 'next/router';
import React, { FC, Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetCategorys } from '../../api/interface/api';
import { Category, getCategorysRes } from '../../api/interface/types';
import { _isMobile } from '../../utills/utill';
import DynamicComponents from './dynamic/dynamic';
import Login from './login';
import style from './menu.module.sass'
import Tool from './tool';
const InputSearch = Input.Search;



type NavListProps = {
  categories: [Category]
}

const NavList:FC<NavListProps> = ({categories}) => {
  const router = useRouter()
  return (
    <div className={style.categorys}>
     { categories.map((item, index) => {
          return (
            <Trigger 
              showArrow={item.labels.length ? true : false}
              key={item.description}
              popup={() =>{
                if (item.labels.length) {
                  return <Tool item={item}  />
                } else {
                  return <div></div>
                }
              }}
              position='bottom'
              classNames='zoomInTop'
              
              // popupAlign={{ bottom: [10, 10] }}
              mouseEnterDelay={400}
              >
                <button className={style.itemBtn} onClick={() => {
                  router.push(`/${item.description}`)
                }}>{item.name}</button>
            </Trigger>
          )
        })}
    </div>
  )
}


const MenuDom = () => {
  const router = useRouter()
  const {data: categorys, isLoading, isError} = GetCategorys()

  if (isLoading) {
    return <></>
  } else if (!categorys?.length || isError) {
    Message.error({content: '出错了。。。'})
    return <></>
  }
  
  return (
        <Space className={style.menu}>
          <Avatar size={48} shape='square' className={style.canClick} onClick={() => router.push('/')}>
            LOGO
          </Avatar>

          <NavList categories={categorys} />
          <InputSearch 
            allowClear placeholder='Enter keyword to search' style={{ width: 350 }}
            onPressEnter={() => {}}
            onSearch={(value) => {
              if (value) {
                router.push('/search?query=' + value)
              }
            }}
          />
          <DynamicComponents></DynamicComponents>
          <Login></Login>
        </Space>
  );
}


export default MenuDom      