

  
  const INITIAL_STATE = {
    orderType:0,
    page:1,
    pageSize:10,
    products:[],
    leftProducts:[],
    rightProducts:[],
    hasMore:false,
    city:"北京市",
    
  }
  
  export default function search (state = INITIAL_STATE, action) {
    if(action.type ==  "SEARCH"){
      const { data = [] } = action.payload
      const { 
        pageSize,
      } = state
      let next = data
      const middleIndex = Math.ceil(data.length / 2);
      let nextLeft = data.slice(0, middleIndex)
      let nextRight = data.slice(middleIndex)
      let nextHasMore = true
      if(data && data.length < pageSize){
        nextHasMore = false
      }
      
      return {
        ...state,
        products:next,
        leftProducts:nextLeft,
        rightProducts:nextRight,
        hasMore:nextHasMore
      }
  
    }if(action.type ==  "SEARCHADD"){
      const { data = [] } = action.payload
      const { products,
        leftProducts,
        rightProducts,
        pageSize,
      } = state
      let next = products.concat(data)
      const middleIndex = Math.ceil(data.length / 2);
      let nextLeft = leftProducts.concat(data.slice(0, middleIndex))
      let nextRight = rightProducts.concat(data.slice(middleIndex))
      let nextHasMore = true
      if(data && data.length < pageSize){
        nextHasMore = false
      }
      
      return {
        ...state,
        products:next,
        leftProducts:nextLeft,
        rightProducts:nextRight,
        hasMore:nextHasMore
      }
  
    }else if( action.type ==  "CHANGEPAGE" ){
      console.log("CHANGEPAGE",action.payload)
      return {
        ...state,
        ...action.payload,
      }
    }else if( action.type ==  "CHANGECITY" ){
      const { city } = action.payload
      return {
        ...state,
        city
      };
    }
    return state
    
  }
  