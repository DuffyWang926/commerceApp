 function getUrlCode(url, isAll){
    let nextList = url.split('?')
    let nextUrl = nextList.length > 0 && nextList[1]
    let paramsList = nextUrl && nextUrl.split('&')
    let code = ''
    let result = {}
    debugger
    Array.isArray(paramsList) && paramsList.map( (v,i) =>{
      let endList = v && v.split('=')
      if(endList.length > 0){
        debugger
        if(endList[0] == 'code'){
          code = endList[1]
        }
        result[ endList[0] ] = endList[1]
      }
      
    })
    if(isAll){
      return result
    }else{
      return code
    }
    
}
export default getUrlCode

