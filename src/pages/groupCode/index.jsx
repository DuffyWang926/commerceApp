import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import getUrlCode from "../../utils/getUrlCode";
import {
  getGroupImgs,
} from "../../actions/group";
import communityList from "../../constant/comunity";
import qrcode from 'qrcode'
const group0 = require("../../assets/group/group0.jpg")
const group1 = require("../../assets/group/group1.jpg")
const group2 = require("../../assets/group/group2.jpg")
const group3 = require("../../assets/group/group3.jpg")
const group4 = require("../../assets/group/group4.jpg")
const mapStateToProps = (state)=>{
  const { group } = state
  const { groupImgs } = group
  return {
    groupImgs
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    getGroupImgs:(payload)=>{
      dispatch(getGroupImgs(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  constructor(){
    super()
    this.state={
      imgSrc:'',
      type:'',
      imgId:'',
      title:'',
      sort:'',
      topCon:'',
      titleCon:'',
      footCon:'',
    }
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { sort, type } = result || {}
    let imgId = ''
    let title = ''
    Array.isArray(communityList) && communityList.forEach( (v,i) =>{
      if(i == type){
        imgId = v.communityId
        title = v.name
      }
    })
    let topCon = '闲置物品变现'
    let topSecond = ''
    let titleCon = ''
    let footCon = ''
    let footSecond = ''
    if(sort == 0){
      topCon = '闲置物品变现'
      topSecond = '淘点物美价廉的宝贝'
      titleCon = title + '闲置群'
      footCon = '偶尔有免费的'
      footSecond = '玩偶，桌子，沙发…'
    }else if( sort == 1){
      topCon = '找呀找朋友，找到灵魂伴侣'
      topSecond = ''
      titleCon = title + '相亲交友'
      footCon = '一起看山看水，享受快乐人生'

    }
    this.setState({
      type,
      imgId,
      title,
      sort,
      topCon,
      topSecond,
      titleCon,
      footCon,
      footSecond
    })
    this.getCode(type,sort)
    
  }

  getCode(type,sort){
    console.log('getCode')
    var url = 'https://mengshikejiwang.top/#/pages/group/index?type=' + type + '&sort=' + sort
    let that = this
    qrcode.toDataURL(url, function (err, qrCodeData) {
      if (err) throw err;
    
      console.log(qrCodeData);
      that.setState({
        imgSrc:qrCodeData,
      })
    });

    // qr.addData(url);
    // qr.make();
    // var qrImage = qr.createImgTag(4); // 创建二维码图像标签

    // // 将二维码图像标签插入到页面中的某个元素
    // var qrContainer = document.getElementById('qr-container'); // 替换为您要插入二维码的元素ID
    // qrContainer.innerHTML = qrImage;
  }
 

  render () {
    const { imgSrc, title, topCon,
      topSecond,
      titleCon,
      footCon, 
      footSecond,
    } = this.state
    console.log('title', title)
    
    return (
      <View className='groupCodePage'>
        <View className='codeBox'>
          <View className='codeTop'>
          {topCon}
          </View>
          <View className='codeSecond'>
          {topSecond}
          </View>
          <View className='codeTitle'>
            {titleCon}
          </View>
          <Image className='codeImg' src={imgSrc}></Image>
          <View className='codeFoot'>
          {footCon}
          </View> 
          <View className='codeSecond'>
          {footSecond}
          </View> 
        </View>
        <View className='codeBox'>
          <View className='codeTop'>
          {topCon}
          </View>
          <View className='codeSecond'>
          {topSecond}
          </View>
          <View className='codeTitle'>
            {titleCon}
          </View>
          <Image className='codeImg' src={imgSrc}></Image>
          <View className='codeFoot'>
          {footCon}
          </View> 
          <View className='codeSecond'>
          {footSecond}
          </View> 
        </View><View className='codeBox'>
          <View className='codeTop'>
          {topCon}
          </View>
          <View className='codeSecond'>
          {topSecond}
          </View>
          <View className='codeTitle'>
            {titleCon}
          </View>
          <Image className='codeImg' src={imgSrc}></Image>
          <View className='codeFoot'>
          {footCon}
          </View> 
          <View className='codeSecond'>
          {footSecond}
          </View> 
        </View><View className='codeBox'>
          <View className='codeTop'>
          {topCon}
          </View>
          <View className='codeSecond'>
          {topSecond}
          </View>
          <View className='codeTitle'>
            {titleCon}
          </View>
          <Image className='codeImg' src={imgSrc}></Image>
          <View className='codeFoot'>
          {footCon}
          </View> 
          <View className='codeSecond'>
          {footSecond}
          </View> 
        </View>
      </View>
    )
  }
}
