import { View, Image } from "@tarojs/components";
import "./index.scss";
const couponImg = require("../../assets/icon/coupon.png")
const orderImg = require("../../assets/icon/order.png")
const arrowImg = require("../../assets/icon/arrow.png")
const walletImg = require("../../assets/icon/wallet.png")

const orderTipCom = () =>{
  return (
    <View>
      <View className="orderTipBox">
        <View className="orderTipItem">
          <View className="orderTipImgBox">
            <Image src={couponImg} className="orderTipImg"></Image>
          </View>
          <View className="orderTipTxt">先领券</View>
        </View>
        <View className="orderTipItem">
          <View className="orderTipImgBox">
            <Image src={arrowImg} className="orderTipArrow"></Image>
          </View>
        </View>
        <View className="orderTipItem">
          <View className="orderTipImgBox">
            <Image src={orderImg} className="orderTipImg"></Image>
          </View>
          <View className="orderTipTxt">再下单</View>
        </View>
        <View className="orderTipItem">
          <View className="orderTipImgBox">
            <Image src={arrowImg} className="orderTipArrow"></Image>
          </View>
        </View>
        <View className="orderTipItem">
          <View className="orderTipImgBox">
            <Image src={walletImg} className="orderTipImg"></Image>
          </View>
          <View className="orderTipTxt">享优惠</View>
        </View>
      </View>
    </View>
  )

}
export default orderTipCom
