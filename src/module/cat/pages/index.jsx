import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.scss'

export default class Index extends Component {
  constructor(){
    super()
    this.state={
      type:'',
      imgId:'',
      titie:'',
    }
  }
  componentDidMount(){
    let url = window.location.href
   
    
  }

  
 

  render () {
    
    
    return (
      <View className='group'>
       cat
        
      </View>
    )
  }
}
