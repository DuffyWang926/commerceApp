  
  import api from '../services/api'
  export const getGoods = (payload) => {
    return dispatch => {
        api.get('/searchgoodsjd',payload).then((res) => {
        const { isInit } = payload
        if(isInit === '0'){
          dispatch({
            type: 'JINGDONGGOODS',
            payload: res
          })
        }else{
          dispatch({
            type: 'JINGDONGGOODSURL',
            payload: res
          })
        }
        
      })
    }
  }
  
