import { FC, HTMLAttributes } from 'react'
import styles from './recommendNavBtn.module.sass'

type NavProps = {
  upClick: () => void,
  downClick: () => void,
  className: string,
  prev: string | undefined,
  next: string | undefined,
  page: number
}

const RecommendNavBtn: FC<NavProps> = ({upClick, downClick, className, prev, next, page}) => {

  return (
    <div className={className}>
      <div className={!!(page !== 0 || prev) ? styles.upWrapper : styles.upDisable}  data-panel="up" onClick={upClick}>
          <svg className={styles.panel} aria-hidden="true">
            <use xlinkHref={!!(page !== 0 || prev) ? '#icon-arrow-up-bold' : '#icon-arrow-up-bold-copy-disable-copy'}></use>
          </svg>
      </div>
      <div className={next ? styles.downWrapper : styles.downDisable}  data-panel="down" onClick={downClick}>
            <svg className={styles.panel} aria-hidden="true">
              <use xlinkHref={next ? '#icon-arrow-down-bold-copy' : '#icon-arrow-down-bold-copy-disable-copy'}></use>
            </svg>
        </div>
    </div>
  )
}

export default RecommendNavBtn