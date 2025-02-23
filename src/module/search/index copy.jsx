import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.scss'
import { connect } from "../../utils/connect";
import {
  changeCity,

} from "../../actions/search";
import CityCom from "../../components/CityCom";

const mapStateToProps = (state)=>{
    const { search } = state
    const { city } = search
    
      return {
        city,
      }
  
  }
  const mapDispatchToProps = (dispatch) =>{
    return {
      changeCity:(payload)=>{
        dispatch(changeCity(payload));
      },
      
      
      
      
    }
  }
  @connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {
  constructor(){
    super()


    this.state={
      city:'北京市'
      
      
    }
  }
  componentDidMount(){
  }

  getCity = (obj) =>{
    const {
      city,
    } = obj
    this.setState({city})
    
    console.log('get', obj)
    
  }
  


  
 

  render () {
    const { city } = this.state
    
    const cityProps={
      confirmCity:this.getCity
    }
   
    
    return (
        <View className='city'>
          <View className='topItem'>
                  <Text className='itemTitle'>城市：</Text>
                  <Text className='itemTitle'>{city}</Text>
                  {/* <Text className='itemEnd'> */}
                     <CityCom {...cityProps}></CityCom>
                    <Text className='homeButton endBtn' onClick = {this.chooseCity}>选择</Text>
                  {/* </Text> */}
                  
                </View>
        </View>
    )
  }
}
