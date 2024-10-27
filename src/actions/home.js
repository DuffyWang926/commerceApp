  
import api from '../services/api'
export const postLogin = (payload) => {
  return async dispatch => {
    const { oldUrl } = payload
    let res = await api.post('/login',payload)
    dispatch({
      type: 'LOGIN',
      payload: {...res, oldUrl}
    })
  }
}

export const changeHomeData = (payload) => {
  return {
    type: 'CHANGEHOMEDATA',
    payload
  }
}

export const recordTime = (payload) => {
  return async dispatch => {
    let res = await api.post('/recordTime',payload)
    
    
  }
}

export const changeCity = (payload) => {
  return {
    type: 'CHANGECITY',
    payload
  }
}
  
