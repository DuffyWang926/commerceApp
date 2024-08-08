import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import { Component } from 'react'

import "./index.scss";
import {
  changeHomeData
} from "../../actions/home";
import { connect } from "../../utils/connect";
const homeImg = require("../../assets/icon/home.svg")
const homeImg2 = require("../../assets/icon/home2.svg")
const addImg = require("../../assets/icon/add.svg")
const portraitImg = require("../../assets/icon/portrait.svg")
const portraitImg2 = require("../../assets/icon/portrait2.svg")

const mapStateToProps = (state)=>{
  const { home } = state
  const {  tapCurrent } = home
    return {
      tapCurrent
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
    const { tapCurrent  } = this.props || {}
    const tapList = [
      {
        url:`/pages/index/index`,
        type:0,
        title:'首页'
      },
      {
        url:`/pages/upload/index`,
        type:1,
        title:'卖闲置'
      },
      {
        url:`/pages/mine/index`,
        type:2,
        title:'我的'
      },
      

    ]

  const tapListNode = Array.isArray(tapList) && tapList.map((v,i) =>{
    const { title } = v
    let style = "tapItem"
    let imgSrc = ''
    let imgStyle = 'tapImg'
    if(v.type == tapCurrent){
      style = "tapItem tapCurrent"
      if(i == 0){
        imgSrc = homeImg2
      }else if( i ==2){
        imgSrc = portraitImg2
      }
    }else{
      if(i == 0){
        imgSrc = homeImg
      }else if( i ==2){
        imgSrc = portraitImg
      }
    }
    if(i == 1){
      imgSrc = addImg
      imgStyle = 'addImg'
      style = "tapItem tapMid"
    }
    let res = (
      <View className={style} key={title} onClick={() =>{ this.onTapClick(v)}}>
        <View className={imgStyle}>
          <Image
            src={imgSrc}
            
            ></Image>
        </View>
        <View className='tapTxt'>{title}</View>
      </View>
    )
    return res
  })

  return (
    <View className="tapCom" >
      {tapListNode}
      
    </View>
  );

  } 
  
};

