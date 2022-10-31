import { formatDistance, parse } from "date-fns"
import zhCN from "date-fns/locale/zh-CN"
import { FC, HTMLAttributes, useRef } from "react"
import styles from './show-date.module.sass'

let date: undefined | string = undefined
let date_distance: undefined | string = undefined

interface ShowDateProps {
  date: string,
}

interface TimeTampProps extends HTMLAttributes<HTMLDivElement>  {
  time: string,
} 



export const TimeTamp: FC<TimeTampProps> = ({time, className}) => {
  if (!time) {
    return <></>
  }
  
  const tod = parse(time, 'yyyy-MM-dd HH:mm:ss', new Date())
  const date = formatDistance(tod, new Date(), {locale: zhCN}) 
  return <div className={className}>{date}之前</div>
}

const ShowDate: FC<ShowDateProps> = (props) => {
  if (!props.date) return <></>
  const value = props.date.split(' ')[0]
  const tod = parse(value, 'yyyy-MM-dd', new Date())
  const distance= formatDistance(tod, new Date(), {locale: zhCN}) 
  
  if (date !== distance) {
    date = distance
    return <div>{date}之前</div>
  } else {
    return <></>
  }
}

export const ShowDateDistance: FC<ShowDateProps> = (props) => {
  if (!props.date) return <></>
  const value = props.date.split(' ')[0]

  if (date_distance !== value) {
    date_distance = value
    return (
      <div className={styles.wrapper}>
        <svg aria-hidden="true" className={styles.panel}>
          <use xlinkHref={"#icon-time"}></use>
        </svg> 
        <div className={styles.distance}>{date_distance}</div>
      </div>
    )
  } else {
    return <></>
  }
}

export default ShowDate