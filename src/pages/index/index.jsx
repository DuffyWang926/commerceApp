import { Component } from 'react'
import Taro from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";
import {
  getProducts,
  changePage
} from "../../actions/product";

import TapCom from "../../components/TapCom";
import TabsCom from "../../components/TabsCom";
import ProductCom from "../../components/ProductCom";
import CityValCom from "../../components/CityValCom";
const bannerImgA = require("../../assets/banner/banner1.jpg")


const mapStateToProps = (state)=>{
  const { home, product, search } = state
  const { itemList, tapCurrent } = home
  const { city } = search
  const { type, page, pageSize, products, leftProducts,
    rightProducts,
    hasMore,
   } = product
    return {
      itemList,
      tapCurrent,
      type,
      page,
      pageSize,
      products,
      leftProducts,
      rightProducts,
      hasMore,
      city
      
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    },
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    getProducts:(payload)=>{
      dispatch(getProducts(payload));
    },
    changePage:(payload)=>{
      dispatch(changePage(payload));
    },
    
    
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props) {
    super(props);
    const bannerList = [
      {
        url:'/module/shareGroups/pages/index',
        imgSrc:bannerImgA
      },
      
    ]
    

    this.state={
      bannerList,
      bannerCurrent:0,
      currentTab:0,
    }
  }

  componentDidMount(){
    const { type, page, pageSize, leftProducts } = this.props
   
    this.props.getProducts({type, page, pageSize, isRefresh:true})

   
    
  }

  onShareAppMessage(res) {
    console.log(res);
    if (res.from === 'menu') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: '梦都二手闲置',
      path: 'pages/index/index' ,
    }
  }


  onPullDownRefresh = () => {
    console.log('onPullDownRefresh triggered');
    
  };

  // 底部上拉加载更多数据事件处理函数
  onReachBottom = () => {
    const { type, page, pageSize, hasMore, } = this.props

    if (hasMore) {
      console.log('onReachBottom triggered');
      let nextpage = page + 1
      this.props.changePage({ page:nextpage})
      this.props.getProducts({type, page:nextpage, pageSize})

      // this.loadMoreData();
    } else {
      Taro.showToast({ title: '没有更多商品啦。', icon: 'none' });
    }
  };

  
 
  // changeTab = ()=>{
  //   this.props.changeHomeData({ tapCurrent:1})
  // }
  onBannerClick = (obj) => {
    const { bannerList, bannerCurrent } = this.state
    let  url  = ''
    Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      if(i == bannerCurrent){
        url = v.url
      }
    })
    if(url){
      Taro.navigateTo({
        url
      });
    }
    
    

  }
  onBannerChange = (e) => {
    const { current } = e.detail
    this.setState({
      bannerCurrent:current
    })

  }
  changeTab = (val) => {
    this.setState({
      currentTab:val
    })

  }

  chooseCity = () =>{
    let url = '/module/city/index'
    Taro.navigateTo({
      url
    });
  }
  
  

  


  

  render () {
    const { bannerList, currentTab} = this.state
    const { 
      leftProducts,
      rightProducts,
      city
    } = this.props
    
    const leftProductsNode = Array.isArray(leftProducts) && leftProducts.map( (v,i) =>{
      const { imgList=[] } = v
      let imgUrl = imgList.length >0 && imgList[0] 
      const productProps = {
        ...v,
        imgUrl,
      }
      let res = (<ProductCom  key={'product' + i} props={productProps}></ProductCom>)
      return res                             
    })
    
    const rightProductsNode = Array.isArray(rightProducts) && rightProducts.map( (v,i) =>{
      const { imgList=[] } = v
      let imgUrl = imgList.length >0 && imgList[0] 
      const productProps = {
        ...v,
        imgUrl,
        type:1
      }
      let res = (<ProductCom  key={'product' + i} props={productProps}></ProductCom>)
      return res                             
    })

  
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      const {imgSrc } = v
      let res = (<SwiperItem key={i + 'swiperItem'} >
      <Image src={imgSrc} className='homeImg' ></Image>
    </SwiperItem>)
      return res                             
    })
    
    const tabsProps = {
      tabs:[
        {
          label:'二手商品',
          value:0,
        },
      ], 
      currentTab,
      changeTab:this.changeTab,
    }
    return (
      <View className='home'>
        <Swiper
          onClick={ () => this.onBannerClick()}
          onChange={ (e) => this.onBannerChange(e)}
          className='homeSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots={false}
          autoplay>
          {bannerListCom}
        </Swiper>
        
        < CityValCom />
       
        < TabsCom props={tabsProps}/>
        
        {/* <View className='homeTap'>
          <View className='changeType'>
          分类展示 全部展示
          </View>
          <View className='changeType'>
          筛选
          </View>
        </View> */}
        <View className='homeContent'>
          <View className='leftCon'>
            {leftProductsNode}
          </View>
          <View className='rightCon'>
            {rightProductsNode}
          </View>
        </View>
        
        <TapCom ></TapCom>
      </View>
    )
  }
}
