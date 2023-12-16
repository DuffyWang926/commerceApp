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
const group1 = require("../../assets/group1.jpg")
const group2 = require("../../assets/group2.jpg")
const group3 = require("../../assets/group3.jpg")
const group4 = require("../../assets/group4.jpg")
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
    }
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { code, type } = result || {}
    let imgId = ''
    Array.isArray(communityList) && communityList.forEach( (v,i) =>{
      if(i == type){
        imgId = v.id
      }
    })
    this.setState({
      type,
      imgId,
    })
    this.props.getGroupImgs()


    let imgList = [ group1, group2, group3, group4 ]
    let imgSrc = ''
    if(type < imgList.length){
      imgSrc = imgList[type]
    }
    this.setState({
      imgSrc
    })
    
  }
 

  render () {
    const { imgSrc, imgId } = this.state
    const { groupImgs } = this.props
    console.log('groupImgs',groupImgs)
    console.log('imgId',imgId)
    let imgUrl = ''
    if(groupImgs && groupImgs.length > 0){
      groupImgs.forEach( (v) =>{
        if(v.imgId == imgId){
          imgUrl = v.imgUrl
        }
      })
    }
    if(!imgUrl){
      imgUrl = imgSrc
    }
    console.log('imgUrl',imgUrl)
    return (
      <View className='group'>
        
        <Image className='groupMid' src={imgUrl}></Image>
        <View className='groupCover'>
          闲置群
        </View>
        <View className='coverFoot'>
        </View>
      </View>
    )
  }
}
