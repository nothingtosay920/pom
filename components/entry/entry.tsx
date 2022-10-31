import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { ArticleType } from "../../api/interface/types"
import LabelsComponent from "../labels/labels"
import style from './entry.module.sass'
import ShowDate from "../show-date/show-date";
import LazyLoad from "react-lazyload"
import { Image, Space } from "@arco-design/web-react"
interface EntryType {
  item: ArticleType
}

const Entry: React.FunctionComponent<EntryType> = (props) => {

  return (
    <div role={'cell'}>
      <Link href={{pathname: '/article' + `/${props.item.outer_id}`}}>
        <a target="_blank" rel="noreferrer">
          <div className={style.descWrapper}>
      
            <div className={style.entryItem}>
              <div className={style.desc}>
                  <h1 className={style.itemTitle}>{props.item.title}</h1>
                  <p className={style.descText}>{props.item.description}</p>
              </div>

              <Space className={style.actionList}>
                  <div style={{"display": 'flex'}}>
                    <svg aria-hidden="true" className={style.panel}>
                      <use xlinkHref={"#icon-hot"}></use>
                    </svg>
                    <div>{props.item.hot}</div>
                  </div>
                  <div>{props.item.author.name}</div>
                  <ShowDate date={props.item.edit_time}></ShowDate>
                  <LabelsComponent label={props.item.labels}></LabelsComponent>
              </Space> 
            </div>
            
            {/* <LazyLoad height={120}> */}
                {
                  props.item.article_img && <Image
                    alt='lamp'
                    width={180}
                    height={120}
                    src={props.item.article_img}
                  />
                }
            {/* </LazyLoad> */}
          </div>
        </a>
      </Link>
    </div>
  )
}



export default Entry