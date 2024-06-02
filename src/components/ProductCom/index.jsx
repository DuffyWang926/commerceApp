import { View, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import "./index.scss";

const ProductCom = ({props}) => {
  const { productId, imgUrl, title, price, oldPrice, location, type} = props
  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${productId}`
    });
    
  }
  let comStyle = 'productComImg'
  if(type == 1){
    comStyle  = 'productComImg productHigher'

  }
  return (
    <View className='productCom'  onClick = { () => {onImgClick()}}>
      <Image
       src={imgUrl}
       key={imgUrl}
       className={comStyle}
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
