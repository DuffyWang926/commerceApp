import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
const wx0 = require("../../assets/wxList/0.jpg")
const wx1 = require("../../assets/wxList/1.jpg")

const mapStateToProps = (state)=>{
  const { home } = state
  const { name } = home
    return {
      name,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
   
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props){
    super(props)
    console.log('communityList',communityList)
    let radioList = Array.isArray(communityList) && communityList.map( (v,i) =>{
      v.value = v.id
      v.text = v.name
      v.checked = false
      return v

    })
    
    this.state = {
      name:'dd',
      radioList,
      radioValue:'dd',
      theme:'dd',
      radioItem:{},
      wxList:[
        {
          name:'front1024front',
          imgSrc:wx0
        },
        {
          name:'junzibuyancai',
          imgSrc:wx1
        },
        // {
        //   name:'junzibuyancai',
        //   imgSrc:''
        // },
      ]
    }
    
  }
  

  render () {
    const { radioList, imgUrl, wxList } = this.state
    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <View className='itemName' key={v.text} >{v.text}</View>
      )
      return res
    })

    const wxListNode = Array.isArray(wxList) && wxList.map( (v,i) =>{
      let res = (
        <View className='listItem' key={i}>
          <View>wx 号：{v.name}</View>
          <View>
            <Image className='listImg' src={v.imgSrc}></Image>
          </View>
        </View>
      )
      return res
    })
    
    return (
      <View className='uploadPage'>
        <View className='uploadTop'>
          <View className='topItem'>
            <Text className='itemTitle'>已有群：</Text>
            {radioNode}
          </View>
        </View>
        <View className='shareList'>
          <View className='listLabel'>添加下面wx，拉你进群：</View>
          {wxListNode}
        </View>
      </View>
    )
  }
}
