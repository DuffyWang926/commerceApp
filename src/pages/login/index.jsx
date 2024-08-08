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

    const { oldUrl = '/pages/mine/index', upCode } = this.state
    let redirectUrl = 'https://www.mengshikejiwang.top/#' + oldUrl + '?upCode=' + upCode
    console.log('redirectUrl', redirectUrl)
    let REDIRECT_URI = encodeURIComponent(redirectUrl)
    console.log('REDIRECT_URI', REDIRECT_URI)
    
    return (
      <View className='login'>
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
            <span className='recommendTip'>填写推荐码(推荐人的ID)会有更多积分</span>
          </View>
        </View>
        <View className='loginBtn' onClick={this.onLogin}>
          <Text>登录/注册</Text>
        </View>
      </View>
    )
  }
}
