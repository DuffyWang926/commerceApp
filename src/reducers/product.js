
const INITIAL_STATE = {
    productId:'',
    products:[],
    type:0,
    page:1,
    pageSize:10,
    leftProducts:[],
    rightProducts:[],
}
  
  export default function product (state = INITIAL_STATE, action) {
    if(action.type ==  "PUBLISH"){
      
      return {
        ...state,
        
      }

    }else if( action.type ==  "GetPRODUCTS" ){
      const { data = [] } = action.payload
      const { products,
        leftProducts,
        rightProducts } = state
      let next = products.concat(data)
      const middleIndex = Math.floor(data.length / 2);
      let nextLeft = leftProducts.concat(data.slice(0, middleIndex))
      let nextRight = rightProducts.concat(data.slice(middleIndex))
      
      return {
        ...state,
        products:next,
        leftProducts:nextLeft,
        rightProducts:nextRight,
      }

    }else if( action.type ==  "CHANGEHOMEDATA" ){
      
    }
    return state
    
  }
  