import Taro from '@tarojs/taro'

  
  const INITIAL_STATE = {
    welfareList:[],
    isAttend:false
  }
  
  export default function welfare (state = INITIAL_STATE, action) {
    if(action.type ==  "ATTENDWELFARE"){
      Taro.showToast({
        title:'参加成功',
      })
      return {
        ...state,
        isAttend:true
      }

    }else if(action.type ==  "GETWELFARELIST"){
      const { data = [] } = action.payload 
      let welfareList = Array.isArray(data) && data.map( (v,i) =>{
        let newName = ''
        if (v.nickName.length <= 4) {
          newName =  v.nickName[0] + '*'.repeat(v.nickName.length - 1);
        } else {
          newName = v.nickName[0] + '**' + v.nickName[v.nickName.length - 1];
        } 
        let userId = v.userId.slice(0, 3) + '* * *' + v.userId.slice(-3)
        let date = new Date(+v.date).toLocaleDateString()
        let res = {
          headUrl:v.headUrl,
          nickName:newName,
          userId,
          date,

        }
        return res
      })
      return {
        ...state,
        welfareList:welfareList
      }

    }
    return state
    
  }
  