

  
  const INITIAL_STATE = {
    getGoodsParams:{
      keyword:'手机',
      isInit:'0',
      size:4
    },
    getGoodsUrlParams:{
      keyword:'手机',
      isInit:'1',
      size:4
    },
    // goodsList:[],
    goodsList:[{"imgSrc":"https://img14.360buyimg.com/n1/jfs/t1/145385/13/14267/137822/5fae2976E61fc0b1e/dc4e27f0a7d02dcd.jpg","buyUrl":"","title":"钙尔奇（Caltrate）液体钙 补钙 VD钙片 维生素软胶囊 90粒 新老包装随机发","price":"69","returnRate":0.2,"returnMoney":"12.42","couponUrl":"","shop":"善存钙尔奇京东自营旗舰店"},{"imgSrc":"https://img14.360buyimg.com/n1/jfs/t1/89142/21/26473/391710/624648eeE17e64f02/fd33e8d8997230fb.jpg","buyUrl":"","title":"钙尔奇 添佳片补钙片男女 中老年成人维生素D3碳酸钙片男女 300片优惠装 新老包装随机发","price":"189","returnRate":0.2,"returnMoney":"34.02","couponUrl":"","shop":"善存钙尔奇京东自营旗舰店"},{"imgSrc":"https://img14.360buyimg.com/n1/jfs/t1/174136/23/5350/547877/607d3596E3376f30b/bb07c52e4462b235.jpg","buyUrl":"","title":"中华创世神话选注·神的起源卷（套装共2册）","price":"199.99","returnRate":0.01,"returnMoney":"1.80","couponUrl":"","shop":""},{"imgSrc":"https://img14.360buyimg.com/n1/jfs/t1/139198/12/2539/202264/5f08116eE9564e6c5/bf9f513b0f19fdd7.jpg","buyUrl":"","title":"【免保参拍】琥珀蜜蜡满蜡老蜡双面带皮算盘珠DIY手串  配绿松石桶珠","price":"501","returnRate":0.01,"returnMoney":"4.51","couponUrl":"","shop":"正河珠宝"}],
    goodsUrlList:[],
  }
  
  export default function goodJing (state = INITIAL_STATE, action) {
    if(action.type ===  "JINGDONGGOODS"){
      const { data } = action.payload
      const { goodsList } = data
      return {
        ...state,
        goodsList
      };
      
    }else if(action.type ===  "JINGDONGGOODSURL"){
      const { data } = action.payload
      const { goodsList } = data
      return {
        ...state,
        goodsUrlList:goodsList
      };
      
    }else{
      return state
    }
    
  }
  