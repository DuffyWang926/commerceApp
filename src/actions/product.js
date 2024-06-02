  
import api from '../services/api'
export const publishProduct = (payload) => {
  return async dispatch => {
    
      let res = await api.post('/publish',payload)
      // dispatch({
      //   type: 'PUBLISH',
      //   payload: res
      // })
    
  }
}

export const getProducts = (payload) => {
  return async dispatch => {
    
      let res = await api.post('/productlist',payload)
      dispatch({
        type: 'GetPRODUCTS',
        payload: res
      })
    
  }
}
  
