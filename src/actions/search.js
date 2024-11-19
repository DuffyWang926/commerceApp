  
import api from '../services/api'
export const search = (payload) => {
  return async dispatch => {
    const { isAdd } = payload
    let res = await api.post('/productlist',payload)
    if(isAdd){
      dispatch({
        type: 'SEARCHADD',
        payload: {...res}
      })

    }else{
      dispatch({
        type: 'SEARCH',
        payload: {...res}
      })

    }
    
    
  }
}

export const changePage = (payload) => {
  return async dispatch => {
     dispatch({
      type: 'CHANGEPAGE',
      payload: payload
    })
      
  }
}
export const changeCity = (payload) => {
  return {
    type: 'CHANGECITY',
    payload
  }
}
  
