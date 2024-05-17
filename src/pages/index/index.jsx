import { Component } from 'react'
import Taro from "@tarojs/taro";
import { View, TabBar, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";

// import { AtTabBar } from "taro-ui";
import SearchCom from "../../components/SearchCom";
import HomeItem from "../../components/HomeItem";
import TapCom from "../../components/TapCom";
import ProductCom from "../../components/ProductCom";
const bannerImgA = require("../../assets/banner/banner1.png")


const homeImg = require("../../assets/thanks.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { itemList, tapCurrent } = home
    return {
      itemList,
      tapCurrent
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
      bannerCurrent:0
    }
  }

  componentDidMount(){
    let url = window.location.href
    let code = ''
    let nextList = url.split('?')
    let nextUrl = nextList.length > 0 && nextList[1]
    let paramsList = nextUrl && nextUrl.split('&')
    let urlUpCode = ''
    Array.isArray(paramsList) && paramsList.map( (v,i) =>{
      let endList = v && v.split('=')
      if(endList.length > 0){
        if(endList[0] == 'upCode'){
          urlUpCode = endList[1]
        }else if(endList[0] == 'code'){
          code = endList[1]
        }
      }
      
    })
    let upCode = sessionStorage.getItem('upCode') || urlUpCode

    if(code){
      this.props.postLogin({code,upCode})
    }
  }

  
 
  changeTab= ()=>{
    this.props.changeHomeData({ tapCurrent:1})
  }
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

  


  

  render () {
    const { bannerList } = this.state
    
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
    const productProps = {
      title:'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
      price:3.00,
      oldPrice:5.00,
      location:'朱辛庄',
      productId:'1',
      imgUrl:'a',
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
          indicatorDots
          autoplay>
          {bannerListCom}
        </Swiper>
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
          <ProductCom props={productProps}></ProductCom>
        </View>
        
        <TapCom ></TapCom>
      </View>
    )
  }
}
