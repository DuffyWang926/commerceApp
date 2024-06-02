import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image, Textarea, CheckboxGroup, Checkbox } from '@tarojs/components'
// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";
import TapCom from "../../components/TapCom";
import {
  publishProduct,
} from "../../actions/product";
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId } = home
    return {
      userId,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    publishProduct:(payload)=>{
      dispatch(publishProduct(payload));
    },
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
      deliverItem:[0],
      address:'',
      price:'',
      oldPrice:'',
      contact:'',
      brand:'',
      description:'',
      uploadedList:[],
      imgUrlList:[],
    }

    
  }
  componentDidMount(){
    const { userId } = this.props
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { type } = result || {}
    console.log('type',type)
    this.setState({
      type,
    })
    if(!userId){
      Taro.showModal({
        title: '提示',
        content: '请先登录',
        showCancel: true, // 是否显示取消按钮，默认为 true
        cancelText: '取消', // 取消按钮的文字，默认为"取消"
        cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
        confirmText: '确定', // 确定按钮的文字，默认为"确认"
        confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
      }).then((res) => {
          if (res.confirm) {
            const { path } = getCurrentInstance()?.router || {};
            let url = '/pages/login/index?oldUrl=' + path
            Taro.navigateTo({
              url
            })
          } else if (res.cancel) {
              console.log('用户点击了“取消”')
          }
      })

    }


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
    const { value } = e.detail;
    this.setState({
      deliverItem:value
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
  inputAddressChange = (e) =>{
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
  validForm = () =>{
    
  }

  onUpload = (e) =>{
    const { 
      type, 
      radioValue, 
      radioItem, 
      uploadedList,
      title,
      degreeItem={},
      address,
      price,
      oldPrice,
      contact,
      brand,
      description,
      imgUrlList,
     } = this.state
    const { value, text } = radioItem || {}
    let that = this
    let len = uploadedList && uploadedList.length
    let uploadUrl = ''
    let formData = {}
    if(type ==1){
      uploadUrl = BASE_URL + '/uploadGroup'
      formData= {
        type:radioValue,
        value,
        text
      }
    }else{
      uploadUrl = BASE_URL + '/upload'
      formData= {
        title,
        degree:degreeItem.value,
        address,
        price,
        oldPrice,
        contact,
        brand,
        description,
      }
    }
    if(len > 3){
      Taro.showModal({
        title: '提示',
        content: '只能上传四张',
        showCancel: true, // 是否显示取消按钮，默认为 true
        cancelText: '取消', // 取消按钮的文字，默认为"取消"
        cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
        confirmText: '确定', // 确定按钮的文字，默认为"确认"
        confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
      }).then((res) => {
          if (res.confirm) {
              console.log('用户点击了“确定”')
          } else if (res.cancel) {
              console.log('用户点击了“取消”')
          }
      })

    }else{
      Taro.chooseImage({
        count: 1,
        sizeType: ['original'],
        sourceType: ['album', 'camera'],
        success:  res => {
          console.log('res',res)
          Taro.showLoading({
            title: '上传中',
          })
          const filePath = res.tempFilePaths[0]
          that.setState({
            imgUrl:filePath
          })
          
          Taro.uploadFile({
            url:uploadUrl,
            filePath,
            name:'gif',
            formData,
            success: res => {
              console.log('[上传文件] 成功：', res)
              let data = res && res.data
              if(data){
                let parsedData = JSON.parse(data);
                let fileImgPath = parsedData.filePath;
                console.log('uploadedList', uploadedList)
                uploadedList.push(filePath)
                imgUrlList.push(fileImgPath)
                
                this.setState({
                  uploadedList,
                  imgUrlList
                });
              }
              
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
    
  }
  publish = () =>{
    const { 
      title,
      degreeItem={},
      deliverItem=[],
      address,
      price,
      oldPrice,
      contact,
      brand,
      description,
      imgUrlList,
     } = this.state
     const { userId } = this.props
     let deliver = deliverItem.join(',')
     let isWrong = false
     let modalTxt = ''
     if(!title){
      modalTxt = '请填写标题'
      isWrong = true
     }else if(!address){
      modalTxt = '请填写地址'
      isWrong = true
     }else if(!price){
      modalTxt = '请填写价格'
      isWrong = true
     }else if(!contact){
      modalTxt = '请填写联系方式'
      isWrong = true
     }else if(imgUrlList && imgUrlList.length == 0){
      modalTxt = '请上传图片'
      isWrong = true
     }else if(degreeItem && !degreeItem){
      modalTxt = '请填写新旧程度'
      isWrong = true
     }
     if(isWrong){
      Taro.showModal({
        title: '提示',
        content: modalTxt,
        cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
        confirmText: '确定', // 确定按钮的文字，默认为"确认"
        confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
      }).then((res) => {
          if (res.confirm) {
              console.log('用户点击了“确定”')
          } else if (res.cancel) {
              console.log('用户点击了“取消”')
          }
      })

    }else{
      this.props.publishProduct(
        {
          title,
          degree:degreeItem.value,
          deliver,
          address,
          price,
          oldPrice,
          contact,
          brand,
          description,
          imgUrlList,
          publisher:userId,
        }
       )

    }
    



  }


  render () {
    const { type, radioList, imgUrl, degreeList, deliverList, uploadedList } = this.state
    console.log('uploadedList', uploadedList)

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
        <Checkbox className='topRadio' key={v.label} value={v.value} checked={v.checked}>{v.label}</Checkbox>
      )
      return res
    })

    const uploadedNode = Array.isArray(uploadedList) && uploadedList.map( (v,i) =>{
      let res = (
        <Image className='uploadedImg' bindtap='preview' src={v} key={i + 'uploaded'} mode='aspectFit'/>
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
                <Checkbox className='topRadio' key={'自提'} value={0} checked={true}>自提</Checkbox>
                <CheckboxGroup className='itemRight' onChange={(e) =>{this.onDeliverRadioChange(e)}}>
                  {deliverNode}
                </CheckboxGroup>
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
            <Image src={imgUrl}  className='uploadImg'  mode='aspectFit'/>
            
          </View>
          
        </View>
        <View className='uploadedBox'>
            <View className='uploadedLabel'>
              <Text >上传结果:</Text>
            </View>
            <View  className='imgList'>
              {uploadedNode}
            </View>
        </View>
        <View className='publishBox' onClick = {this.publish}>
            <Text className='homeButton' >发布</Text>
        </View>
        
        <TapCom ></TapCom>
        
      </View>
    )
  }
}
