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
import FootBuy from '../../components/FootBuy'
import OrderTipCom from '../../components/OrderTipCom'
const bannerImgA = require("../../assets/banner/banner2.png")
const bannerImgB = require("../../assets/meiTuan/banner1.jpg")
const footImgB = require("../../assets/meiTuan/shengXian.png")
const footImgC = require("../../assets/meiTuan/pinZhi.jpg")
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
    const title = '美团'
    const btnProps = {
      msg:'领红包点外卖',
      url:"https://activity01.yunzhanxinxi.com/link/426441e5060dafbf0a675c0c19a3b74a"
    }
    const bannerList = [
      bannerImgA,
      bannerImgB

    ]
    const bannerListCom = Array.isArray(bannerList) && bannerList.map( (v,i) =>{
      let res = (<SwiperItem key='SwiperItem1' key={i + 'swiperItem'} >
                  <Image src={v} className='pageSwiperImg' ></Image>
                </SwiperItem>)
      return res
    })
    
    let footListData = [
      {
        src:footImgB,
        url:'https://click.meituan.com/t?t=1&c=1&p=OWMpZ-uzIFOVe6JyOONs3esj-lLUjknAmqBQEpBWwlnuPZfCppYZHBBh9NdRP6Jo8cjecfEG5uCJ6ZaxLhBmF0riSLJOuDNQxsRLqeBtH9vcnKbO_6BbEQjMaI-1dUEuQ7A3zD0j9bz8M5Y7jlkolY8FzYnEsaWmtoLuI-En_gaxQejx-zyO05U1uCqJEa3LJpciH_y_yK5F5X0NjKFXDOfJAzoA6KJEGeQ_eYBdfqsNuZnEhKnip1kzrXKhEvA2L5WyRoLYKfzrhOroVwnhd9XrS10pLNoZkUKzpKOVOvVp_Puc6Tl4tYw41-VDEuDASxc8pGxdThFv9CHvkYVQI94xukGohsQwMp5QjaeN7N62Jr0OURRXzxTPfIJJwwGon1lH9D5Rjp9PDgL7OQMpEGDyhQMdv2AmeZ4LlRyUOnAfiJDnQTe-QDF1o2rA9eEQXimbBgdJAzkXIRkSvXzMSKGGc4Q_pa-ymh2ogyKOpTjN7Fbe0j3pnOpIFuyPuA1I4CptD7nJL1p3K4HHlggtE3GGLJHnpDWnRIDG2sEtbiYyJLRkCq2lreYvTX7znZ_mE47FaaxHjw05zrhcS-a6eg'
      },
      {
        src:footImgC,
        url:'https://click.meituan.com/t?t=1&c=1&p=OWMpZ-uzIFOVe6JyOONs3SG8qCjMvAV4GNx103fVUTQo3bcm1lmzd-wpeKJ2vn5gjXv5yEW8d6oAot4xbB6QR2s_yBIEH440EUjTFTadEGu1T3IXftfw8Zo0QRYTGaSk2VZayqyWaNQWXeN0iI1sZBJF1q9k2V0aXuNTBP6CJhpkb6EEHrszx17fddUndoXeLfIPxRToMK6DBxy_MhU6Ch3yI5332u3quIQ3HreRzY7E_DaOPCoPK-KAXOzonqjVUW2FcJiLZzhIG86i7L5Wtd2z1wPh37Hy9BNNx9DMyu9e1dTGeMVD8EyiEKXJ3hPaw8prQJHne-BNmKqFgssB0rwS3IQANFylmtI3nK-1B_mtOI7M7wkYUS-Tl0uEetBJn7XmAwGo-iR9Vw9ADh1bU0yfpXhUtddvP09PrKzBJzsXfQ5H-970ju0-n_iFMoE5NXbzHo_fRsZvOJULQvLX0h0x0iFauhlqxophylYf94PohnNAKbVB19BX6ghW7Fx4u-h9CqFM_s1b7mC8fKTLg8MbKgH0uqi7pMd49hSivrpd_NH3MSPfBd8acoqTovhWziki5Tf_OUZaJ8GODhC24w'
      }
    ]
    let buyData = {
      list:footListData
    }
    return (
      <View className='meiTuanPage'>
        <View className='pageTitle'>
          {title}
        </View>
        <Swiper
          className='pageSwiper'
          indicatorColor='#999'
          indicatorActiveColor='#333'
          vertical={false}
          circular
          indicatorDots
          autoplay
          >
          {bannerListCom}
        </Swiper>
        <OrderTipCom />
        <BuyBtn data={btnProps} />
        <FootBuy data={buyData}/>
        
      </View>
    )
  }
}
