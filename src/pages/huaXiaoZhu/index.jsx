import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import getUrlCode from "../../utils/getUrlCode";
import {
  postLogin,
  recordTime
} from "../../actions/home";
import BuyBtn from '../../components/BuyBtn'
import OrderTipCom from '../../components/OrderTipCom'

const bannerImg = require("../../assets/banner/banner4.jpg")
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
    let code = getUrlCode(url)
    if(code){
      this.props.postLogin({code})
    }
  }

  onRedClick = () =>{
    const { userId } = this.props
    const { path } = getCurrentInstance()?.router || {};
    if(!userId){
      let url = 'pages/login/index?oldUrl=' + path
      Taro.navigateTo({
        url
      })
    }else{
      let clickTime = new Date().getTime() + ''
      this.props.recordTime({userId, clickTime})
      let url = 
      window.location.href = url
    }
  }
  

  render () {
    const title = '花小猪'
    const btnProps = {
      msg:'领红包打车',
      url:"https://activity01.yunzhanxinxi.com/link/442716629117e2144d5eaec13352fb14"
    }
    return (
      <View className='eLeMe'>
        <View className='eLeMeTop'>
          {title}
        </View>
        <Image className='pageBanner' src={bannerImg}></Image>
        <OrderTipCom />
        <BuyBtn data={btnProps} />
      </View>
    )
  }
}
