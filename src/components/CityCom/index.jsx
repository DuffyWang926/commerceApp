import Taro from "@tarojs/taro";
import { Component } from 'react'

import "./index.scss";
import { View, PickerView, PickerViewColumn, Text } from '@tarojs/components';
import { connect } from "../../utils/connect";
const cityData = require('../../module/cat/city.json');

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
export default class CityCom extends Component{
  constructor() {
    super(...arguments);
    let provinces = []
    let province = ''
    
    console.log('cityList', Array.isArray(cityData))
    Array.isArray(cityData) && cityData.map( (v,i) =>{
      const { code, name } = v
      let res = {
        code,
        name
      }
      if(i == 0){
        province={
          code,
          name
        }
      }
      provinces.push(res)
    })

    const date = new Date();
    const years = [];
    const months = [];
    const days = [];
    for (let i = 1990; i <= date.getFullYear(); i++) {
      years.push(i);
    }
    for (let i = 1; i <= 12; i++) {
      months.push(i);
    }
    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }
    this.state = {
      provinces,
      province,
      cities:[],
      regions:[],
      city:{},
      region:{},
      years: years,
      year: date.getFullYear(),
      months: months,
      month: date.getMonth() + 1,
      days: days,
      day: date.getDate(),
      value: [0, 0, 0] // 默认选中第一项
    };
  }
  componentDidMount(){
    const { province} = this.state
    this.handleCity(province.code)
  }
  handleCity = (province,city) => {
    let cities = []
    let regions = []
    let nextCity = {}
    let region = {}
    console.log('cityList', Array.isArray(cityData))
    Array.isArray(cityData) && cityData.map( (v,i) =>{
      const { code, name } = v
      if(province == code){
        Array.isArray(v.children) && v.children.map( (val, key) =>{
          let secCode =  val.code
          let secName =  val.name
          if(key == 0){
            nextCity = {
              code:secCode,
              name:secName
            }
          }
          if(name.includes('市')){
            nextCity = {
              code:secCode,
              name:name
            }
            cities.push({
              code:secCode,
              name:name
            })
            Array.isArray(val.children) && val.children.map( (value, index) =>{
              if(index == 0){
                region = {
                  code:value.code,
                  name:value.name
                }
              }
              regions.push({
                code:value.code,
                name:value.name
              })

            })

          }else{
            if(city){
              if(city == secCode){
                Array.isArray(val.children) && val.children.map( (value, index) =>{
                  if(index == 0){
                    region = {
                      code:value.code,
                      name:value.name
                    }
                  }
                  regions.push({
                    code:value.code,
                    name:value.name
                  })

                })
              }

            }else{
              cities.push({
                code:secCode,
                name:secName
              })
              if(key == 0){
                Array.isArray(val.children) && val.children.map( (value, index) =>{
                  if(index == 0){
                    region = {
                      code:value.code,
                      name:value.name
                    }
                  }
                  regions.push({
                    code:value.code,
                    name:value.name
                  })

                })
              }
  
            }

          }
          
          
          
        })
      }
      
    })
    if(!city){
      this.setState({
        cities,
        regions,
        city:nextCity,
        region
      })

    }else{
      this.setState({
        regions,
        region
      })

    }
    
  };
  
  onChange = e => {
    const { value, provinces, cities, province,regions } = this.state
    const val = e.detail.value;
    console.log('val',e)
    console.log('val',val)
    if( val && value){
      if(val.length > 2 && value.length > 2){
        if(val[0] != value[0]){
          let nextProvince = provinces[val[0]]
          this.handleCity(nextProvince.code)
          this.setState({
            province:nextProvince
          });
        }else if(val[1] != value[1] ){
          let city = cities[val[1]]
          this.handleCity(province.code,city.code)
          this.setState({
            city:city
          });

        }else{
          let region = regions[val[2]]
          this.setState({
            region:region
          });
        }
      }
    }
    this.setState({
      value: val
    });
  };

  confirmCity = () =>{
    const {
      province,
      city,
      region

    } = this.state
    this.props.confirmCity({
      province,
      city,
      region
    })
  }
  

  render () {
    const {
      provinces,
      province,
      cities,
      regions,
      city,
      region

    } = this.state
    return (
      <View className="cityCom" >
        <View className="cityTop">
          <Text >{province.name}{city.name}{region.name}</Text>
          <Text className='homeButton' onClick = {this.confirmCity}>确定</Text>
        </View>
        <PickerView
          indicatorStyle='height: 20px;'
          style='width: 100%; height: 100px;'
          value={this.state.value}
          onChange={this.onChange}
        >
          <PickerViewColumn>
            {provinces.map(item => (
              <View key={item}>{item.name}</View>
            ))}
          </PickerViewColumn>
          <PickerViewColumn>
          {cities.map(item => (
              <View key={item}>{item.name}</View>
            ))}
          </PickerViewColumn>
          <PickerViewColumn>
          {regions.map(item => (
              <View key={item}>{item.name}</View>
            ))}
          </PickerViewColumn>
        </PickerView>
      </View>
    );

  } 
  
};




