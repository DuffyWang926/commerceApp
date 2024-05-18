import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image, Textarea } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";
import TapCom from "../../components/TapCom";

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

    let degreeData = [
      {
        label:'未拆封',
        value:0
      },
      {
        label:'九成新',
        value:1
      },
      {
        label:'八成新',
        value:2
      },
      {
        label:'七成新',
        value:3
      },
      {
        label:'六成新',
        value:4
      },
      {
        label:'五成新',
        value:5
      },
      {
        label:'三成新',
        value:6
      },
    ]

    let degreeList = Array.isArray(degreeData) && degreeData.map( (v,i) =>{
      v.checked = false
      return v
    })
    
    let deliverData = [
      
      {
        label:'邮寄到付',
        value:1
      },
      {
        label:'同城包邮',
        value:2
      },
      
    ]

    let deliverList = Array.isArray(deliverData) && deliverData.map( (v,i) =>{
      
      v.checked = false
      
      return v
    })

    this.state = {
      title:'',
      radioList,
      radioValue:'',
      radioItem:{},
      degreeList,
      degreeItem:{},
      deliverList,
      deliverItem:{},
      address:'',
      price:'',
      oldPrice:'',
      contact:'',
      brand:'',
      description:'',
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


  onRadioChange = (e) =>{
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

  onDegreeRadioChange = (e) =>{
    const { degreeList } = this.state
    const { value } = e.detail;
    let degreeItem = {}
    let degreeListTemp = Array.isArray(degreeList) && degreeList.map( (v,i) =>{
      if( v.value == value){
        v.checked = true
        degreeItem =v
      }else{
        v.checked = false
      }
      return v

    })
    this.setState({
      degreeList:degreeListTemp,
      degreeItem:degreeItem
    })
  }

  onDeliverRadioChange = (e) =>{
    debugger
    const { deliverList } = this.state
    const { value } = e.detail;
    let deliverItem = []

    let deliverListTemp = Array.isArray(deliverList) && deliverList.map( (v,i) =>{
      
      if( v.value == value){
        v.checked = true
        deliverItem =v
      }else{
        v.checked = false
      }

      
      return v

    })
    this.setState({
      deliverList:deliverListTemp,
      deliverItem:deliverItem
    })
  }

  inputNameChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      name:value
    })
  }

  inputTitleChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      title:value
    })
  }
  inputPriceChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      address:value
    })
  }
  inputPriceChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      price:value
    })
  }
  inputOldPriceChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      oldPrice:value
    })
  }
  inputContactChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      contact:value
    })
  }
  inputBrandChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      brand:value
    })
  }
  inputDescriptionChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      description:value
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
    const { type, radioList, imgUrl, degreeList, deliverList } = this.state
    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <Radio className='topRadio' key={v.text} value={v.value} checked={v.checked}>{v.text}</Radio>
      )
      return res
    })

    const degreeNode = Array.isArray(degreeList) && degreeList.map( (v,i) =>{
      let res = (
        <Radio className='topRadio' key={v.label} value={v.value} checked={v.checked}>{v.label}</Radio>
      )
      return res
    })

    const deliverNode = Array.isArray(deliverList) && deliverList.map( (v,i) =>{
      let res = (
        <Radio className='topRadio' key={v.label} value={v.value} checked={v.checked}>{v.label}</Radio>
      )
      return res
    })

    
    
    return (
      <View className='uploadPage'>
        <View className='uploadTop'>
          { type == 1 ?
            <View className='topItem'>
              <Text className='itemTitle'>类型：</Text>
              <RadioGroup className='itemRight' onChange={(e) =>{this.onRadioChange(e)}}>
                {radioNode}
              </RadioGroup>
            </View>
            :
            <View className='uploadDetail'>
              <View className='topItem'>
                <Text className='itemTitle'>标题：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputTitleChange(e);
                  }}
                />
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>新旧程度：</Text>
                <RadioGroup className='itemRight' onChange={(e) =>{this.onDegreeRadioChange(e)}}>
                  {degreeNode}
                </RadioGroup>
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>送货方式（可多选）：</Text>
                <Radio className='topRadio' key={'自提'} value={0} checked={true}>自提</Radio>
                <RadioGroup className='itemRight' onChange={(e) =>{this.onDeliverRadioChange(e)}}>
                  {deliverNode}
                </RadioGroup>
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>地址：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputAddressChange(e);
                  }}
                />
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>价格：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputPriceChange(e);
                  }}
                />
                （元）
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>原价：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputOldPriceChange(e);
                  }}
                />
                （元）
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>联系方式（微信号）：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputContactChange(e);
                  }}
                />
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>品牌：</Text>
                <Input
                  className='itemInput'
                  type='text'
                  onInput={(e) => {
                    this.inputBrandChange(e);
                  }}
                />
              </View>
              <View className='topItem'>
                <Text className='itemTitle'>商品描述：</Text>
                <Textarea
                  className='itemTextarea'
                  type='text'
                  onInput={(e) => {
                    this.inputDescriptionChange(e);
                  }}
                />
              </View>
            </View>
            
          }
        </View>
        <View
          className='uploadBox'
          onClick = {(e) => {
              this.onUpload(e);
            }}>
          <View className='uploadLabel'>
            <Text >上传图片（最多四张）</Text>
          </View>
          <View  className='imgBox'>
            <Image src={imgUrl} bindtap="previewImg"></Image>
          </View>
        </View>
        <TapCom ></TapCom>
        
      </View>
    )
  }
}
