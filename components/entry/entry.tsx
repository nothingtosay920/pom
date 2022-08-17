import { Image, Space } from "@arco-design/web-react"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { Articles } from "../../api/interface/types"
import style from './entry.module.sass'

interface EntryType {
  item: Articles
}

const Entry: React.FunctionComponent<EntryType> = (props) => {

  return (
    <Link href={{pathname: '/article' + `/${props.item.outer_id}`}}>
      <a target="_blank" rel="noreferrer">
        <div className={style.descWrapper}>
     
          <div className={style.entryItem}>
            <div className={style.desc}>
                <div className={style.itemTitle}>{props.item.title}</div>
                <div className={style.descText}>{props.item.description}</div>
            </div>

                <Space className={style.actionList}>
                    <div style={{"display": 'flex'}}>
                      <svg aria-hidden="true" className={style.panel}>
                        <use xlinkHref={"#icon-hot"}></use>
                      </svg>
                      <div>{props.item.hot}</div>
                    </div>
                    <div>{props.item.author_name}</div>
                    <div className={style.grayText}>3个月之前</div>
                    {/* 这是标签 */}
                    <div className={style.grayText}>{props.item.categorys} | react + vue</div>
                </Space> 
          </div>
          
          <Image
            width={140}
            height={95}
            src={props.item.article_img}
            alt='lamp'
            className={style.itemImg}
          />
        </div>
      </a>
    </Link>
  )
}



export default Entry