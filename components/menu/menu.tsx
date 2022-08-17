import { Menu, Input, Avatar, Button, Trigger, Tooltip, Space, Dropdown } from '@arco-design/web-react';
import { IconClockCircle } from '@arco-design/web-react/icon';
import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { GetCategorys } from '../../api/interface/api';
import { Category, getCategorysRes } from '../../api/interface/types';
import Login from './login';
// import style from  '../../../styles/menu.module.scss'
import style from './menu.module.sass'
import Tool from './tool';
const MenuItem = Menu.Item;
const InputSearch = Input.Search;


export default function MenuDom() {
  const router = useRouter()
  const {data: categorys} = GetCategorys()

  // useEffect(() => {
  //   (async () => {
  //     setcategorysList(await GetCategorys())
  //   })()
  // }, [])
  
  return (
        <Space className={style.menu}>
          <Avatar size={48} shape='square' className={style.canClick} onClick={() => router.push('/')}>
            LOGO
          </Avatar>

        

          <div className={style.categorys}>
            {
               categorys !== undefined ? categorys.map((item, index) => {
                return (
                  <Trigger 
                    showArrow={item.labels.length ? true : false}
                    key={item.name}
                    popup={() =>{
                      if (item.labels.length) {
                        return <Tool item={item}  />
                      } else {
                        return <div></div>
                      }
                    }}
                    position='bottom'
                    classNames='zoomInTop'
                    popupAlign={{ bottom: [10, 10] }}
                    mouseEnterDelay={400}
                    >
                      <button className={style.itemBtn} onClick={() => router.push(`/${item.description}`)}>{item.name}</button>
                  </Trigger>
                )
              }) : <></>
            }
          </div>
          <Login></Login>
        </Space>
  );
}



      