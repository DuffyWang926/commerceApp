import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Swiper, SwiperItem, Image} from '@tarojs/components'

import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";

const wx0 = require("../../assets/wxList/0.jpg")
const wx1 = require("../../assets/wxList/1.jpg")

const mapStateToProps = (state)=>{
  const { home } = state
  const { name } = home
    return {
      name,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
   
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props){
    super(props)
    
    
    this.state = {
      
    }
    
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { id } = result || {}
    this.setState({
      id,
    })

  }
  

  render () {
    // const { title, } = this.state
    const { productId, imgUrl, title, price, oldPrice, location, type} =  {
      title:'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
      price:3.00,
      oldPrice:5.00,
      location:'朱辛庄',
      productId:'1',
      imgUrl:'a',
    }
    const bannerList = [
      {
        url:'pages/shareGroups/index',
        imgSrc:wx0
      },
      {
        url:'pages/shareGroups/index',
        imgSrc:wx1
      },
      
    ]
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      const {imgSrc } = v
      let res = (<SwiperItem key={i + 'swiperItem'} >
      <Image src={imgSrc} className='homeImg' ></Image>
    </SwiperItem>)
      return res                             
    })

    
    
    return (
      <View className='productPage'>
        <Swiper
          className='productSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay>
          {bannerListCom}
        </Swiper>
        <View className="productDetail" >
          <View className="title" >{title}</View>
          <View className="priceBox" >
            <View className="price" >￥{price}</View>
            <View className="oldPriceBox" >
              原价 
              <span className="oldPrice" >{oldPrice}</span>
            </View>
            <View className="location" >{location}</View>
          </View>
          <View className="degree" >新旧程度：{title}</View>
          <View className="deliver" >取货方式：{title}</View>
        </View>
        <View className="productContent" >
          <View className="title" >{title}</View>
        </View>
      </View>
    )
  }
}
