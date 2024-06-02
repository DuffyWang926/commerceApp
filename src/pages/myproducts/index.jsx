import Taro from "@tarojs/taro";
import { Component } from 'react'
import { View, RadioGroup, Radio, CheckboxGroup, Checkbox,  Text,} from '@tarojs/components'
import ProductCom from "../../components/ProductCom";

// import { AtIcon, AtButton, AtToast } from "taro-ui";
import './index.scss'
import { connect } from "../../utils/connect";
import communityList from "../../constant/comunity";
import getUrlCode from "../../utils/getUrlCode";


const mapStateToProps = (state)=>{
  const { home } = state
  const { name } = home
    return {
      name,
    }

}
const mapDispatchToProps = (dispatch) =>{
  return {
   
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
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { id } = result || {}
    this.setState({
      id,
    })

  }
  onCheckChange = (e) =>{
    const { radioList, chooseList } = this.state
    const { value } = e.detail;
    let radioItem = {}
    let isAdd = false
    let nextChoose = []
    // let radioListTemp = Array.isArray(radioList) && radioList.map( (v,i) =>{
    //   if( v.value == value){
    //     v.checked = !v.checked
    //     if(v.checked){
    //       nextChoose = Array.isArray(radioList) && radioList.map( (val,key) =>{
    //         if(val.id = v.id){
    //           isAdd = true
    //         }
    //         return val
    //       })
    //       radioItem =v
    //     }
        
    //   }
    //   return v

    // })
    // if(!isAdd){
    //   nextChoose.push(radioItem)
    //   this.setState({
    //     radioList:radioListTemp,
    //     chooseList:value
    //   })
      
    // }else{
    //   this.setState({
    //     radioList:radioListTemp,
    //   })

    // }
    this.setState({
      chooseList:value
    })
    
  }

  render () {
    const { radioList,  } = this.state
    const productProps = {
      title:'titletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitletitle',
      price:3.00,
      oldPrice:5.00,
      location:'朱辛庄',
      productId:'1',
      imgUrl:'a',
    }
    const radioNode = Array.isArray(radioList) && radioList.map( (v,i) =>{
      let res = (
        <Checkbox className='checkbox-list__checkbox' value={v.value} checked={v.checked} >
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
              {radioNode}
            </CheckboxGroup>
            
        </View>
        
      </View>
    )
  }
}
