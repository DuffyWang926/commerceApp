
const INITIAL_STATE = {
    productId:'',
    products:[],
    type:0,
    page:1,
    pageSize:10,
    leftProducts:[],
    rightProducts:[],
    userPage:1,
    userPageSize:10,
    userProducts:[],
    hasMore:true,
    userHasMore:true,
    isPublished:false,
    
}
  
export default function product (state = INITIAL_STATE, action) {
  if(action.type ==  "PUBLISH"){
    let isPublished = true
    return {
      ...state,
      isPublished
      
    }

  }else if( action.type ==  "GetPRODUCTS" ){
    const { data = [] } = action.payload
    const { products,
      leftProducts,
      rightProducts,
      pageSize
     } = state
    let next = products.concat(data)
    const middleIndex = Math.ceil(data.length / 2);
    let nextLeft = leftProducts.concat(data.slice(0, middleIndex))
    let nextRight = rightProducts.concat(data.slice(middleIndex))
    let hasMore = true
    if(data && data.length < pageSize){
      hasMore = false
    }
    
    return {
      ...state,
      products:next,
      leftProducts:nextLeft,
      rightProducts:nextRight,
      hasMore
    }

  }else if( action.type ==  "GetUSERPRODUCTS" ){
    const { data = [], isRefresh } = action.payload
    const { userProducts, userPageSize } = state
    let next = []
    if(isRefresh){
      next = data
    }else{
      next = userProducts.concat(data)
    }
    console.log("GetUSERPRODUCTS",action.payload)
    let userHasMore = true
    if(data && data.length < userPageSize){
      userHasMore = false
    }
    return {
      ...state,
      userProducts:next,
      userHasMore,
    }
    
  }else if( action.type ==  "CHANGEPAGE" ){
    console.log("CHANGEPAGE",action.payload)
    return {
      ...state,
      ...action.payload,
    }
  }
  return state
  
}
  