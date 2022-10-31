import { format } from "date-fns"
import { debounce } from "debounce"
import { useCallback } from "react"

export function parseEmpty(value: any): boolean {
  let res = false
  if (typeof value === 'object') {
    for (const key in value) {
      if (Object.prototype.hasOwnProperty.call(value, key)) {
        const element = value[key] 
        if(typeof element === 'object') {
          res = parseEmpty(element)
        } else {
          res = element === undefined || element === null
        }
      }
    }    
  } else {
    res = value === undefined || value === null
  }
  return res
}

export const _isMobile = () => {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
  return flag;
}
  
// export const getAgentInfo = async () => {
//   const fpPromise = await FingerprintJS.load({
//     apiKey: "1LXHEURL21Hb7W5dbKJv"
//   })
//  const result = await fpPromise.get()
//  return result.visitorId
 
// }

export const getNowTime = () => format(new Date(), 'yyyy-MM-dd HH:mm:ss')
