import { Breadcrumb, Divider, Input, Space } from "@arco-design/web-react"
import Link from "next/link";
import { FC } from "react";
import { List, ListProps, ListRowProps, WindowScroller } from "react-virtualized";
import { GetUserInfo } from "../../api/interface/api";
import { ArticleMainType, ArticleType } from "../../api/interface/types";
import LabelsComponent from "../labels/labels";
import PanelHz from "../panel-hz";
import ShowDate, { TimeTamp } from "../show-date/show-date";
import style from './article-component.module.sass'

type ArticleCompoentProps = {
  data: {
    article_img: string,
    article_type: ArticleType,
    description: string,
    edit_time: string,
    hot: string,
    labels: {
      Labels: {
        name: string
        description: string
        label_id: string
      }
    }[],
    outer_id: string,
    title: string,
    zan: string
  },
  user: {
    name: string
  }
}

const ArticleCompoent: FC<ArticleCompoentProps> = ({data, user}) => {
  console.log(data);
  
  return (
    <div className={style.wrapper}>
      <Space split={<Divider type='vertical'/>} className={style.head} >
        <Link href={'/user'} passHref>
          <a>{user.name}</a>
        </Link>
        <TimeTamp time={data.edit_time as string}></TimeTamp>
        <LabelsComponent label={data.labels as any}></LabelsComponent>
      </Space>
      <div className={style.title}>{data.title}</div>
      <div className={style.desc}>{data.description}</div>
      <PanelHz article_data={data} article_id={data.outer_id}></PanelHz>
    </div>
  )
}
export default ArticleCompoent