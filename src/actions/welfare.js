  
import api from '../services/api'
export const attendWelfare = (payload) => {
  return async dispatch => {
    let res = await api.post('/attendWelfare',payload)
    dispatch({
      type: 'ATTENDWELFARE',
      payload: res
    })
  }
}

export const getWelfareList = (payload) => {
  return async dispatch => {
    let res = await api.post('/getWelfareList',payload)
    dispatch({
      type: 'GETWELFARELIST',
      payload: res
    })
  }
}
  
