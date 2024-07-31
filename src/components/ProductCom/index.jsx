import { View, Image, Text } from "@tarojs/components";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import "./index.scss";

const ProductCom = ({props}) => {
  const { id, imgUrl, title, price, oldPrice, location, type, city} = props
  console.log('props',props)
  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${id}`
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
       mode='aspectFit'
      ></Image>
      <View className="detail" >
        <View className="title" >{title}</View>
        <View className="priceBox" >
          <View className="price" >￥{price}</View>
          <View className="oldPriceBox" >
            原价 
            <Text className="oldPrice" >{oldPrice}</Text>
          </View>
          <View className="location" >{city}</View>

        </View>
      </View>
    </View>
  );
};

export default ProductCom
