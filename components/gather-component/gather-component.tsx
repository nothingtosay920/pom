import { Divider, Space } from "@arco-design/web-react"
import { FC, useMemo } from "react"
import { Link } from "react-router-dom"
import { ArticleType, AuthorType, GatherType } from "../../api/interface/types"
import LabelsComponent from "../labels/labels"
import PanelHz from "../panel-hz"
import { TimeTamp } from "../show-date/show-date"
import style from '../aritlce-component/article-component.module.sass'


type GatherComponentProps = {
  data: GatherType,
  author: AuthorType
}

const GatherComponent: FC<GatherComponentProps> = ({data, author}) => {
  return (
    <Link to={'/article/' + data.articles[0].outer_id}>
    <div className={style.wrapper}>
        <Space split={<Divider type='vertical'/>} className={style.head} >
          {/* <Link to={'/user'}> */}
            {data.author.name}
          {/* </Link> */}
          <TimeTamp time={data.articles[0].edit_time}></TimeTamp>
          {useMemo(() =>  <LabelsComponent label={data.articles[0].labels}></LabelsComponent>, [data.articles])}
        </Space>
        <div className={style.title}>{data.gather_name}</div>
        <div className={style.desc}>{data.article_description}</div>
        <PanelHz article_data={data.articles[0]}></PanelHz>
      </div>
   </Link>
  )
}

export default GatherComponent