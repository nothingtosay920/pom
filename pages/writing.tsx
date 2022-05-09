import { Button, Drawer, Input, List, Message } from '@arco-design/web-react';
import Editor from 'md-editor-rt';
import { useState } from 'react';
import style from '../styles/Writing.module.sass';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { SubmitMusterArticle } from './api/interface/api';


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

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 10px 0`,
  // styles we need to apply on draggables
  ...draggableStyle
});

export default function UserArticle() {
  const [data, setdata] = useState([{id: 0, content: '1'}, {id: 1, content: '2'}, {id: 2, content: '3'}])
  const [foucs, setfoucs] = useState(0)
  const [isGather, setisGather] = useState(false)
  const [normalText, setnormalText] = useState('second')
  const [inputValue, setinputValue] = useState("")
  const [showDrawer, setshowDrawer] = useState(false)
  const onDragend = (result: DropResult) => {
    if(!result.destination) return
    const newdata = reorder(data, result.source.index, result.destination.index)
    setdata(newdata)
    setfoucs(result.destination.index)
  }

  const changeMod = () => setisGather((state) => !state) 

  const textChange = (text: string) => {
    if (isGather) {
      setdata((state) => {
        state[foucs].content = text
        return state
      })
    } else {
      setnormalText(text)
    }
  }

  const subMusterArticle = SubmitMusterArticle({
    name: "123",
    article_data: {
      title: inputValue,
      article: normalText
    },
  })

  const submitArticle = () => {
    if (isGather) {
      return
    } else {
      subMusterArticle.mutate()
      if (subMusterArticle.isSuccess) {
        Message.info("添加文章成功!")
      }
    }
  }

  return (
  <>
    <div className={style.wrapper}>
      <header className={style.header}>
        <Input
          style={{ width: 500, height: 70 }}
          allowClear
          placeholder={isGather ? '请添加单一小节标题(小节标题可选, 添加总标题点击发布栏)' : '请输入标题内容'}
          maxLength={20}
          showWordLimit
          value={inputValue}
          onChange={setinputValue}
        />
        <div>
          <Button type='outline' className={style.btn} onClick={changeMod}>切换模式</Button>
          <Button type='primary' className={style.btn} onClick={() => setshowDrawer(true)}>发布</Button>
        </div>
      </header>
      <div className={style.writing}>
        {
          isGather ? <div className={style.catalogue} onClick={(e) => {
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
                                  <div onClick={() => {setfoucs(index)}} className={foucs === index ? style.listBtnActive : style.listBtn}>
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
          </div> : <></>
        }
        <Editor 
          modelValue={isGather? data[foucs].content : normalText}
          onChange={textChange}
          style={{height: 550, minHeight: 200}} />
      </div>
      <footer className={style.footer}>
        
      </footer>
    </div>
    <Drawer
      width={400}
      height={400}
      title={<span>发布文章</span>}
      visible={showDrawer}
      placement={"right"}
      onOk={() => {
        setshowDrawer(false);
      }}
      onCancel={() => {
        setshowDrawer(false);
      }}
    >
      <div>Here is an example text. </div>
      <div>Here is an example text.</div>
    </Drawer>

  </>
  )
}