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
const bannerImg = require("../../assets/banner/banner7.jpg")
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

 

  

  render () {
    const title = '充电费'
    const btnProps = {
      msg:'公众号下单享优惠',
      url:"https://activity01.yunzhanxinxi.com/link/68b1e80d30b996baea1acb9200ec5b01"

    }
    return (
      <View className='dianFei'>
        <View className='eLeMeTop'>
          {title}
        </View>
        <Image className='dianFeiMid' src={bannerImg}></Image>
        <BuyBtn data={btnProps} />
        
      </View>
    )
  }
}
