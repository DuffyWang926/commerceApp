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
const group0 = require("../../assets/group/group0.jpg")
const group1 = require("../../assets/group/group1.jpg")
const group2 = require("../../assets/group/group2.jpg")
const group3 = require("../../assets/group/group3.jpg")
const group4 = require("../../assets/group/group4.jpg")
const group5 = require("../../assets/group/group5.jpg")
const friendGroup0 = require("../../assets/friends/friend0.jpg")
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
      titie:'',
    }
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { sort, type } = result || {}
    let imgId = ''

    Array.isArray(communityList) && communityList.forEach( (v,i) =>{
      if(i == type){
        const { groupList } = v
        let groupIndex = sort || 0
        Array.isArray(groupList) && groupList.forEach( (item,index) =>{ 
          if(index == groupIndex){
            let sortId = '0'
            if(item && item.length > 0){
              let len = item.length
              let sonObj = item[len -1]
              sortId = sonObj.id
            console.log('groupSort', sonObj, sonObj.id)
            }
            
            imgId = sortId

          }
        })
        
      }
    })
    
    this.props.getGroupImgs()


    let imgList = [ group0, group1, group2, group3, group4, group5 ]
    let friendList = [ friendGroup0 ]
    let imgSrc = ''
    let title = ''
    if(sort == 0){
      if(type < imgList.length){
        imgSrc = imgList[type]
      }
      title = '闲置群'

    }else if(sort == 1){
      if(type < friendList.length){
        imgSrc = friendList[type]
      }
      title = '相亲交友群'

    }else{
      if(type < imgList.length){
        imgSrc = imgList[type]
      }
      title = '闲置群'
    }
    
    this.setState({
      type,
      imgId,
      imgSrc,
      title,
    })
    
  }

  
 

  render () {
    const { imgSrc, imgId, title } = this.state
    const {                                   } = this.props
    console.log('groupImgs',groupImgs)
    console.log('imgId',imgId)
    let imgUrl = ''
    // if(groupImgs && groupImgs.length > 0){
    //   groupImgs.forEach( (v) =>{
    //     if(v.imgId == imgId){
    //       imgUrl = v.imgUrl
    //     }
    //   })
    // }
    if(!imgUrl){
      imgUrl = imgSrc
    }
    console.log('imgUrl',imgUrl)
    return (
      <View className='group'>
        
        <Image className='groupMid' src={imgUrl}></Image>
        <View className='groupCover'>
          {title}
        </View>
        <View className='coverFoot'>
        </View>
      </View>
    )
  }
}
