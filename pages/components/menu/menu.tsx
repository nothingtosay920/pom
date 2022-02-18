import { Menu, Input, Avatar, Button } from '@arco-design/web-react';
import { useRouter } from 'next/router';
// import style from  '../../../styles/menu.module.scss'
import style from './menu.module.sass'
const MenuItem = Menu.Item;
// const SubMenu = Menu.SubMenu;

export default function MenuDom() {
  const router = useRouter()
  return (
    <div className={style.menu}>
      <Menu mode='horizontal' theme='dark' defaultSelectedKeys={['1']}>
        <Avatar size={64} shape='square'>
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
        <Avatar size={64} className={style.avatar}>
          Arco
        </Avatar>
      </div>
    </div>
  );
}

