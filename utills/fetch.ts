import { Notification } from "@arco-design/web-react"
import md5 from "md5"
import Base64 from 'base-64'
import { UploadItem } from "@arco-design/web-react/es/Upload"
import CryptoJS, { MD5 } from 'crypto-js'

const policyText = {
  "expiration": "2022-08-15T12:00:00.000Z", // 设置该Policy的失效时间，
  "conditions": [
    ["content-length-range", 0, 1048576000] // 设置上传文件的大小限制
  ]
}
const policyBase64 = Base64.encode(JSON.stringify(policyText))
const bytes = CryptoJS.HmacSHA1(policyBase64, "6mXPRzUCmiLYhYUGyrgZVg2XawZGFR")
const signature = bytes.toString(CryptoJS.enc.Base64); 

export const appendImg = async(originFile: UploadItem) => {

  const form = new FormData()
  const date = new Date()
  const time = date.getFullYear() + date.getMonth() + date.getDay() + date.getHours() + date.getMinutes() + date.getSeconds()
  const fileName = md5(originFile.name as string + time)
  form.append('key', 'imgs/'+ fileName)
  form.append('policy', policyBase64)
  form.append('OSSAccessKeyId', 'LTAI5tEYKPckuhdwAunUdAmT')
  form.append('success_action_status', '200')
  form.append('signature', signature)
  form.append('file', originFile.originFile as File)

  // ending-homework.oss-cn-beijing.aliyuncs.com
  return fetch('http://ending-homework.oss-cn-beijing.aliyuncs.com', {
    method: 'POST',
    body: form,
  }).then((resolved) => {
    if (resolved.status === 200) {
      return resolved.url + 'imgs/' + fileName
    }
  }, () => {
    Notification.error({ title: 'Error', content: '上传出错，请重新选择图片上传'})
  })
}

// url: string = 'https://ending-homework.oss-cn-beijing.aliyuncs.com/b814844d2340309b13378d88e72d552d'
export const getImg = async () => {
  // 'https://ending-homework.oss-cn-beijing.aliyuncs.com/b814844d2340309b13378d88e72d552d'
    return await fetch('https://ending-homework.oss-cn-beijing.aliyuncs.com/b814844d2340309b13378d88e72d552d').then(async (res) => {
    if (res.status === 200) {
      // console.log(await res.blob());
      let file = new window.File([await res.blob()],`image.jpg`,{type: "image/jpeg"})
      return {
        uid: '111111111111111',
        originFile: file
      }
    }
  })
}

