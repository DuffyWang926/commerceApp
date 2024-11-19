import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import {
    attendWelfare,
    getWelfareList

} from "../../actions/welfare";

const img1 = require("./1.png")
const mapStateToProps = (state)=>{
    const { home, welfare } = state
    const { userInfo } = home
    const { userId, points, nickName, headUrl, groupId } = userInfo
    const { welfareList, isAttend } = welfare
    
      return {
        userId,
        points,
        nickName,
        headUrl,
        welfareList,
        groupId,
        isAttend,
      }
  
  }
  const mapDispatchToProps = (dispatch) =>{
    return {
      attendWelfare:(payload)=>{
        dispatch(attendWelfare(payload));
      },
      getWelfareList:(payload)=>{
        dispatch(getWelfareList(payload));
      },
      
      
      
    }
  }
  @connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  constructor(){
    super()

    const today = new Date();
    const dayOfWeek = today.getDay();

    let nextFriday = new Date(today);
    nextFriday.setDate(today.getDate() + (5 - dayOfWeek) );
    nextFriday.setHours(20, 0, 0, 0);
    let nextSaturday = new Date(today);
    nextSaturday.setDate(today.getDate() + (6 - dayOfWeek));
    nextSaturday.setHours(20, 0, 0, 0); 
    
    let startDay = ''
    let endDay = ''
    const thisSaturday = new Date(today);
    thisSaturday.setDate(thisSaturday.getDate() + 1);
    thisSaturday.setHours(20, 0, 0, 0); 
    const thisFriday = new Date(today);
    thisFriday.setDate(thisFriday.getDate() - 1);
    thisFriday.setHours(20, 0, 0, 0); 
    today.setHours(20, 0, 0, 0); 
    if(dayOfWeek == 5){
      startDay = today
      endDay = thisSaturday
    }else if(dayOfWeek == 6){
      startDay = thisFriday
      endDay = today
    }else{
      startDay = nextFriday
      endDay = nextSaturday
    }
    function formatDate(date) {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，所以加1
        const day = date.getDate().toString().padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    this.state={
        startDay:formatDate(startDay),
        endDay:formatDate(endDay),
        endCashDay:formatDate(nextFriday),
        startDayTime:startDay.getTime(),
        endDayTime:endDay.getTime(),
      
      
    }
  }
  componentDidMount(){
    this.props.getWelfareList()
  }

  
  onAttend = () =>{
    const { userId, points, nickName,
      headUrl, groupId } = this.props
    const { startDayTime, endDayTime} = this.state
    let date = new Date().getTime()
    if( date >= startDayTime && date <=  endDayTime){
      this.props.attendWelfare({
          userId,
          points,
          nickName,
          headUrl,
          date,
          groupId,
      })

    }else{
      Taro.showModal({
        title: '提示',
        content: '请在抽奖时间内参加。',
        showCancel: true, // 是否显示取消按钮，默认为 true
        cancelText: '取消', // 取消按钮的文字，默认为"取消"
        cancelColor: '#000000', // 取消按钮的文字颜色，默认为"#000000"
        confirmText: '确定', // 确定按钮的文字，默认为"确认"
        confirmColor: '#3CC51F', // 确定按钮的文字颜色，默认为"#3CC51F"
      }).then((res) => {
          if (res.confirm) {
            
          } else if (res.cancel) {
              console.log('用户点击了“取消”')
          }
      })

    }
    
  
  }


  
 

  render () {
    const { 
      startDay,
      endDay,
      endCashDay,
    

    } = this.state
    const { 
        welfareList,
        points,
        isAttend
    } = this.props
    let welfareListNode = Array.isArray(welfareList) && welfareList.map( (v,i) =>{
      let res = <View className='listItem' key={i+'list'}>
        <View className='portrait'>
        </View>
        <View className='listTxt'>{v.nickName}</View>
        <View className='listTxt'>{v.userId}</View>
        <View className='listTxt'>{v.date}</View>
      </View>

      return res
    })
    
   
    
    return (
        <View className='welfare'>
            <Image className='welfareImg' src={img1} mode="aspectFit" ></Image>
            <View className='conditions'>
                <View className='conditionsTitle'>奖品：红包</View>
                <View className='tip'>（具体数额见群通知）</View>
                <View>参与时间：{startDay} 20:00:00 至 {endDay} 20:00:00</View>
                <View>参与条件：一次消耗10积分。（您有{points}积分。发布闲置可获得10积分）</View>
                <View>开奖时间：{endDay} 20:00:01 </View>
                <View>奖品有效期：{endCashDay} 20:00:00 </View>
                <View className='tipEnd'>最终解释权归本平台所有</View>
            </View>
            <View className='attend'>
                { isAttend ?
                <Text >抽奖</Text>
                :
                <Text className='homeButton' onClick={this.onAttend}>抽奖</Text>
                }
            </View>
           
            {welfareList.length > 0 && <View className='list'>
                <View >往期中奖名单</View>
                {welfareListNode}
                
              
            </View>
            }
        </View>
    )
  }
}
