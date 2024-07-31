import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, RadioGroup, Radio, CheckboxGroup, Checkbox,  Text,} from '@tarojs/components'
import ProductCom from "../../components/ProductCom";

import './index.scss'
import { connect } from "../../utils/connect";
import {
  getProducts,
  deleteProducts,
  changePage
} from "../../actions/product";

const mapStateToProps = (state)=>{
  const { home, product } = state
  const { userId } = home
  const {  userPage, userPageSize, userProducts, userHasMore  } = product
    return {
      userId,
      userPage, 
      userPageSize,
      userProducts,
      userHasMore

    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
    getProducts:(payload)=>{
      dispatch(getProducts(payload));
    },
    deleteProducts:(payload)=>{
      dispatch(deleteProducts(payload));
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
    
    const radioData = [
      {
        label:'商品和图片不符',
        value:0
      },
      {
        label:'实际价格比页面价格贵',
        value:1
      },
      {
        label:'是商家',
        value:2
      },
      {
        label:'是营销号',
        value:3
      },
    ]
    let radioList = Array.isArray(radioData) && radioData.map( (v,i) =>{
      v.checked = false
      return v

    })
    this.state = {
      radioList,
      chooseList:[],
      
    }
    
  }
  componentDidMount(){
    const {
       userId,
      userPage, 
      userPageSize,
      userProducts,
     } = this.props
     
    this.props.getProducts({userId, page:userPage, pageSize:userPageSize, isRefresh:true})

  }
  // 底部上拉加载更多数据事件处理函数
  onReachBottom = () => {
    const {
      userId,
     userPage, 
     userPageSize,
     userHasMore,
    } = this.props


    if (userHasMore) {
      console.log('onReachBottom triggered');
      let nextpage = userPage + 1
      this.props.changePage({ userPage:nextpage})
      this.props.getProducts({userId, page:userPage, pageSize:userPageSize})

      // this.loadMoreData();
    } else {
      Taro.showToast({ title: '没有更多商品啦。', icon: 'none' });
    }
  };
  onCheckChange = (e) =>{
    const { value } = e.detail;
    this.setState({
      chooseList:value
    })
    
  }
  onDelete = (e) =>{
    const {  chooseList } = this.state
    const {
      userId,
     userPage, 
     userPageSize,
    } = this.props

    this.props.deleteProducts({ids: chooseList, userId, page: userPage, pageSize: userPageSize, isRefresh:true})
    
    
  }

  render () {
    const { radioList,  } = this.state
    const {
      userProducts,
    } = this.props
    
    const userProductsNode = Array.isArray(userProducts) && userProducts.map( (v,i) =>{
      const { imgList=[] } = v
      let imgUrl = imgList.length >0 && imgList[0] 
      const productProps = {
        ...v,
        imgUrl,
      }
      let res = (
        <Checkbox className='checkbox-list__checkbox' value={v.id} checked={v.checked} >
          <ProductCom props={productProps}></ProductCom>
        </Checkbox>
      )
      return res
    })

    
    
    return (
      <View className='myProductsPage'>
        <View className='productManage'>
          <Text className='homeButton' onClick={this.onDelete}>删除</Text>
        </View>
        <View className='myProductsContent'>
            <CheckboxGroup className='productsBox' onChange={(e) =>{this.onCheckChange(e)}}>
              {userProductsNode}
            </CheckboxGroup>
            
        </View>
        
      </View>
    )
  }
}
