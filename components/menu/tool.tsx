import { Button, Tooltip } from "@arco-design/web-react"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { Category } from "../../api/interface/types"
import style from './tool.module.sass'

type ToolType = {
  item: Category,
}



const ToolComponents: React.FunctionComponent<ToolType> = (props) => {
  const router = useRouter()
  
  return (
    <div className={style.popup}>
      <Tooltip key={props.item.name} defaultPopupVisible >
        {
          props.item.labels.length === 1
           ? 
          <Button 
            shape="round" size='large'
            // style.tipBtn
            className={style.tipBtn}
            onClick={() => router.push(`/${props.item.labels[0].description}`)}>
              {props.item.labels[0].name}
          </Button>
            :
          props.item.labels.map((item) =>  (
            <Button 
              key={item.name}
              shape="round" size='large'
              className={style.tipBtn}
              onClick={() => router.push(`/${item.description}`)}>
                {item.name}
            </Button>
          )
          )
        }
      </Tooltip>
    </div>
  )
}

const LabelsTool = React.memo(ToolComponents, (prevProps, nextProps) => {
  return nextProps.item === prevProps.item 
})


export default LabelsTool