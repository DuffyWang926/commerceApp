  
import api from '../services/api'
export const publishProduct = (payload) => {
  return async dispatch => {
    
      let res = await api.post('/publish',payload)
      dispatch({
        type: 'PUBLISH',
        payload: res
      })
    
  }
}

export const getProducts = (payload) => {
  return async dispatch => {
    const { userId, isRefresh } = payload
    // delete payload.isRefresh
      let res = await api.post('/productlist',payload)
      
      if(userId){
        dispatch({
          type: 'GetUSERPRODUCTS',
          payload: { ...res, }
        })

      }else{
        dispatch({
          type: 'GetPRODUCTS',
          payload: res
        })

      }
  }
}

export const deleteProducts = (payload) => {
  return async dispatch => {
    
    let res = await  api.post('/deleteproducts',payload)
    
    if(res){
      const { userId, page, pageSize, isRefresh } = payload
      let response = await api.post('/productlist',{userId, page:1, pageSize,})
      
      if(userId){
        dispatch({
          type: 'GetUSERPRODUCTS',
          payload: { ...response, isRefresh}
        })

      }
    }
    
      
  }
}

export const checkProducts = (payload) => {
  return async dispatch => {
    
    await  api.post('/checkProducts',payload)
    
    
    
      
  }
}


export const reportProduct = (payload) => {
  return async dispatch => {
    await  api.post('/reportProduct',payload)
     dispatch({
      type: 'DELETEPRODUCTS',
      payload: payload
    })
      
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

