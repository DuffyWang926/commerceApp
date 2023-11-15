import { Component } from 'react'
import { View, Image } from "@tarojs/components";
import "./index.scss";
import { connect } from "../../utils/connect";
import {
  postLogin,
  recordTime
} from "../../actions/home";
const mapStateToProps = (state)=>{
  const { home } = state
  const { userId } = home
  return {
    userId
  }
}
const mapDispatchToProps = (dispatch) =>{
  return {
    postLogin:(payload)=>{
      dispatch(postLogin(payload));
    },
    recordTime:(payload)=>{
      dispatch(recordTime(payload));
    },
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  onBuyClick = (v) =>{
    const { userId} = this.props
    const { url } = v
    
    let clickTime = new Date().getTime() + ''
    this.props.recordTime({userId, clickTime})
    window.location.href = url
  }
  render(){
    const { list } = this.props.data
    let footListNode = Array.isArray(list) && list.map( (v,i) =>{
      const { src } = v
      let res = (
        <View className='footBuy' key={i + 'footbuy'} onClick={() => this.onBuyClick(v) }>
          <Image className='footImg' src={src} mode='aspectFit'/>
          <View className='footBtn'>免费领取</View>
        </View>

      )
      return res
    })
    return (
      <View className='buyList'>
        {footListNode}
      </View>

        
    )
  }
}

