import { Component } from 'react'
import { View } from "@tarojs/components";
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
  onRedClick = () =>{
    const { userId} = this.props
    const { url } = this.props.data

    // if(!userId){
    //   const { path } = getCurrentInstance()?.router || {};
    //   let url = 'pages/login/index?oldUrl=' + path
    //   Taro.navigateTo({
    //     url
    //   })
    // }else{
    //   let clickTime = new Date().getTime() + ''
    //   this.props.recordTime({userId, clickTime})
    //   let url = "https://activity01.yunzhanxinxi.com/link/68b1e80d30b996baea1acb9200ec5b01"
    //   window.location.href = url
    // }
    let clickTime = new Date().getTime() + ''
      this.props.recordTime({userId, clickTime})
      window.location.href = url
  }
  render(){
    const { msg } = this.props.data
    return (
      <View>
        <View className='buyBtn' onClick={() => this.onRedClick()}>
          {msg}
        </View>
      </View>
    )
  }
}

