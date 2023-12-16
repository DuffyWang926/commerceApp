

  
  const INITIAL_STATE = {
    groupImgs:[]
  }
  
  export default function group (state = INITIAL_STATE, action) {
    if(action.type ==  "GETGROUPIMGS"){
      const { data = [] } = action.payload
      return {
        ...state,
        groupImgs:data
      }

    }
    return state
    
  }
  