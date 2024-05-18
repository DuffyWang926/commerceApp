import Taro from "@tarojs/taro";
import "./index.scss";
import { View, Text } from '@tarojs/components'
import { useState } from '@tarojs/taro'

export default function TabsCom({props}) {
    const {tabs, currentTab, changeTab} = props
    console.log('TabsCom',props)
    const tabsNode = Array.isArray(tabs) && tabs.map( (v,i) =>{
        let res = (<Text  key={v.label} className={currentTab === v.value ? 'tabActive tabItem' : 'tabItem'} onClick={() => changeTab(v.value)}>{v.label}</Text>)
        return res
    })

  return (
    <View className='tabBar'>
        {tabsNode}
    </View>
  )
}