import { Button, Input, List } from '@arco-design/web-react';
import Editor from 'md-editor-rt';
import { useState } from 'react';
import style from '../styles/Writing.module.sass'
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

export default function UserArticle() {
  const [text, setText] = useState('hello md-editor-rt');
  const [data, setdata] = useState(['1', '2', '3'])
  const [foucs, setfoucs] = useState(0)
  return (
    <div className={style.wrapper}>
      <header className={style.header}>
        <Input
          style={{ width: 500, height: 70 }}
          allowClear
          placeholder='请输入标题内容'
          maxLength={20}
          showWordLimit
        />
        <div>
          <Button type='outline' className={style.btn}>切换模式</Button>
          <Button type='primary' className={style.btn}>发布</Button>
        </div>
      </header>
      <div className={style.writing}>
        <div className={style.catalogue}>
        <List
          className={style.list}
          size='small'
          header='List title'
          dataSource={data}
          render={(item, index) => 
            <List.Item key={index} className={style.listItem}>
              <Button className={index === foucs ? style.foucsBtn : style.listBtn} type='text' onClick={() => setfoucs(index)}>
                {index+1}
              </Button>
            </List.Item>}
        />
        </div>
        <Editor 
          modelValue={data[foucs]}
          onChange={(text) => setdata((state) => {
            state[foucs] = text
            return state
          })}
          style={{height: 550, minHeight: 200}} />
      </div>
      <footer className={style.footer}>
        
      </footer>
    </div>
  )
}