import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import getUrlCode from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime
} from "../../actions/home";
import BuyBtn from '../../components/BuyBtn'
import OrderTipCom from '../../components/OrderTipCom'
const group1 = require("../../assets/group1.jpg")
const group2 = require("../../assets/group2.jpg")
const group3 = require("../../assets/group3.jpg")
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId } = home
  return {
    userId
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    recordTime:(payload)=>{
      dispatch(recordTime(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url)
    const { code, type } = result || {}
    // if(code){
    //   this.props.postLogin({code})
    // }
    let imgList = [ group1, group2, group3 ]
    let imgSrc = ''
    if(type < imgList.length){
      imgSrc = imgList[type]
    }
    this.setState({
      imgSrc
    })
    
  }
 

  render () {
    const title = '饿了么'
    const btnProps = {
      msg:'领红包点外卖',
      url:"https://activity01.yunzhanxinxi.com/link/a0750efe9f833c5633140d2b4f29c0dd"
    }
    return (
      <View className='group'>
        
        <Image className='groupMid' src={group1}></Image>
        <View className='groupCover'>
          闲置群
        </View>
        <View className='coverFoot'>
        </View>
      </View>
    )
  }
}
