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

// class V {
//   state = 'mHmRUqOnuXrv2N4dVoob0'
//   set(value: string) {
//     this.state = value
//   }
//   get() {
//     return this.state
//   }
// }

// const value = new V()
// export default value
