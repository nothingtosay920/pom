import { Divider, Grid, Space } from '@arco-design/web-react'
import Link from 'next/link';
import { useRouter } from 'next/router';
import style from './entrance.module.sass'


const Row = Grid.Row;
const Col = Grid.Col;

const Entrance = () => {
  const router = useRouter()

  return (
    <>
    <div className={style.creatorEntrance}>
      <div>创作中心</div>
      <Divider  />
      <Row gutter={[24, 24]}>
       <Col className={style.wrapper} span={12} onClick={() => router.push('/writing')}>
          
            <div className={style.musterBg}>
              <svg className={style.panel} aria-hidden="true">
                <use xlinkHref={'#icon-wenzhang'}></use>
              </svg>
            </div>
            <div className={style.panelText} >写文章</div>
       </Col>
       <Col className={style.wrapper} span={12}>
          <div className={style.gatherBg}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={'#icon-wenzhang1'}></use>
            </svg>
          </div>
          <div className={style.panelText}>主页</div>
        </Col>
        <Col className={style.wrapper} span={12} onClick={() => router.push('/user/articles')}>
          <div className={style.draftBg}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={'#icon-caogaoxiang'}></use>
            </svg>
          </div>
          <div className={style.panelText}>管理文章</div>
        </Col>
        <Col className={style.wrapper} span={12}>
          <div className={style.editBg}>
            <svg className={style.panel} aria-hidden="true">
              <use xlinkHref={'#icon-tianxie'}></use>
            </svg>
          </div>
          <div className={style.panelText}>最近编辑</div>
        </Col>
      </Row > 
    </div>
    </>
  )
}

export default Entrance