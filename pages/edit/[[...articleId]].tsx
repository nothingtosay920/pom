import { Button, Divider, Drawer, Empty, Form, Image, Input, List, Message, Modal, Notification, Radio, Select, Space, Spin, Tooltip, Upload } from '@arco-design/web-react';
import Editor from 'md-editor-rt';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import style from '../../styles/Writing.module.sass';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { GetArticle, GetCategorys, GetLabels, GetMusterArticles, GetWritingArticleById } from '../../api/interface/api';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { PostImgToAliyun, getImg } from '../../utills/fetch';
import { ArticleClassType, Category, getCategorysRes, getLabelsRes, LabelMapType, Labels } from '../../api/interface/types';
import Router, { useRouter } from 'next/router';
import Login from '../../components/menu/login';
import { useMutation } from 'react-query';
import graphqlClient from '../../api/GqlClient';
import { saveGatherMutation, submitGatherMutation } from '../../api/gql/gql';
import { nanoid } from 'nanoid';
import { IconDelete } from '@arco-design/web-react/icon';
import { getNowTime } from '../../utills/utill';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

type articleDataType = {
  gather: GatheInputrType,
  column: GatheInputrType
}

type ArticleToolProps = {
  articleData: articleDataType,
  setArticleData: React.Dispatch<React.SetStateAction<articleDataType>>,
  foucs: number,
  setfoucs: React.Dispatch<React.SetStateAction<number>>
}

type SubmitDataType = {
  categorys: string | undefined,
  labels: LabelMapType,
  img: string,
  description: string | undefined
}

type ArticleType = {
  title: string,
  outer_id: string,
  article: string,
  description: string,
  article_img: string,
  edit_time: string,
}

type GatheInputrType = {
  article_data: ArticleType[],
  article_description: string,
  type: ArticleClassType,
  gather_id: string,
  gather_name: string,
  gather_img: string,
  category: string,
  labels: string[],
}

export const defaultArticle: ArticleType = {
  title: '',
  outer_id: nanoid(),
  article: '',
  description: '这是一个专栏文章',
  article_img: '',
  edit_time: getNowTime(),
}

export const defaultColumn = {
  article_data: [{...defaultArticle}],
  article_description: '',
  type: 'COLUMN' as ArticleClassType,
  gather_id: '',
  gather_name: '',
  gather_img: '',
  category: '',
  labels: [],
}

export const defaultGather = {
  article_data: [{...defaultArticle}],
  article_description: '这是一个聚合文章',
  type: 'GATHER' as ArticleClassType,
  gather_id: nanoid(),
  gather_name: '',
  gather_img: '',
  category: '',
  labels: [],
}


const reorder = (list: Pick<GatheInputrType, 'article_data'>, startIndex: number, endIndex: number) => {
  const result = Array.from(list.article_data);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const reorderWithImg = (list: Pick<GatheInputrType, 'article_data'>, startIndex: number, endIndex: number) => {
  const result = Array.from(list.article_data);
  const value = result[startIndex].article_img
  result[startIndex].article_img = result[endIndex].article_img 
  result[endIndex].article_img = value
  return result
}

const reorderFileList = (fileList: UploadItem[], startIndex: number, endIndex: number) => {
  const result = Array.from(fileList)
  const value = result[startIndex]
  result[startIndex] = result[endIndex]
  result[endIndex] = value
  return result
}

const getListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "#E5E6EB" : "#F2F3F5",
  width: 150,
  height: '550',
})

const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `0 0 10px 0`,
  // styles we need to apply on draggables
  ...draggableStyle
});



const getImgItemStyle = (isDragging: boolean, draggableStyle: any) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  margin: `10px 0`,
  // styles we need to apply on draggables
  ...draggableStyle
});

const getImgListStyle = (isDraggingOver:boolean) => ({
  background: isDraggingOver ? "#E5E6EB" : "#F2F3F5",
  width: 280,
  height: '550',
  fontSize: '12px'
})


