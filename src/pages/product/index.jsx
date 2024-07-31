import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Swiper, RadioGroup, Radio, SwiperItem, Text, Image} from '@tarojs/components'

import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";
import {
  reportProduct,
} from "../../actions/product";

const mapStateToProps = (state)=>{
  const { product } = state
  const { products } = product
    return {
      products,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    reportProduct:(payload)=>{
      dispatch(reportProduct(payload));
    },
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
    
    let degreeData = [
      {
        label:'未拆封',
        value:0
      },
      {
        label:'九成新',
        value:1
      },
      {
        label:'八成新',
        value:2
      },
      {
        label:'七成新',
        value:3
      },
      {
        label:'六成新',
        value:4
      },
      {
        label:'五成新',
        value:5
      },
      {
        label:'三成新',
        value:6
      },
    ]
    let deliverData = [
      
      {
        label:'邮寄到付',
        value:1
      },
      {
        label:'同城包邮',
        value:2
      },
      
    ]
    this.state = {
      isReport:false,
      isContact:false,
      radioList,
      radioItem:{},
      productItem:{},
      degreeData,
      deliverData
    }
    
  }
  componentDidMount(){
    const { products} = this.props
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { id } = result || {}
    let productList = products.filter(product => product.id == id);
    if(productList.length > 0){
      this.setState({
        id,
        productItem:productList[0],
        
      })

    }
    console.log('id',id)
    console.log('productItem',productList[0])
    

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
    const { id, radioItem } = this.state
    this.setState({
      isReport:false
    })
    this.props.reportProduct(
      {
        id,
        reason:radioItem.label
      }
     )

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
    const { isReport, radioList, isContact, productItem, degreeData, deliverData } = this.state
    const { imgList, title, price, oldPrice, address, degree, city, deliver, description, contact} =  productItem
    const bannerListCom = Array.isArray(imgList) && imgList.map( (v,i) =>{
      console.log('imgList', v)
      let res = (<SwiperItem key={i + 'swiperItem'} >
      <Image src={v} className=' productImg' mode="aspectFit"></Image>
    </SwiperItem>)
      return res                             
    })
    let degreeVal = ''
    Array.isArray(degreeData) && degreeData.map( (v,i) =>{
      if(v.value = degree){
        degreeVal =  v.label
      }
    })

    let deliverVal = ''

    Array.isArray(deliverData) && deliverData.map( (v,i) =>{
      if(v.value = deliver){
        deliverVal =  v.label
      }
    })
    deliverVal = '自提，' + deliverVal

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
          <View className="detailTop" >
            <View className="title" >{title}</View>
            <View className="priceBox" >
              <View className="price" >￥{price}</View>
              <View className="oldPriceBox" >
                原价 
                <Text className="oldPrice" >{oldPrice}</Text>
              </View>
            </View>
            <View className="degree" >新旧程度：{degreeVal}</View>
          </View>
          
          <View className="detailMid" >
            <View className="deliver" >取货方式：{deliverVal}</View>
            <View className="location" >城市：{city}</View>
            <View className="deliver" >自提地址：{address}</View>
          </View>
          
        </View>
        <View className="productContent" >
          <View className="description" > 商品详情：{description}</View>
        </View>
        <View className="productFoot" >
          <View className="report" onClick={this.onReport} >举报</View>
          <View className="contact" onClick={this.onContact} >微信号
            { isContact && 
            <Text className='contactId'>WX:{contact}</Text>
            
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
