import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, AdCustom , SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import TapCom from "../../components/TapCom";
import {
  changeHomeData,
  postLogin

} from "../../actions/home";

const portraitImg = require("../../assets/portrait.svg")
const clientImg = require("../../assets/icon/clientService.svg")
import getUrlCode from "../../utils/getUrlCode";
// let welfareAd = null

const mapStateToProps = (state)=>{
  const { home } = state
  const { userInfo = {},   } = home
  const { nickName, headUrl, openid, upCode, userId, points, groupId } = userInfo
  
    return {
      nickName,
      headUrl,
      openid,
      id:userId,
      upCode,
      points,
      groupId
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    },
    
    
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props){
    super(props)
    const { userId } = props
    let url = window.location.href
    let code = getUrlCode(url) || ''
    if(code && !userId){
      props.postLogin({ code, upCode})
    }
    this.state={
      welfareAd:null

    }


  }

  componentDidMount(){
    if(wx.createRewardedVideoAd){
      let welfareAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-42f84a2e7096666f' })
      welfareAd.onLoad(() => {
        console.log('onLoad event emit111')
      })
      welfareAd.onError((err) => {
        console.log('onError event emit', err)
      })
      this.setState({
        welfareAd
      })
      
    }
    
    this.props.changeHomeData({ tapCurrent:2})
    
  }

  

  loginClick = async () =>{
    // wx.login({
    //   success: res => {
    //       this.props.postLogin({
    //         code:res.code,
    //       })
    //   }
    // });
    const { path } = getCurrentInstance()?.router || {};
    let url = '/pages/login/index?oldUrl=' + path
    Taro.navigateTo({
      url
    })

  }

  withdraw = () =>{
    let url = 'pages/withdraw/index'
    if(5 >= 5){
      Taro.navigateTo({
        url
      })
    }else{
      Taro.showToast({
        title:'提示',
        content:'余额超过5元才可提现'
      })
    }
  }

  onShare = () =>{
    let url = 'pages/share/index'
    Taro.navigateTo({
      url
    })
  }

  onClientService = () =>{
    let url = '/pages/clientService/index'
    Taro.navigateTo({
      url
    })
  }

  onMyGoods = () =>{
    let url = '/pages/myproducts/index'
    Taro.navigateTo({
      url
    })
  }

  onWelfare = () =>{
    const { welfareAd } = this.state
    let url = '/module/welfare/index'
    Taro.navigateTo({
      url
    })

    welfareAd.show()
    .catch(() => {
        welfareAd.load()
        .then(() => welfareAd.show())
        .catch(err => {
          console.log('onError1 event emit', err)
          Taro.navigateTo({
            url
          })
        })
    })
    welfareAd.onClose(res => {
        if (res && res.isEnded) {
          console.log('onError 2')
          Taro.navigateTo({
            url
          })
        } else {
          // 播放中途退出，不下发游戏奖励
          
        }
    })
    
  }

  

  onRecommend = () =>{
    const { path } = getCurrentInstance()?.router || {};
    let url = '/pages/login/index?oldUrl=' + path
    Taro.navigateTo({
      url
    })
  }

  adLoad = e => {
    console.log('广告加载成功', e);
  };

  adError = e => {
    console.error('广告加载失败', e);
  };

  adClose = e => {
    console.log('广告关闭', e);
  };

  render () {
    const { nickName, headUrl, upCode, id, points, groupId } = this.props
    let portraitImgSrc = headUrl || portraitImg
    return (
      <View className='mine'>
        {/* <View className='mineTop'>
          我的
        </View> */}
        <View className='mineInfoBox'>
          <View className='mineInfoLeft'>
            <Image className='mineImg' src={portraitImgSrc}></Image>
            <View className='mineInfo'>
              {/* { nickName ? <View onClick={() =>{ this.loginClick()}}>{nickName}</View>
              : <View onClick={() =>{ this.loginClick()}} className='homeButton' >点击登录</View>
              } */}
              { !id && <View onClick={() =>{ this.loginClick()}} className='homeButton' >点击登录</View>
              }
              <View>昵称:{nickName}</View>
              <View>ID:{id}</View>
              <View onClick={this.onRecommend}>推荐人:{upCode}</View>
            </View>
          </View>
          {/* <View className='mineInfoRight' onClick={this.onShare}>
            <Image className='mineShareImg' ></Image>
            <View>分享赚积分</View>
          </View> */}
          
        </View>
        <View className='mineMoney'>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              金币
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              0.00
            </View>
            <View className='moneyTitle'>
              代金券
            </View>
          </View>
          <View className='moneyType'>
            <View className='moneySum'>
              { points || 0.00}
            </View>
            <View className='moneyTitle'>
              总积分
            </View>
          </View>
        </View>
        <View className='myTools'>
          <View className='toolItem'>
            <Text className='homeButton' onClick={this.onMyGoods}>我的商品</Text>
          </View>
          { groupId && 
          <View className='toolItem'>
            <Text className='homeButton' onClick={this.onWelfare}>福利</Text>
          </View>
          }
          

        </View>
        <View className="ad">
          <AdCustom 
            unitId="adunit-5ef97e641064d7eb" 
            onLoad={this.adLoad} 
            onError={this.adError} 
            onClose={this.adClose} 
          />
        </View>
        {/* <View className='wallet'>
          <View className='walletMoneyBox'>
            <Image className='walletMoney' ></Image>
            <View className='moneyType'>
              <View className='moneySum'>
                0.00
              </View>
              <View className='moneytitle'>
                我的余额
              </View>
            </View>
          </View>
          <View className='withdraw' onClick={ () =>{this.withdraw()}}>
            提现
          </View>

        </View> */}
        {/* <View className='clientService' onClick={this.onClientService}>
          <Image className='mineClientImg' src={clientImg}></Image>
          <View>
            客服
          </View>
        </View> */}
        <TapCom ></TapCom>
       
      </View>
    )
  }
}
