import { Component } from 'react'
import Taro from "@tarojs/taro";
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";
import {
  getProducts,
} from "../../actions/product";

// import { AtTabBar } from "taro-ui";
import SearchCom from "../../components/SearchCom";
import HomeItem from "../../components/HomeItem";
import TapCom from "../../components/TapCom";
import TabsCom from "../../components/TabsCom";

import ProductCom from "../../components/ProductCom";
const bannerImgA = require("../../assets/banner/banner1.png")


const mapStateToProps = (state)=>{
  const { home, product } = state
  const { itemList, tapCurrent } = home
  const { type, page, pageSize, products, leftProducts,
    rightProducts, } = product
    return {
      itemList,
      tapCurrent,
      type,
      page,
      pageSize,
      products,
      leftProducts,
      rightProducts, 
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
    
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props) {
    super(props);
    const bannerList = [
      {
        url:'pages/shareGroups/index',
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
    const { type, page, pageSize } = this.props
    // let url = window.location.href
    // let code = ''
    // let nextList = url.split('?')
    // let nextUrl = nextList.length > 0 && nextList[1]
    // let paramsList = nextUrl && nextUrl.split('&')
    // let urlUpCode = ''
    // Array.isArray(paramsList) && paramsList.map( (v,i) =>{
    //   let endList = v && v.split('=')
    //   if(endList.length > 0){
    //     if(endList[0] == 'upCode'){
    //       urlUpCode = endList[1]
    //     }else if(endList[0] == 'code'){
    //       code = endList[1]
    //     }
    //   }
      
    // })
    // let upCode = urlUpCode

    // if(code){
    //   this.props.postLogin({code,upCode})
    // }
    this.props.getProducts({type, page, pageSize})
  }

  
 
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
  

  


  

  render () {
    const { bannerList, currentTab } = this.state
    const { 
      leftProducts,
      rightProducts, 
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
      }
      let res = (<ProductCom  key={'product' + i} props={productProps}></ProductCom>)
      return res                             
    })

    const searchProps ={
      url:'/pages/search/index',
      changeTab:this.changeTab
    }
    
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
        < TabsCom props={tabsProps}/>
        {/* <View className='homeSearch'>
          <SearchCom props={searchProps}></SearchCom>
        </View> */}
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
