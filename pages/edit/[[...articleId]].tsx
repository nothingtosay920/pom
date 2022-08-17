import { Button, Drawer, Empty, Form, Image, Input, List, Message, Modal, Notification, Radio, Select, Space, Spin, Upload } from '@arco-design/web-react';
import Editor from 'md-editor-rt';
import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import style from '../../styles/Writing.module.sass';
import { DragDropContext, Droppable, Draggable, DropResult } from "react-beautiful-dnd";
import { GetArticle, GetBaseMusterInfo, GetCategorys, GetLabels, GetWritingArticleById, SavedGatherArticle, SavedMusterArticle, WritingArticleApi } from '../../api/interface/api';
import { UploadItem } from '@arco-design/web-react/es/Upload';
import { appendImg, getImg } from '../../utills/fetch';
import { AddArticleRes, Articles, Category, getCategorysRes, getLabelsRes, LabelMapType, Labels } from '../../api/interface/types';
import Router, { useRouter } from 'next/router';
import Login from '../../components/menu/login';
import { useMutation } from 'react-query';
import graphqlClient from '../../api/GqlClient';
import { submitGatherMutation, submitMusterMutation } from '../../api/gql/gql';

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const Option = Select.Option;
const TextArea = Input.TextArea;

export type muster = {
  article:string,
  title: string,
  type: string,
  categorys: string,
  description: string,
  article_img: string,
  labels: string[],
  muster: string,
  id: string
}

export type gather = {
  article_data: {
    article:string,
    title: string,
    type: string,
    article_img: string,
  }[],
  labels: string[],
  categorys: string,
  description: string,
  type: string,
  gather_id: string,
  gather_article_id: string
}

interface UserArticleProps {
  article: gather | muster
}

type SubmitDataType = {
  categorys: string | undefined,
  labels: LabelMapType,
  img: string,
  description: string | undefined
}

type ArticleTool = {
  gather: gather,
  setgather: React.Dispatch<React.SetStateAction<gather>>,
  foucs: number,
  setfoucs: React.Dispatch<React.SetStateAction<number>>
}

export const defaultGather = {
  article_data: [{
    article: '',
    title: '',
    type: 'GATHER',
    article_img: ''
  }],
  categorys: '',
  labels: [],
  description: '这是一个聚合文章',
  type: 'GATHER',
  gather_id: '',
  gather_article_id: ''
}
export const defaultMuster = {
  article: '',
  title: '',
  type: 'MUSTER',
  categorys: '',
  labels: [],
  article_img: '',
  description: '这是一个专栏文章',
  muster: '',
  id: ''
 }

