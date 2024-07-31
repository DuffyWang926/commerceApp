import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { View, Input, Image, Text } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import {
  postLogin
} from "../../actions/home";
import getUrlCode from "../../utils/getUrlCode";

const logoImg = require("../../assets/logo/logo.jpg")
const mapStateToProps = (state)=>{
  
    return {
      
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(){
    super()
    const { oldUrl } = getCurrentInstance()?.router?.params || {};
    this.state={
      oldUrl,
      upCode:''
    }
  }

  componentDidMount(){
    let url = window.location.href
    let nextList = url.split('?')
    let nextUrl = nextList.length > 0 && nextList[1]
    let paramsList = nextUrl && nextUrl.split('&')
    let upCode = ''
    Array.isArray(paramsList) && paramsList.map( (v,i) =>{
      let endList = v && v.split('=')
      if(endList.length > 0){
        if(endList[0] == 'upCode'){
          upCode = endList[1]
        }
      }
      
    })
    this.setState({
      upCode
    })
    
  }

  

  onInputChange = (e) =>{
    let val = e.target.value
    this.setState({
      upCode:val
    })
  }
  onLogin= () =>{
    const { upCode } = this.state
    console.log('upCode',upCode)
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log('res',res)
        let userInfo = res && res.userInfo
        const { 
          avatarUrl,
          city,
          gender,
          nickName,
          province,
        } = userInfo
        wx.login({
            success: res => {
                // 发送 res.code 到后台换取 openId, sessionKey, unionId（需要后端配合）
                console.log('res',res)
                this.props.postLogin({
                  code:res.code,
                  avatarUrl,
                  city,
                  gender,
                  nickName,
                  province,
                  upCode
                })
                
            }
        });
      }
    })

    
  }

  

  render () {

    // let appid = 'wxe52a97ff5cbcfc9a'
    // let redirectUrl = 'https://www.mengshikejiwang.top/#/pages/mine/index'
    // let encodeUrl = encodeURIComponent(redirectUrl)
    // let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${encodeUrl}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`

    // const { oldUrl = '/pages/index/index', upCode } = this.state
    const { oldUrl = '/pages/mine/index', upCode } = this.state
    let redirectUrl = 'https://www.mengshikejiwang.top/#' + oldUrl + '?upCode=' + upCode
    console.log('redirectUrl', redirectUrl)
    let REDIRECT_URI = encodeURIComponent(redirectUrl)
    console.log('REDIRECT_URI', REDIRECT_URI)
    // let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe52a97ff5cbcfc9a&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
    // let url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe52a97ff5cbcfc9a&redirect_uri=https%3A%2F%2Fwww.mengshikejiwang.top%2F%23%2Fpages%2Fmine%2Findex&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect'
    let url = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxe52a97ff5cbcfc9a&redirect_uri=${REDIRECT_URI}&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect`
    
    return (
      <View className='login'>
        {/* <View className='loginTop'>
          登录
        </View> */}
        <View className='loginMid'>
          <Image className='midImg' src={logoImg} ></Image>
          <View className='midTitle'>
            闲置物品变现，淘点实惠宝贝
          </View>
          <View className='midTip'>
            让明天的生活更美好！
          </View>
        </View>
        <View className='recommend' >
          <Text>推荐码:</Text>
          <View >
            <Input onInput={this.onInputChange} value={upCode} className="recommendInput"></Input>
            {/* <span className='recommendTip'>填写推荐码(推荐人的ID)会有更多佣金</span> */}
          </View>
        </View>
        <View className='loginBtn' onClick={this.onLogin}>
          {/* <a href={url} className='loginText'>微信登录</a> */}
          <Text>登录</Text>
        </View>
      </View>
    )
  }
}
