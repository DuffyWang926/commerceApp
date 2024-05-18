import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Swiper, RadioGroup, Radio, SwiperItem, Text, Image} from '@tarojs/components'

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
    
    const radioList = [
      {
        label:'商品和图片不符',
        value:0
      },
      {
        label:'实际价格比页面价格贵',
        value:1
      },
      {
        label:'是商家',
        value:2
      },
      {
        label:'是营销号',
        value:3
      },
    ]
    
    this.state = {
      isReport:false,
      isContact:false,
      radioList,
      radioItem:{},
      
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
  onReport = () =>{
    this.setState({
      isReport:true
    })
  }
  onContact = () =>{
    this.setState({
      isContact:true
    })
  }
  
  cancelReport = () =>{
    this.setState({
      isReport:false
    })
  }

  confirmReport = () =>{
    this.setState({
      isReport:false
    })
  }
  
  onRadioChange = (e) =>{
    const { radioList } = this.state
    const { value } = e.detail;
    let radioItem = {}
    let radioListTemp = Array.isArray(radioList) && radioList.map( (v,i) =>{
      if( v.value == value){
        v.checked = true
        radioItem =v
      }else{
        v.checked = false
      }
      return v

    })
    this.setState({
      radioList:radioListTemp,
      radioItem:radioItem
    })
  }

  render () {
    const { isReport, radioList, isContact } = this.state
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
      <Image src={imgSrc} className=' productImg' ></Image>
    </SwiperItem>)
      return res                             
    })

    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <Radio className='topRadio' key={v.label} value={v.value} checked={v.checked}>{v.label}</Radio>
      )
      return res
    })
    
    return (
      <View className='productPage'>
        <Swiper
          className='productSwiper'
          indicatorColor='#333'
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
          <View className="deliver" >自提地址：{title}</View>
        </View>
        <View className="productContent" >
          <View className="title" >{title}</View>
        </View>
        <View className="productFoot" >
          <View className="report" onClick={this.onReport} >举报</View>
          <View className="contact" onClick={this.onContact} >微信号
            { isContact && 
            <Text className='contactId'>WX</Text>
            
            }
          </View>
          { isReport && <View className="reportDetail"  >
              <RadioGroup className='reportBox' onChange={(e) =>{this.onRadioChange(e)}}>
                {radioNode}
              </RadioGroup>
              <View className='reportFoot'>
                <Text className='homeButton' onClick={this.cancelReport}>取消</Text>
                <Text className='homeButton' onClick={this.confirmReport}>确定</Text>
              </View>
              </View>
          }
        </View>

      </View>
    )
  }
}
