  
import api from '../services/api'
export const getGroupImgs = (payload) => {
  return async dispatch => {
    let res = await api.get('/getGroupImgs',payload)
    dispatch({
      type: 'GETGROUPIMGS',
      payload: res
    })
  }
}


  
