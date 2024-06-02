import { View, Image } from "@tarojs/components";
import Taro, { getCurrentInstance } from '@tarojs/taro'
import "./index.scss";

const ImageCom = ({props}) => {
  const { imgId, imgUrl  } = props

  const onImgClick = () =>{
    Taro.navigateTo({
      url:`/pages/product/index?id=${imgId}`
    });
    
  }

  return (
    <View className="imageCom" >
      <Image
       src={imgUrl}
       key={imgUrl}
       onClick = { () => {onImgClick()}}
       className="imageComImg"
      ></Image>
    </View>
  );
};

export default ImageCom
