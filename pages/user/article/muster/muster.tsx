import { Breadcrumb, Button, Collapse, Empty, Form, Image, Input, Message, Modal, Skeleton, Upload } from "@arco-design/web-react"
import { UploadItem } from "@arco-design/web-react/es/Upload"
import { useState } from "react"
import { useMutation } from "react-query"
import { createMuster } from "../../../../api/gql/gql"
import graphqlClient from "../../../../api/GqlClient"
import { GetMusterArticles } from "../../../../api/interface/api"
import ColumnEntry from "../../../../components/column-entry/column-entry"
import { appendImg } from "../../../../utills/fetch"
import style from '../gather/gather.module.sass'
const BreadcrumbItem = Breadcrumb.Item
const InputSearch = Input.Search
const TextArea = Input.TextArea

type MusterFrom = {
  name: string,
  desc: string,
  muster_img: string
}

const FormItem = Form.Item
const MusterComponent = () => {
  const {data, isLoading} = GetMusterArticles()
  const [visible, setVisible] = useState(false)
  const [formData, setformData] = useState<MusterFrom>({
    name: '',
    desc: '',
    muster_img: ''
  })

  function CreateMusterMutate () {
    return useMutation(async () => {
      return await graphqlClient.request(createMuster, {data: formData}).then((res) => res)
    }, {
      onSuccess: () => {
        Message.success({content: "创建成功"})

      }
    })
  }

  const createMusterMutate = CreateMusterMutate()
  
  if (data === undefined) {
      return <Empty className={style.empty}></Empty>
    }


  return (
    <>
       <div className={style.gatherWrapper}>
        <Breadcrumb className={style.bread}>
          <BreadcrumbItem className={style.breadTitle}>文章管理</BreadcrumbItem>
          <BreadcrumbItem className={style.breadArt}>专栏文章</BreadcrumbItem>
        </Breadcrumb>
        <div>
          <InputSearch
            searchButton
            defaultValue='Search content'
            placeholder='Enter keyword to search'
            style={{ width: 250, height: 30, marginRight: '20px' }}
          />

          <Button type='primary' onClick={() => setVisible(true)}>新增文章</Button>

          <Modal
            title='新建专栏'
            visible={visible}
            onOk={() => {
              setVisible(false)
              createMusterMutate.mutate()
              console.log(formData);
              
            }}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}

          >
            <Form style={{ width: 450 }}>
              <FormItem label='专栏名称'>
                <Input placeholder='请输入专栏名称' onChange={(value) => setformData((state) => {
                  state.name = value
                  return {...state}
                })} />
              </FormItem>
              <FormItem label='专栏简介'>
                <TextArea
                  placeholder='Please enter ...'
                  autoSize={{ minRows: 2, maxRows: 6 }}
                  style={{ width: 350 }}
                  defaultValue='请输入专栏介绍 '
                  onChange={(value) => {
                    setformData((state) => {
                      state.desc = value
                    return {...state}
                    })
                  }}
                />
              </FormItem>
              <FormItem label='专栏图片'>
              <Upload
                multiple
                limit={1}
                progressProps={{
                  size: 'small',
                  type: 'line',
                  showText: true,
                  width: '100%'
                }}
                // defaultFileList={isGather ? undefined : imgFiles.current}
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
                      setformData((state) => {
                        state.muster_img = imgUrl
                        return {...state}
                      })
                  }
                }}
                action='/'
                accept='image/*'
                listType='picture-card'
                />
              </FormItem>
            </Form>
          </Modal>
        </div>
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

export default MusterComponent