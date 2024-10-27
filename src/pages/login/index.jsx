import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'

import { View, Input, Image, Text, RadioGroup, Radio } from '@tarojs/components'
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
      upCode:'',
      radioChecked:false,
      groupId:''
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

  onGroupChange = (e) =>{
    let val = e.target.value
    this.setState({
      groupId:val
    })
  }

  
  onLogin= () =>{
    const { upCode, radioChecked , groupId, oldUrl } = this.state
    console.log('groupId',groupId)
    let that = this
    let groupFlag = true
    if(groupId){
      if(groupId == '10002' ){
        groupFlag = true

      }else{
        groupFlag = false
        Taro.showModal({
          title: '提示',
          content: '请填写正确的群Id或者清空。',
          showCancel: true, // 是否显示取消按钮，默认为 true
          cancelText: '取消', // 取消按钮的文字，默认为"取消"
          cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
          confirmText: '确定', // 确定按钮的文字，默认为"确认"
          confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
        }).then((res) => {
            if (res.confirm) {
              
            } else if (res.cancel) {
                console.log('用户点击了“取消”')
            }
        })
  
      }
        
    }
    if(groupFlag){
      if(radioChecked ){
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
                      upCode,
                      groupId,
                      oldUrl
                    })
                    
                }
            });
          }
        })
  
      }else{
        Taro.showModal({
          title: '提示',
          content: '同意用户协议和隐私政策，继续注册/登录',
          showCancel: true, // 是否显示取消按钮，默认为 true
          cancelText: '取消', // 取消按钮的文字，默认为"取消"
          cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
          confirmText: '确定', // 确定按钮的文字，默认为"确认"
          confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
        }).then((res) => {
            if (res.confirm) {
              this.setState({
                radioChecked:true,
              })
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
                            upCode,
                            groupId,
                            oldUrl
                          })
                          
                      }
                  });
                }
              })
            } else if (res.cancel) {
                console.log('用户点击了“取消”')
            }
        })
  
      }

    }
    
    

    
  }

  toControl = () =>{
    Taro.navigateTo({
      url:'/module/tips/pages/index?type=0'
    });
  }

  toPrivate = () =>{
    Taro.navigateTo({
      url:'/module/tips/pages/index?type=1'
    });
  }

  onRadioChange = (e) =>{
    const { radioChecked } = this.state
    const { value } = e.detail;
    console.log('radioChecked', radioChecked)
    console.log('radioChecked', e)
    
    this.setState({
      radioChecked:!radioChecked,
    })
  }

  

  render () {

    const { oldUrl = '/pages/mine/index', upCode, radioChecked, groupId } = this.state
    let redirectUrl = 'https://www.mengshikejiwang.top/#' + oldUrl + '?upCode=' + upCode
    let REDIRECT_URI = encodeURIComponent(redirectUrl)
    
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
          <Text className='recommendLabel' >推荐码（非必填）:</Text>
          <View >
            <Input onInput={this.onInputChange} value={upCode} className="recommendInput"></Input>
            <span className='recommendTip'>填写推荐码(推荐人的ID)会有更多积分</span>
          </View>
        </View>
        <View className='recommend' >
          <Text className='recommendLabel'>群Id（非必填）:</Text>
          <View >
            <Input onInput={this.onGroupChange} value={groupId} className="recommendInput"></Input>
          </View>
        </View>
        <View className='policy' >
          <RadioGroup className='policyRadio' onClick={(e) =>{this.onRadioChange(e)}}>
            <Radio className='policyRadio'  value={'0'} checked={radioChecked}>
            <Text >请仔细阅读并同意</Text>
            <Text className='policyTxt' onClick={this.toControl}>
            《用户服务协议》
            </Text>
            <Text>和</Text>
            <Text className='policyTxt'onClick={this.toPrivate}>
            《隐私政策》
            </Text>
            </Radio>
          </RadioGroup>
          
        </View>
        <View className='loginBtn' onClick={this.onLogin}>
          <Text>登录/注册</Text>
        </View>
      </View>
    )
  }
}
