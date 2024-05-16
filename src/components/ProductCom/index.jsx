import { View, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import "./index.scss";
const reMenImgA = require("../../assets/product/1.jpg")


const ProductCom = ({props}) => {
  const { imgId, imgUrl, title, price, oldPrice, location} = props
  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${imgId}`
    });
    
  }
  let urlEnd = reMenImgA
  return (
    <View className="productCom"  onClick = { () => {onImgClick()}}>
      <Image
       src={urlEnd}
       key={urlEnd}
       className="productComImg"
      ></Image>
      <View className="detail" >
        <View className="title" >{title}</View>
        <View className="priceBox" >
          <View className="price" >￥{price}</View>
          <View className="oldPriceBox" >
            原价 
            <span className="oldPrice" >{oldPrice}</span>
          </View>
          <View className="location" >{location}</View>

        </View>
      </View>
    </View>
  );
};

export default ProductCom
