import Taro, { getCurrentInstance } from '@tarojs/taro'
import { Component } from 'react'
import { View, Text,  } from '@tarojs/components'
import './searcha.scss'
import { connect } from "../../utils/connect";
import CityCom from "../../components/CityCom";
import SearchCom from "../../components/SearchCom";
import ProductCom from "../../components/ProductCom";

import {
  search,
  changePage
} from "../../actions/search";
const mapStateToProps = (state)=>{
  const { search } = state
  const {  orderType, page, pageSize, leftProducts,
    rightProducts,
    hasMore,
   } = search
    return {
      orderType, page, pageSize,
      leftProducts,
      rightProducts,
      hasMore,
      
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    search:(payload)=>{
      dispatch(search(payload));
    },
    changePage:(payload)=>{
      dispatch(changePage(payload));
    },
    
  }
}
@connect( mapStateToProps , mapDispatchToProps )
export default class Index extends Component {

  constructor(props){
    super(props)

    this.state = {
      isCity:false,
      province:{name:''},
      city:{code:'1101',name:'北京市'},
    }

    
  }
  componentDidMount(){
    


  }

  chooseCity = () =>{
    this.setState({
      isCity:true
    })
  }

  getCity = (obj) =>{
    const {
      province,
      city,
    } = obj
    this.setState({
      province,
      city,
      isCity:false,
    })
    this.props.changePage({ page:1})
    console.log('get', obj)
    
  }

  searchClick = (obj) =>{
    const { city } = this.state
    const { orderType, page, pageSize } = this.props
    this.setState({
      keyword:obj
    })
    this.props.changePage({ page:1})
    this.props.search({type:orderType, page, pageSize,keyword:obj,city:city.code})
  }
  // 底部上拉加载更多数据事件处理函数
  onReachBottom = () => {
    const { type, page, pageSize, hasMore, } = this.props
    const { city, keyword } = this.state

    if (hasMore) {
      console.log('onReachBottom triggered');
      let nextpage = page + 1
      this.props.changePage({ page:nextpage})
      this.props.search({type, page:nextpage, pageSize, isAdd:true, city:city.code, keyword})
    } else {
      Taro.showToast({ title: '没有更多商品啦。', icon: 'none' });
    }
  };
  


  render () {
    const { isCity,
      city,
     } = this.state
    

    const cityProps={
      confirmCity:this.getCity
    }
    const searchProps = {
      searchClick:this.searchClick
    }
    const { 
      leftProducts,
      rightProducts,
    } = this.props
    
    const leftProductsNode = Array.isArray(leftProducts) && leftProducts.map( (v,i) =>{
      const { imgList=[] } = v
      let imgUrl = imgList.length >0 && imgList[0] 
      const productProps = {
        ...v,
        imgUrl,
      }
      let res = (<ProductCom  key={'product' + i} props={productProps}></ProductCom>)
      return res                             
    })
    
    const rightProductsNode = Array.isArray(rightProducts) && rightProducts.map( (v,i) =>{
      const { imgList=[] } = v
      let imgUrl = imgList.length >0 && imgList[0] 
      const productProps = {
        ...v,
        imgUrl,
        type:1
      }
      let res = (<ProductCom  key={'product' + i} props={productProps}></ProductCom>)
      return res                             
    })
    return (
      <View className='searchPage'>
        < SearchCom props={searchProps} />
        <View className='searchParams'>
          <View className='paramsTop'>
                <View className='topItem'>
                  <Text className='itemTitle'>城市：</Text>
                  { isCity ? <CityCom {...cityProps}></CityCom> : <Text>{city.name}</Text>}
                  { !isCity && <Text className='homeButton endBtn' onClick = {this.chooseCity}>选择</Text>}
                    
                </View>
          </View>
        </View>
        <View className='searchContent'>
          <View className='leftCon'>
            {leftProductsNode}
          </View>
          <View className='rightCon'>
            {rightProductsNode}
          </View>
        </View>
      </View>
      
    )
  }
}

