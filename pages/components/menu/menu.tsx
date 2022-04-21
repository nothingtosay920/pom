import { Menu, Input, Avatar, Button } from '@arco-design/web-react';
import { useRouter } from 'next/router';
import Login from './login';
// import style from  '../../../styles/menu.module.scss'
import style from './menu.module.sass'
const MenuItem = Menu.Item;

export default function MenuDom() {
  const router = useRouter()
  return (
    <div className={style.menu}>
      <Menu mode='horizontal' theme='dark' className={style.main} defaultSelectedKeys={['1']}>
        <Avatar size={32} shape='square' className={style.canClick} onClick={() => router.push('/')}>
          Arco
        </Avatar>
        <MenuItem key='0' style={{ padding: 0, marginRight: 38 }} disabled></MenuItem>
          
        <Input
          style={{ width: 200 }}
          allowClear
          placeholder='Please Enter something'
        />
        
        <MenuItem key='1'>Home</MenuItem>
        <MenuItem key='2'>Solution</MenuItem>
        <MenuItem key='3'>Cloud Service</MenuItem>
        <Menu.Item key='4'>Cooperation</Menu.Item>
      </Menu>
      <div className={style.creator}>
          <Button type='primary' onClick={() => router.push('/writing')}>
          写文章
          </Button>
          <Login></Login>
        </div>
    </div>
  );
}

