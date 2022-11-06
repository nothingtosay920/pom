import { Notification } from "@arco-design/web-react"
import Base64 from 'base-64'
import { UploadItem } from "@arco-design/web-react/es/Upload"
import CryptoJS, { MD5 } from 'crypto-js'

const policyText = {
  "expiration": "2022-12-15T12:00:00.000Z", // 设置该Policy的失效时间，
  "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
  ]
}
const policyBase64 = Base64.encode(JSON.stringify(policyText))
const bytes = CryptoJS.HmacSHA1(policyBase64, "6mXPRzUCmiLYhYUGyrgZVg2XawZGFR")
const signature = bytes.toString(CryptoJS.enc.Base64); 

export const PostImgToAliyun = async(originFile: UploadItem, baseName: string) => {

  const form = new FormData()
  const date = new Date()
  const time = '' + date.getFullYear() + date.getMonth() + date.getDay()
  const fileName = MD5(baseName)
  form.append('key', time + '/imgs/'+ fileName)
  form.append('policy', policyBase64)
  form.append('OSSAccessKeyId', 'LTAI5tEYKPckuhdwAunUdAmT')
  form.append('success_action_status', '200')
  form.append('signature', signature)
  form.append('file', originFile.originFile as File)

  // ending-homework.oss-cn-beijing.aliyuncs.com
  return await fetch('http://ending-homework.oss-cn-beijing.aliyuncs.com', {
    method: 'POST',
    body: form,
  }).then((resolved) => {
    if (resolved.status === 200) {
      return resolved.url + time + '/imgs/' + fileName  + '?x-oss-process=style/pom-img'
    } else {
      return ''
    }
  }, () => {
    
    Notification.error({ title: 'Error', content: '上传出错，请重新选择图片上传'})
    return ''
  })
}

// url: string = 'https://ending-homework.oss-cn-beijing.aliyuncs.com/b814844d2340309b13378d88e72d552d'
export const getImg = async (imgPath: string) => {
    return await fetch(imgPath).then(async (res) => {
    if (res.status === 200) {
      let file = new window.File([await res.blob()],`image.jpg`,{type: "image/jpeg"})
      return {
        uid: '111111111111111',
        originFile: file
      }
    }
  })
}
