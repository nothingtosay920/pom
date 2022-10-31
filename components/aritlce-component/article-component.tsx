import { Breadcrumb, Divider, Input, Space } from "@arco-design/web-react"
import { FC, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArticleClassType, ArticleType, AuthorType, GatherType } from "../../api/interface/types";
import LabelsComponent from "../labels/labels";
import PanelHz from "../panel-hz";
import ShowDate, { TimeTamp } from "../show-date/show-date";
import style from './article-component.module.sass'

type ArticleCompoentProps = {
  data: ArticleType,
  author: AuthorType
}


const ArticleCompoent: FC<ArticleCompoentProps> = ({data, author}) => {
  
  return (
   <Link to={'/article/' + data.outer_id}>
    <div className={style.wrapper}>
        <Space split={<Divider type='vertical'/>} className={style.head} >
          {/* <Link to={'/user'}> */}
            {/* {author.name} */}
          {/* </Link> */}
          <TimeTamp time={data.edit_time}></TimeTamp>
          <LabelsComponent label={data.labels}></LabelsComponent>
        </Space>
        <div className={style.title}>{data.title}</div>
        <div className={style.desc}>{data.description}</div>
        <PanelHz article_data={data}></PanelHz>
      </div>
   </Link>
  )
}
export default ArticleCompoent