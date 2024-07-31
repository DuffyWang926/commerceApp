import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text, Swiper, SwiperItem, Image } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";

import { history } from '@tarojs/router'
import getUrlCode from "../../utils/getUrlCode";
import {
  getGroupImgs,
} from "../../actions/group";
import communityList from "../../constant/comunity";

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

    let title = ''
    if(sort == 0){
      title = '闲置群'

    }else if(sort == 1){
      title = '相亲交友群'

    }else{
      
      title = '闲置群'
    }
    
    this.setState({
      type,
      imgId,
      title,
    })
    
  }

  
 

  render () {
    const { imgId, title } = this.state
    const { groupImgs, } = this.props
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
    
    return (
      <View className='group'>
        <View className='groupCover'>
          {title}
        </View>
        <Image className='groupMid' src={imgUrl}></Image>
        
        
      </View>
    )
  }
}
