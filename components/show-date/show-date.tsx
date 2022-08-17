import { formatDistance, parse } from "date-fns"
import zhCN from "date-fns/locale/zh-CN"
import { FC, HTMLAttributes, useRef } from "react"
let date: undefined | string = undefined

interface ShowDateProps {
  date: string
}

interface TimeTampProps extends HTMLAttributes<HTMLDivElement>  {
  time: string,
} 



export const TimeTamp: FC<TimeTampProps> = ({time, className}) => {
  const tod = parse(time, 'yyyy-MM-dd HH:mm:ss', new Date())
  const date = formatDistance(tod, new Date(), {locale: zhCN}) 
  return <div className={className}>{date}</div>
}

const ShowDate: FC<ShowDateProps> = (props) => {
  const value = props.date.split(' ')[0]

  if (date !== value) {
    date = value
    const tod = parse(date, 'yyyy-MM-dd HH:mm:ss', new Date())
    date = formatDistance(tod, new Date(), {locale: zhCN}) 
    return <div>{date}</div>
  } else {
    return <></>
  }

}

export default ShowDate