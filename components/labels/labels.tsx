import { Divider, Space } from "@arco-design/web-react"
import { FC } from "react"
import { LabelInArticle } from "../../api/interface/types"
import style from './labels.module.sass'

type PropsType = {
  label: {
    Labels: {
      name: string;
      description: string;
      label_id: string;
    }
  }[]
}

const LabelsComponent: FC<PropsType> = ({label}) => {
  
  return (  
    <Space split={<Divider type='vertical' style={{'margin': '0'}} />}>
      {
        label.map((item) => {
          return (<div key={item.Labels.label_id} className={style.wrapper}>
            <div className={style.label}>{item.Labels.name}</div>
          </div>)
        })
      }
    </Space>
  )
}

export default LabelsComponent