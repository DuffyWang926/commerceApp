

  
  const INITIAL_STATE = {
    imgList: [
          {
            id:'1',
            imgUrl:1,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'2',
            imgUrl:2,
            type:'',
            name:'',
            emotion:''
          },
          {
            id:'3',
            imgUrl:3,
            type:'',
            name:'',
            emotion:''
          }
        ],
    city:"北京市",
    
  }
  
  export default function search (state = INITIAL_STATE, action) {
    if(action.type ==  "HOMEDETAIL"){
      const { data } = action.payload
      const { imgList=[], imgListNext=[]} = data
      return {
        ...state,
        imgList
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
  