import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";


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
      let groupList = v.groupList
      let groupId = '0'
      if(groupList && groupList.length > 0){
        let usedGoodList = groupList[0]
        let len = usedGoodList.length
        let groupObj = usedGoodList[len-1]
        groupId = groupObj.id

      }
      v.value = groupId

      v.text = v.name + groupId
      v.checked = false
      return v

    })
    
    this.state = {
      name:'dd',
      radioList,
      radioValue:'dd',
      theme:'dd',
      radioItem:{}
    }

    
  }
  


  onRadioChange = (e) =>{
    debugger
    const { radioList } = this.state
    const { value } = e.detail;
    let radioItem = {}
    let radioListTemp = Array.isArray(radioList) && radioList.map( (v,i) =>{
      if( v.value == value){
        v.checked = true
        radioItem =v
      }else{
        v.checked = false
      }
      return v

    })
    this.setState({
      radioList:radioListTemp,
      radioValue:value,
      radioItem:radioItem
    })
  }

  inputNameChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      name:value
    })
  }

  inputThemeChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      theme:value
    })
  }

  onUpload = (e) =>{
    const { radioValue, radioItem, name, theme } = this.state
    const { value, text } = radioItem || {}
    let that = this
    Taro.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album', 'camera'],
      success:  res => {
        Taro.showLoading({
          title: '上传中',
        })
        const filePath = res.tempFilePaths[0]
        // let date = parseInt(((new Date()).valueOf())/1000)
        // const cloudPath = `meme/my-image${date}${filePath.match(/\.[^.]+?$/)[0]}`
        that.setState({
          imgUrl:filePath
        })
        // const url = 'http://127.0.0.1:3000/api/upload'
        // const url = 'http://127.0.0.1:3001/api/uploadGroup'
        
        // const url = 'https://mengshikejiwang.top/taxiapi/uploadGroup'
        const url = 'http://127.0.0.1:3001/taxiapi/uploadGroup'
        
        
        Taro.uploadFile({
          url,
          filePath,
          name:'gif',
          formData:{
            type:radioValue,
            value,
            text
            
          },
          success: res => {
            console.log('[上传文件] 成功：', res)
            // app.globalData.fileID = res.fileID
            // app.globalData.cloudPath = cloudPath
            // app.globalData.imagePath = filePath
          },
          fail: e => {
            console.error('[上传文件] 失败：', e)
            Taro.showToast({
              icon: 'none',
              title: '上传失败',
            })
          },
          complete: () => {
            Taro.hideLoading()
          }
        })
      },
      fail: e => {
        console.error(e)
      }
    })
  }


  render () {
    const { radioList, imgUrl } = this.state
    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <Radio className='topRadio' key={v.text} value={v.value} checked={v.checked}>{v.text}</Radio>
      )
      return res
    })
    
    return (
      <View className='uploadPage'>
        <View className='uploadTop'>
          <View className='topItem'>
            <Text className='itemTitle'>类型：</Text>
            <RadioGroup className='itemRight' onChange={(e) =>{this.onRadioChange(e)}}>
              {radioNode}
            </RadioGroup>
          </View>
          {/* <View className='topItem'>
            <Text className='itemTitle'>名称：</Text>
            <Input
              className='itemInput'
              type='text'
              onInput={(e) => {
                this.inputNameChange(e);
              }}
            />
          </View>
          <View className='topItem'>
            <Text className='itemTitle'>主题：</Text>
            <Input
              className='itemInput'
              type='text'
              onInput={(e) => {
                this.inputThemeChange(e);
              }}
            />
          </View> */}
        </View>
        <View
          className='uploadBox'
          onClick = {(e) => {
              this.onUpload(e);
            }}>
          <View >
            <Text>上传图片</Text>
          </View>
          <View  >
            <Image src={imgUrl} bindtap="previewImg"></Image>
          </View>
        </View>
        
      </View>
    )
  }
}
