import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";



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
      radioList,
      wxList:[
        {
          name:'a1b1c1527',
        },
        {
          name:'a47124988273',
        },
        
      ]
    }
    
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { type } = result || {}
    console.log('type',type)
    this.setState({
      type,
    })

  }
  

  render () {
    const { radioList, wxList, type } = this.state
    const title = '闲置群'
    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <Text className='itemName' key={v.text} >{v.text}</Text>
      )
      return res
    })

    const wxListNode = Array.isArray(wxList) && wxList.map( (v,i) =>{
      let res = (
        <View className='listItem' key={i}>
          <View>wx 号：{v.name}</View>
          <View>
            <Image className='listImg' src={v.imgSrc} mode="aspectFit"></Image>
          </View>
        </View>
      )
      return res
    })
    
    return (
      <View className='shareGroupsPage'>
        <View className='shareGroupsTitle'>
          {title}
        </View>
        <View className='uploadTop'>
          <View className='topItem'>
            <Text className='itemTitle'>已有群：</Text>
            <View >
              {radioNode}
            </View>
            
          </View>
        </View>
        { type != 0 &&
          <View className='shareList'>
            <View className='listLabel'>添加下面wx，拉你进群（广告勿扰）：</View>
            <View className='listBox'>{wxListNode}</View>
          </View>
        
        }
        
      </View>
    )
  }
}
