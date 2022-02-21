import { Button, Input, List } from '@arco-design/web-react';
import Editor from 'md-editor-rt';
import { useState } from 'react';
import style from '../styles/Writing.module.sass';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";


type data = {
  id: number,
  content: string
} []

const reorder = (list: data, startIndex: number, endIndex: number): data => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const getListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "#E5E6EB" : "#F2F3F5",
  width: 150,
  height: '550'
})

const getItemStyle = (isDragging: any, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  height: '40px',
  margin: `0 0 10px 0`,
  // styles we need to apply on draggables
  ...draggableStyle
});

export default function UserArticle() {
  const [data, setdata] = useState([{id: 0, content: '1'}, {id: 1, content: '2'}, {id: 2, content: '3'}])
  const [foucs, setfoucs] = useState(0)

  const onDragend = (result: DropResult) => {
    if(!result.destination) return
    const newdata = reorder(data, result.source.index, result.destination.index)
    setdata(newdata)
    setfoucs(result.destination.index)
  }
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
        <div className={style.catalogue} onClick={(e) => {
        }}>
          <DragDropContext onDragEnd={onDragend}>
            <Droppable droppableId="droppable">
              {
                (provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)} 
                    >
                      {data.map((item, index) => (
                        <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              style={getItemStyle(
                                snapshot.isDragging,
                                provided.draggableProps.style
                              )}
                            >
                                <div onClick={() => {setfoucs(index)}} className={style.listBtn}>
                                  {item.id+1} 
                                </div>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}  
                  </div>
                )
              }
            </Droppable>
          </DragDropContext>
        </div>
        <Editor 
          modelValue={data[foucs].content}
          onChange={(text) => setdata((state) => {
            state[foucs].content = text
            return state
          })}
          style={{height: 550, minHeight: 200}} />
      </div>
      <footer className={style.footer}>
        
      </footer>
    </div>
  )
}