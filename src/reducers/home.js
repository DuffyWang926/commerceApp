import Taro from '@tarojs/taro'
  
const INITIAL_STATE = {
  userId:'',
  userInfo:{},
  tapCurrent:0,
}

export default function home (state = INITIAL_STATE, action) {
  if(action.type ==  "LOGIN"){
    const { data = {} , oldUrl} = action.payload
    const { userInfo = {} } = data
    const { userId = '' } = userInfo
    Taro.navigateTo({
      url:oldUrl
    });
    return {
      ...state,
      userInfo,
      userId:userId
    }

  }else if( action.type ==  "POSTUSERINFO" ){
    const { data = {} } = action.payload
    const { userInfo = {} } = data
    const { userId = '' } = userInfo
    return {
      ...state,
      userInfo,
      userId,
    };

  }else if( action.type ==  "CHANGEHOMEDATA" ){
    const { tapCurrent = 0 } = action.payload
    return {
      ...state,
      tapCurrent
    };
  }
  return state
  
}
  