const reorder = (list: Pick<gather, 'article_data'>, startIndex: number, endIndex: number) => {
  const result = Array.from(list.article_data);
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




const ArticleTool: React.FC<ArticleTool> = ({gather, setgather, foucs, setfoucs}) => {

  const addArticle = () => {
    setgather((state) => {
      state.article_data.push(defaultGather.article_data[0])
      return {...state}
    })
    
  }

  const removeArticle = () => {
   if (gather.article_data.length > 1) {
    setgather((state) => {
        state.article_data.splice(foucs, 1)
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

// 此函数在构建时被调用
// export const getStaticProps: GetStaticProps = async (context) => {
//   // 调用外部 API 获取博文列表
//   if (context.params === undefined || context.params.articleId === undefined) {
//     return {
//       notFound: true
//     }
//   } else {
//     const article  = await GetWritingArticleById(context.params?.articleId as string)
//     const categorysList = await GetCategorys()
//     const labeslist = await GetLabels()
//       if (!article) {
//         return {
//           notFound: true
//         }
//       }
//     return {
//       props: {
//         categorysList,
//         labeslist,
//         article
//       }
//     }
//   }

 
// }

// export async function getStaticPaths() {

  
//   const data = await WritingArticleApi(value.get())
//   const paths: any[] = []
//   const aritlces = [...data.getWritingArticle.gather_data, ...data.getWritingArticle.muster_data]
//   aritlces.forEach((item) => {
//     item.article_data.map((i) => {
//       paths.push({
//         params: {
//           articleId: '/writing/' + i.outer_id
//         }
//       })
//     })
//   })
//   // const paths = users.map((user) => ({
//   //   params: { id: user.id.toString() },
//   // }))

//   return { paths, fallback: true }
// }



export function UserArticleComponent({article}: UserArticleProps) {
  const {data: categorysList } = GetCategorys()
  const {data: labeslist} =  GetLabels()
  const {data: MusterInfo} = GetBaseMusterInfo()
  const router = useRouter()

  const [foucs, setfoucs] = useState(0)
  const [isGather, setisGather] = useState(article.type === 'GATHER' ? true : false)
  const [showDrawer, setshowDrawer] = useState(false)

  const [gather, setgather] = useState<gather>(isGather? article as gather : defaultGather)
  const [muster, setmuster] = useState<muster>(isGather? defaultMuster: article as muster)
  
  const imgFiles = useRef<UploadItem[] | undefined>(undefined)


  function SubmitMusterArticle(data: muster) {
    return useMutation<AddArticleRes>(
    async () => {
      return await graphqlClient.request(submitMusterMutation, {
        description: data.description,
        article: data.article,
        category: data.categorys,
        labels: data.labels.map((item) => ({label: item})),
        title: data.title,
        articleImg: data.article_img,
        muster_id: data.muster,
        muster_article_id: data.id
      }).then((res) => {
        return res.addMuster
      })
    }, {
      onSuccess: (data) => {
        router.push('/article/' + data.article_id)
      }
    }
  )
  }

  function SubmitGatherArticle(data: gather) {
    return useMutation<AddArticleRes>(
      async () => {
        return await graphqlClient.request(submitGatherMutation, {
          labels: data.labels.map((item) => ({label: item})),
          category: data.categorys,
          aritcle_data: data.article_data,
          gather_article_id: data.gather_article_id,
          gather_id: data.gather_id
        }).then((res) => res)
      }, {
        onSuccess: (data) => {
          router.push('/article/' + data.article_id)
        }
      }
    )
  }

  const SubmitMusterMutation = SubmitMusterArticle(muster)
  const savedMusterMutation = SavedMusterArticle(muster)
  const SubmitGatherMutation = SubmitGatherArticle(gather)
  const savedGatherMutation = SavedGatherArticle(gather)

  useEffect( () => {
    (async () => {
      if (muster.article_img && !isGather) {
        imgFiles.current = [await getImg() as UploadItem]
      }
    })()
 
  })

  if (!article) {
    return <Spin></Spin>
  }



  const onDragend = (result: DropResult) => {
    if(!result.destination) return
    const newdata = reorder(gather, result.source.index, result.destination.index)
    setgather((state) => {
      state.article_data = newdata
      return state
    })
    setfoucs(result.destination.index)
  }

  const changeMod = () => setisGather((state) => !state) 

  const textChange = (text: string) => {
    if (isGather) {
      setgather((state) => {
        state.article_data[foucs].article = text
        return {...state}
      })
    } else {
      setmuster((state) => {
        state.article = text
        return {...state}
      })
    }
  }

  const setInput = (value: string) => {
    if (isGather) {
      setgather((state) => {
        state.article_data[foucs].title = value
        return {...state}
      })
    } else {
      setmuster((state) => {
        state.title = value
        return {...state}
      })
    }
  }

  const saveArticle = async () => {
    if (isGather) {
      console.log(gather);
      
      await savedGatherMutation.mutateAsync()
      if (savedGatherMutation.isSuccess) {
        Message.success({content: "保存成功"})
      } else if (savedGatherMutation.error) {
        Message.error({content: "发生错误"})
      }
    } else {
      console.log(muster);
      
      await savedMusterMutation.mutateAsync()
      if (savedMusterMutation.isSuccess) {
        Message.success({content: "保存成功"})
      } else if (savedMusterMutation.error) {
        Message.error({content: "发生错误"})
      }
    }
  }

  const submitAritlce = async () => {
    if (isGather) {
      const article_id = await SubmitGatherMutation.mutateAsync()
      console.log(article_id);
      
      if (SubmitGatherMutation.isSuccess) {
        Message.success({content: "保存成功"})
        // setshowDrawer(false)
        // router.push('/writing/' )

      } else if (SubmitGatherMutation.error) {
        Message.error({content: "发生错误"})
      }
    } else {
      await SubmitMusterMutation.mutateAsync()
      
      setshowDrawer(false)
      if (SubmitMusterMutation.isSuccess) {
        Message.success({content: "保存成功"})
        // setshowDrawer(false)
        router.push('/article/' + SubmitMusterMutation.data.article_id)
      } else if (SubmitMusterMutation.error) {
        
        Message.error({content: "发生错误"})
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
          value={isGather ? gather.article_data[foucs].title : muster.title}
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
            <Tool gather={gather} setgather={setgather} foucs={foucs} setfoucs={setfoucs} />  
            <DragDropContext onDragEnd={onDragend}>
              <Droppable droppableId="droppable">
                {
                  (provided, snapshot) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      style={getListStyle(snapshot.isDraggingOver)} 
                      >
                        {gather.article_data.map((item, index) => (
                          <Draggable key={index} draggableId={String(index)} index={index}>
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
        
          modelValue={isGather? gather.article_data[foucs].article : muster.article} 
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
          <Form 
            size='large'
            // labelCol={{span: 6}}
            >
            <FormItem label='选择分类'>
              <RadioGroup
                type='button'
                name='lang'
                value={isGather ? gather.categorys : muster.categorys}
                onChange={(value) => {
                  if (isGather) {
                    setgather((state) => {
                      state.categorys = value
                      return {...state}
                    })
                  } else {
                    setmuster((state) => {
                      state.categorys = value
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
                value={isGather? gather.labels : muster.labels}
                onChange={(value: string[]) => {
                  if (isGather) {
                    setgather((state) => {
                      state.labels = value
                      return {...state}
                    })
                  } else {
                    setmuster((state) => {
                      state.labels = value
                      return {...state}
                    })
                  }
                }}
              >
                { labeslist && labeslist.map((option) => (
                  <Option 
                    defaultChecked={
                      isGather ? 
                        gather.labels.findIndex((item) => item === option.label_id) !== -1 :
                        muster.labels.findIndex((item) => item === option.label_id) !== -1
                    } 
                    key={option.label_id} 
                    value={option.label_id}>
                      {option.name}
                  </Option> 
                  )) 
                }
              </Select>
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
                defaultFileList={isGather ? undefined : imgFiles.current}
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
                  const imgUrl = await appendImg(fileList[0])
                  if (imgUrl) {
                    if (isGather) {
                      setgather((state) => {
                        state.article_data[foucs].article_img = imgUrl
                        return {...state}
                      })
                    } else {
                      
                      setmuster((state) => {
                        state.article_img = imgUrl
                        imgFiles.current = [fileList[0]]
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
            <FormItem 
              style={{'display': !isGather ? 'flex' : 'none'}}
              label={'收至专栏'}
              
            >
               <Select allowCreate placeholder='选择一个专栏' allowClear style={{ width: 250 }}>
                  {MusterInfo ? MusterInfo.muster_data.map((option) => (
                    
                    <Option key={option.muster_id} value={option.muster_id}>
                      {option.name}
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
                  defaultValue={isGather ? gather.description : muster.description}
                  onChange={(value) => {
                    if (isGather) {
                      setgather((state) => {
                        state.description = value
                        return state
                      })
                    } else {
                      setmuster((state) => {
                        state.description = value
                        return state
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

//  function UserArticleComponent({categorysList, labeslist, article}: UserArticleProps) {
//   const [foucs, setfoucs] = useState(0)
//   // const [isGather, setisGather] = useState(article.description === defaultMuster.description ? false : true)
//   // const [gather, setgather] = useState<gather>(isGather? article as gather : defaultGather)
//   // const [muster, setmuster] = useState<muster>(isGather? defaultMuster: article as muster)
//   console.log(article);
  
//   return (
//     <div>
//       <div>123</div>
//       {/* {
//         article ? <>123</> : <><Spin></Spin></>
//       } */}
//     </div>
//   )
//   // return <>123</>
//  }

 const UserEditor = () => {
  const router = useRouter()

  if (router.query.articleId) {
    const {data, isSuccess, isLoading} = GetWritingArticleById(router.query.articleId as string)


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
    return <UserArticleComponent article={defaultMuster}></UserArticleComponent>
  }


 }

 export default UserEditor