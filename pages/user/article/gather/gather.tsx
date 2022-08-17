import { Breadcrumb, Collapse, Divider, Empty, Input, Skeleton } from "@arco-design/web-react"
import { GetGatherArtilces } from "../../../../api/interface/api"
import ArticleCompoent from "../../../../components/aritlce-component/article-component";
import ColumnEntry from "../../../../components/column-entry/column-entry";
import style from './gather.module.sass'

const BreadcrumbItem = Breadcrumb.Item
const InputSearch = Input.Search



const GatherIndex = () => {
  const {data, isLoading} = GetGatherArtilces()

  return (
    <>
      <div className={style.gatherWrapper}>
        <Breadcrumb className={style.bread}>
          <BreadcrumbItem className={style.breadTitle}>文章管理</BreadcrumbItem>
          <BreadcrumbItem className={style.breadArt}>聚合文章</BreadcrumbItem>
        </Breadcrumb>
        <InputSearch
          searchButton
          defaultValue='Search content'
          placeholder='Enter keyword to search'
          style={{ width: 250, height: 30 }}
        />
      </div>
      {
        isLoading ?
        <div className={style.gatherSkeleton}>
           <Skeleton
              text={{
                rows: 3,
                width: ['100%', 600, 400],
                
              }}
              animation={true}
              image
        ></Skeleton> 
        </div>  : 
        <ColumnEntry item={data}></ColumnEntry>
      }
    </>
      
  )
}

export default GatherIndex