const ArticleTool: React.FC<ArticleToolProps> = ({articleData, setArticleData, foucs, setfoucs}) => {

  const addArticle = () => {
    setArticleData((state) => {
      state.gather.article_data.push({...defaultArticle, outer_id: nanoid()})
      return {...state}
    })
    
  }

  const removeArticle = () => {
   if (articleData.gather.article_data.length > 1) {
    setArticleData((state) => {
        state.gather.article_data.splice(foucs, 1)
        return {...state}
    })
    setfoucs(0)
   }
  }

  return (
    <div className={style.tool}>
      <div className={style.svg} onClick={addArticle}>
        <svg aria-hidden="true" className={style.panel}>
            <use xlinkHref={"#icon-zengjia"}></use>
        </svg>
      </div>
      <div className={style.svg} onClick={removeArticle}>
        <svg aria-hidden="true" className={style.panel}>
          <use xlinkHref={"#icon-zushanchu"}></use>
        </svg>
      </div>
    </div>
  )
}

const Tool = React.memo(ArticleTool)

export function UserArticleComponent({article}: {article: GatheInputrType}) {
  const {data: categorysList } = GetCategorys()
  const {data: labeslist} =  GetLabels()
  const {data: MusterInfo} = GetMusterArticles()
  const router = useRouter()

  const [foucs, setfoucs] = useState(0)
  const [isGather, setisGather] = useState(article.type === 'GATHER' ? true : false)
  const [showDrawer, setshowDrawer] = useState(false)

  const [articleData, setArticleData] = useState({
    gather: article.type === 'GATHER' ? {...article} : defaultGather,
    column: article.type === 'GATHER' ? defaultColumn : {...article}
  })
  
  const [imgFiles, setImgFiles] = useState<UploadItem[]>([])
  const [columnId, setColumnId] = useState('')


  function SubmitGatherArticle(data: GatheInputrType) {
    return useMutation<void>(
      async () => {
        return await graphqlClient.request(submitGatherMutation, {
          labels: data.labels,
          category: data.category,
          article_data: data.article_data,
          gather_id: data.gather_id,
          gather_name: data.gather_name,
          article_type: data.type,
          article_description: data.article_description,
          gather_img: data.gather_img,
        }).then((res) => res)
      }, {
        onSuccess: () => {
          if (isGather) {
            router.replace('/article/' + articleData.gather.article_data[0].outer_id)
          } else {
            router.replace('/article/' + articleData.column.article_data[0].outer_id)
          }
        }
      }
    )
  }

  function SavedGatherArticle(data: GatheInputrType) {
    return useMutation<void>(
      async () => {
        return await graphqlClient.request(saveGatherMutation, {
          labels: data.labels,
          category: data.category,
          article_data: data.article_data,
          gather_id: data.gather_id,
          gather_name: data.gather_name,
          article_type: data.type,
          article_description: data.article_description,
          gather_img: data.gather_img,
        }).then()
      }
    )
  }

  const SubmitGatherMutation = SubmitGatherArticle(isGather ? articleData.gather : articleData.column)
  const savedGatherMutation = SavedGatherArticle(isGather ? articleData.gather : articleData.column)

  // useEffect( () => {
  //   (async () => {
  //     if (articleData.gather_img && !isGather && !imgFiles) {
  //       const img = await getImg() as UploadItem

  //       setImgFiles((state) => {
  //         state = [img]
  //         return {...state}
  //       })
  //     }
  //   })()
 
  // }, [])

  if (!article) {
    return <Spin></Spin>
  }



  const onDragend = (result: DropResult) => {
    if(!result.destination) return
    const newdata = reorder(articleData.gather, result.source.index, result.destination.index)
    setArticleData((state) => {
      state.gather.article_data = newdata
      return state
    })
    setfoucs(result.destination.index)
  }

  // img draged
  const onImgDragend = (result: DropResult) => {
    
    if(!result.destination) return

    const newdata = reorderWithImg(articleData.gather, result.source.index, result.destination.index)
    const imgList = reorderFileList(imgFiles, result.source.index, result.destination.index)
    setArticleData((state) => {
      state.gather.article_data = newdata
      return state
    })
    setImgFiles(imgList)
    setfoucs(result.destination.index)

  }

  const changeMod = () => setisGather((state) => !state) 

  const textChange = (text: string) => {
    if (isGather) {
      setArticleData((state) => {
        state.gather.article_data[foucs].article = text
        return {...state}
      })
    } else {
      setArticleData((state) => {
        state.column.article_data[0].article = text
        return {...state}
      })
    }
  }

  const setInput = (value: string) => {
    if (isGather) {
      setArticleData((state) => {
        state.gather.article_data[foucs].title = value
        return {...state}
      })
    } else {
      setArticleData((state) => {
        state.column.article_data[0].title = value
        return {...state}
      })
    }
  }

  const saveArticle = async () => {
    if (isGather) {
      setArticleData((state) => {
        state.gather.type === 'GATHER'
        return {...state}
      })
    } else {
      if (!articleData.column.gather_id) {
        setArticleData((state) => {
          state.column.type = 'SINGLE'
          state.column.gather_id = nanoid()
          return {...state}
        })
      }
    }
      await savedGatherMutation.mutateAsync()
      if (savedGatherMutation.isSuccess) {
        Message.success({content: "保存成功"})
      } else if (savedGatherMutation.error) {
        Message.error({content: "发生错误"})
      }
  }

  const submitAritlce = async () => {
    if (isGather) {
      setArticleData((state) => {
        state.gather.type = 'GATHER'
        return {...state}
      })
    } else {
      if (!articleData.column.gather_id) {
        setArticleData((state) => {
          state.column.type = 'SINGLE'
          state.column.gather_id = nanoid()
          return {...state}
        })
      }
    }
    await SubmitGatherMutation.mutateAsync()
    if (SubmitGatherMutation.isSuccess) {
      Message.success({content: "保存成功"})
    } else if (SubmitGatherMutation.error) {
      Message.error({content: "发生错误"})
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
          value={isGather ? articleData.gather.article_data[foucs].title : articleData.column.article_data[0].title}
          onChange={setInput}
        />
        <div>
          <Button type='outline' className={style.btn} onClick={changeMod}>切换模式</Button>
          <Button type='primary' className={style.btn} onClick={() => setshowDrawer(true)}>发布</Button>
          <Login></Login>
        </div>
      </header>
      <div className={style.writing}>
        
        {
          isGather ? <div className={style.catalogue} onClick={(e) => {
          }}>
            <Tool articleData={articleData} setArticleData={setArticleData} foucs={foucs} setfoucs={setfoucs} />  
            <DragDropContext onDragEnd={onDragend}>
              <Droppable droppableId="droppable">
                {
                  (provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)} 
                      >
                        {articleData.gather.article_data.map((item, index) => (
                          <Draggable key={index} draggableId={String(index)} index={index}>
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getImgItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div onClick={() => {
                                  setfoucs(index)
                                }} className={foucs === index ? style.listBtnActive : style.listBtn}>
                                  {index+1} 
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
        
          modelValue={isGather? articleData.gather.article_data[foucs].article : articleData.column.article_data[0].article} 
          onChange={textChange}
          toolbars={[
            'bold', 'underline', 'italic', '-', 'strikeThrough', 'sub', 'sup', 'quote', 'unorderedList',
            'orderedList','revoke', 'next', 'htmlPreview', 'preview', 'save'
          ]}
          onSave={saveArticle}
          style={{height: 620, minHeight: 200}} />
        
      </div>
    </div>
    <Drawer
      width={400}
      className={style.drawer}
      title={<span>发布文章</span>}
      visible={showDrawer}
      placement={"right"}
      onOk={submitAritlce}
      onCancel={() => {
        setshowDrawer(false);
      }}
    >
          <Form>
            <FormItem label='选择分类'>
              <RadioGroup
                type='button'
                name='lang'
                value={isGather ? articleData.gather.category : articleData.column.category}
                onChange={(value) => {
                  if (isGather) {
                    setArticleData((state) => {
                      state.gather.category = value
                      return {...state}
                    })
                  } else {
                    setArticleData((state) => {
                      state.column.category = value
                      return {...state}
                    })
                  }
                }}
                style={{ marginRight: 20 }}
              >
                {
                  categorysList &&  categorysList.map((item) => {
                    return (
                      <Radio 
                        value={item.category_id} 
                        key={item.category_id}
                      >{item.name}</Radio>
                    )
                  }) 
                }
              </RadioGroup>
            </FormItem>
            <FormItem label="选择标签">
              <Select                                                                                                                               
                style={{ width: 250}}
                mode='multiple'
                value={isGather? articleData.gather.labels : articleData.column.labels}
                onChange={(value: string[]) => {
                  if (isGather) {
                    setArticleData((state) => {
                      state.gather.labels = value
                      return {...state}
                    })
                  } else {
                    setArticleData((state) => {
                      state.column.labels = value
                      return {...state}
                    })
                  }
                }}
              >
                { labeslist && labeslist.map((option) => (
                  <Option 
                    defaultChecked={
                      isGather ? 
                        articleData.gather.labels.findIndex((item) => item === option.label_id) !== -1 :
                        articleData.column.labels.findIndex((item) => item === option.label_id) !== -1
                    } 
                    key={option.label_id} 
                    value={option.label_id}>
                      {option.name}
                  </Option> 
                  )) 
                }
              </Select>
            </FormItem>

            <FormItem style={{'display': isGather ? 'flex' : 'none'}} label={'聚合标题'}>
              <Input
                maxLength={7}
                showWordLimit
                placeholder='请输入聚合文章的标题'
                style={{ width: 250 }}
                value={articleData.gather.gather_name}
                onChange={(value) => setArticleData((state) => {
                  state.gather.gather_name = value
                  return {...state}
                })}
              />
            </FormItem>
            <FormItem label={'添加封面'}>
              <Upload
                multiple
                limit={1}
                progressProps={{
                  size: 'small',
                  type: 'line',
                  showText: true,
                  width: '100%'
                }}
                defaultFileList={imgFiles}
                // 拖拽展示
                onPreview={file => {
                  Modal.info({
                    title: '预览',
                    content: <div style={{textAlign: 'center'}}>
                      <Image alt='' style={{maxWidth: '100%'}} src={file.url || URL.createObjectURL(file.originFile as File) } />
                    </div>
                  })
                }}
                onChange={async (fileList: UploadItem[]) => {

                  if (!fileList.length || fileList[0].status !== 'done') {
                    return
                  }
                  let imgUrl: string | undefined = undefined
                  if (isGather) {
                    imgUrl = await PostImgToAliyun(fileList[0], articleData.gather.gather_id)
                  } else {
                    imgUrl = await PostImgToAliyun(fileList[0], articleData.column.gather_id)
                  }

                  if (imgUrl) {
                    
                    if (isGather) {
                      setArticleData((state) => {
                        state.gather.gather_img = imgUrl as string
                        return {...state}
                      })
                    } else {
                      setArticleData((state) => {
                        state.column.article_data[0].article_img  = imgUrl as string
                        return {...state}
                      })
                    }
                  }
                }}
                action='/'
                accept='image/*'
                listType='picture-card'
              /> 
            </FormItem>
            <FormItem label={"聚合摘要"} style={{'display': isGather ? 'flex' : 'none'}}>
              <TextArea
                  placeholder='Please enter ...'
                  style={{ minHeight: 80, width: 350 }}
                  maxLength="100"
                  showWordLimit 
                  value={isGather ? articleData.gather.article_description : articleData.column.article_data[0].description}
                  onChange={(value) => {
                    if (isGather) {
                      setArticleData((state) => {
                        state.gather.article_description = value
                        return {...state}
                      })
                    } else {
                      setArticleData((state) => {
                        state.column.article_data[0].description = value
                        return {...state}
                      })
                    }
                  }}
                />
            </FormItem>



            <FormItem style={{'display': isGather ? 'flex' : 'none'}}>
              <Divider style={{'margin': '0px'}} />
            </FormItem>


            <FormItem style={{'display': isGather ? 'flex' : 'none'}} label={"展示图"}>
                <Upload
                  limit={articleData.gather.article_data.length}
                  progressProps={{
                    size: 'small',
                    type: 'line',
                    showText: true,
                    width: '100%'
                  }}
                  // defaultFileList={imgFiles[foucs]}
                  // 拖拽展示
                  renderUploadList ={(fileList, props) => (
                    <DragDropContext onDragEnd={onImgDragend}>
                      <Droppable droppableId="droppable">
                        {
                          (provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={getImgListStyle(snapshot.isDraggingOver)} 
                              
                              >
                                {fileList.map((item, index) => { 
                                  
                                  return <Draggable key={item.name} draggableId={String(index)} index={index}>
                                    {(provided, snapshot) => {


                                      return (
                                        <div
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                          style={getItemStyle(
                                            snapshot.isDragging,
                                            provided.draggableProps.style,
                                          )}
                                        >
                                          <List.Item key={index} actions={[
                                            <IconDelete 
                                              key={'delete'} 
                                              style={{'margin': '0 10px'}} 
                                              onClick={() => {
                                                if (props.onRemove) {
                                                  props.onRemove(item)
                                                  setArticleData((state) => {
                                                    state.gather.article_data[index].article_img = ''
                                                    return {...state}
                                                  })
                                                }
                                              }}
                                            />
                                          ]}>
                                            <List.Item.Meta
                                              avatar={<Image width={50} height={50} src={articleData.gather.article_data[0].article_img} alt=""></Image>}
                                              title={item.name}
                                            />
                                          </List.Item>
                                            {/* {file.status === 'error' ? 
                                              <Tooltip content="Upload Error">{originNode?.props?.children}</Tooltip>
                                            : originNode} */}
                                        </div>
                                      )
                                    }}
                                  </Draggable>
                                 } )}
                                {provided.placeholder}  
                            </div>
                          )
                        }
                      </Droppable>
                    </DragDropContext>
                  )}
                  onChange={async (fileList: UploadItem[], file: UploadItem) => {

                    if (!fileList.length || file.status !== 'done') {
                      return
                    }
                    const imgUrl = await PostImgToAliyun(fileList[fileList.length - 1], articleData.gather.gather_id + `/page/` + fileList.length)
                    
                    if (imgUrl) {
                      setImgFiles(fileList)
                      setArticleData((state) => {
                        const index = state.gather.article_data.findIndex((item) => item.article_img === imgUrl)
                        if (index === -1) {
                          const len = state.gather.article_data.length
                          state.gather.article_data[len - 1].article_img = imgUrl
                        } else {
                          state.gather.article_data.concat().splice(index).forEach((item, i) => {
                            state.gather.article_data[index + i].article_img = item.article_img
                          })
                        }
                        return {...state}
                      })
                    }
                  }}
                  action='/'
                  accept='image/*'
                />
            </FormItem>
            <FormItem 
              style={{'display': !isGather ? 'flex' : 'none'}}
              label={'收至专栏'}
              
            >
               <Select 
                allowCreate 
                placeholder='选择一个专栏' 
                allowClear 
                style={{ width: 250 }}
                value={columnId}
                onChange={(value) => {
                  setArticleData((state) => {
                    state.column.gather_id = value
                    state.column.type = 'COLUMN'
                    return {...state}
                  })
                  setColumnId(value)  
                }}
                >
                  {(MusterInfo) ? MusterInfo.map((option) => (
                    
                    <Option key={option.gather_id} value={option.gather_id as string}>
                      {option.gather_name}
                    </Option>
                  )) : <Empty description={<Button type='primary'>点击添加</Button>}></Empty>
                }
                </Select>
            </FormItem>
            <FormItem label={"添加摘要"}>
              <TextArea
                  placeholder='Please enter ...'
                  style={{ minHeight: 80, width: 350 }}
                  maxLength="100"
                  showWordLimit 
                  value={isGather ? articleData.gather.article_data[foucs].description : articleData.column.article_data[0].description}
                  onChange={(value) => {
                    if (isGather) {
                      setArticleData((state) => {
                        state.gather.article_data[foucs].description = value
                        return {...state}
                      })
                    } else {
                      setArticleData((state) => {
                        state.column.article_data[0].description = value
                        return {...state}
                      })
                    }
                  }}
                />
            </FormItem>
          </Form>
    </Drawer>
  </>
  )
}

 const UserEditor = () => {
  const router = useRouter()

  if (router.query.articleId?.length) {
    const {data, isSuccess, isLoading} = GetWritingArticleById(router.query.articleId[0] as string)


    if (isLoading) {
      return <Spin></Spin>
    }
    
    return (
      <>
        {
          isSuccess ? <UserArticleComponent 
            article={data}></UserArticleComponent> : <Empty />
        }
      </>
    )    
  } else {
    return <UserArticleComponent article={defaultColumn}></UserArticleComponent>
  }


 }

 export default UserEditor