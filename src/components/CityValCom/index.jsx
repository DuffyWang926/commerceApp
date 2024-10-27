import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { Component } from 'react'

import "./index.scss";
import {
  changeHomeData
} from "../../actions/home";
import { connect } from "../../utils/connect";


const mapStateToProps = (state)=>{
  const { search } = state
  const {  city } = search
    return {
      city
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    changeHomeData:(payload)=>{
      dispatch(changeHomeData(payload));
    }
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class TapCom extends Component{

  onTapClick = (val) =>{
    const { url, type } = val
    Taro.redirectTo({
      url
    });
    this.props.changeHomeData({ tapCurrent:type})
  }
  

  render () {
    const { city  } = this.props || {}
    
  return (
    <View className="cityValCom" >
      {city}
    </View>
  );

  } 
  
};

