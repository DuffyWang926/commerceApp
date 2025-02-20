import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, Input, Text, RadioGroup, Radio, Image } from '@tarojs/components'
import './index.scss'
import { connect } from "../../../utils/connect";
import communityList from "../../../constant/comunity";
import getUrlCode from "../../../utils/getUrlCode";
const codeA = require("./a.jpg")
const codeB = require("./B.jpg")
const code0 = require("./0.jpg")


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
let rewardedVideoAd = null
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
    let cities = [
        '北京', '上海', '广州', '深圳', '杭州', '成都', '天津', '西安', '重庆', '南京', 
        '武汉', '济南', '苏州', '石家庄', '郑州', '太原', '合肥', '南昌', '长沙', '福州', 
        '南宁', '贵阳', '昆明', '兰州', '银川', '西宁', '乌鲁木齐', '呼和浩特', '沈阳', '长春', 
        '哈尔滨'
      ];
      
    let tempList = cities.map((city, index) => ({
    value: (10000 + index).toString(),
    text: city
    }));

    let rentCities = [
      '北京', 
    ];

    let rentList = rentCities.map((city, index) => ({
      value: (20000 + index).toString(),
      text: city
      }));
    
    this.state = {
      radioList:tempList,
      wxList:[
        {
          name:'',
          imgSrc:codeA,
        },
        
        
      ],
      isAd:0,
      rentList,

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

    if(wx.createRewardedVideoAd){
      rewardedVideoAd = wx.createRewardedVideoAd({ adUnitId: 'adunit-b9e1a7420c339532' })
      rewardedVideoAd.onLoad(() => {
        console.log('onLoad event emit')
      })
      rewardedVideoAd.onError((err) => {
        console.log('onError event emit', err)
      })
      
    }

  }
  
  checkCode = () =>{
    let that = this
    rewardedVideoAd.show()
    .catch(() => {
        rewardedVideoAd.load()
        .then(() => rewardedVideoAd.show())
        .catch(err => {
          console.log('激励视频 广告显示失败')
          that.setState({
            isAd:1
          })
        })
    })
    rewardedVideoAd.onClose(res => {
        if (res && res.isEnded) {
          that.setState({
            isAd:1
          })
        } else {
          // 播放中途退出，不下发游戏奖励
          
        }
    })
  
  
  }

  render () {
    const { radioList, wxList, type, isAd, rentList } = this.state
    let title = ''
    let radioNode = []
    let wxListNode = []

    if(type == 1){
      title = '租房群'
      radioNode = Array.isArray(rentList) && rentList.map( (v,i) =>{
        let res = (
          <Text className='itemName' key={v.text} >{v.text}</Text>
        )
        return res
      })

      wxListNode = 
          <View className='listItem' >
            <View>
              <Image className='listImg' src={codeB} mode="aspectFit" showMenuByLongpress></Image>
            </View>
            <View>（长按即可添加）</View>
          </View>
        

    }else{
      title = '闲置群'
      radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
        let res = (
          <Text className='itemName' key={v.text} >{v.text}</Text>
        )
        return res
      })

      wxListNode = Array.isArray(wxList) && wxList.map( (v,i) =>{
        let res = (
          <View className='listItem' key={i}>
            {/* <View>wx 号：{v.name}</View> */}
            <View>
              <Image className='listImg' src={v.imgSrc} mode="aspectFit" showMenuByLongpress></Image>
            </View>
            <View>（长按即可添加）</View>
          </View>
        )
        return res
      })
    }

    
    
    return (
      <View className='shareGroupsPage'>
        <View className='shareGroupsTitle'>
          {title}
        </View>
        <View className='uploadTop'>
          <View className='topItem'>
            <Text className='itemTitle'>已有群：</Text>
            <View >
              {radioNode} 等等
            </View>
            
          </View>
        </View>
        { type != 0 &&
          <View className='shareList'>
            <View className='listLabel'>添加下面wx，拉你进群：</View>
            <View className='listTip'>（广告,营销号,商家勿扰！）</View>
            
            { isAd == 1 ?
            <View className='listBox'>{wxListNode}</View>
            :<View className='listBox'>
              <View className='homeButton' onClick={this.checkCode}>查看微信二维码</View>
              <View className='listItem' key={0}>
                <View>
                  <Image className='listImg' src={code0} mode="aspectFit"></Image>
                </View>
              </View>
            </View>
            }
            
          </View>
        
        }
        
      </View>
    )
  }
}
