import { Component } from 'react'
import Taro, { getCurrentInstance } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import getUrlCode from "../../../utils/getUrlCode";
import './index.scss'

export default class Index extends Component {
  constructor(){
    super()
    
const controlText = [
    {
        type: "title",
        content: "用户服务协议"
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第一章 总则"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第一条 活动内容"
                    },
                    {
                        type: "text",
                        content: [
                            "本平台（以下简称“平台”）为用户提供二手商品交易的信息发布及交易服务。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第二条 用户资格"
                    },
                    {
                        type: "text",
                        content: [
                            "用户应年满18周岁，具备完全民事行为能力。",
                            "用户在注册时需提供真实、准确、完整的个人信息。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第三条 平台职责"
                    },
                    {
                        type: "text",
                        content: [
                            "平台提供信息发布及交易撮合服务，但不参与实际交易过程。",
                            "平台不对交易商品的质量、合法性、真实性做任何担保。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第二章 用户义务"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第四条 信息发布"
                    },
                    {
                        type: "text",
                        content: [
                            "用户应保证信息内容真实、合法，不得含有任何虚假或误导性内容。",
                            "用户不得发布违法、违禁物品的信息。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第五条 交易行为"
                    },
                    {
                        type: "text",
                        content: [
                            "用户应诚信交易，违反交易诚信的行为将受到平台的处罚。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第三章 责任及赔偿"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第六条 责任限制"
                    },
                    {
                        type: "text",
                        content: [
                            "平台对因不可抗力或其他非平台原因造成的损失不承担任何责任。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第七条 赔偿责任"
                    },
                    {
                        type: "text",
                        content: [
                            "用户恶意操作造成损失的，须对平台及相关方的损失承担全额赔偿责任。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第四章 协议终止"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第八条 协议终止条件"
                    },
                    {
                        type: "text",
                        content: [
                            "用户可随时选择注销账号。",
                            "平台有权在用户违反协议的情况下终止服务协议。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第五章 其他"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第九条 协议修改"
                    },
                    {
                        type: "text",
                        content: [
                            "平台有权根据需要修改本协议内容，并通过适当方式通知用户。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第十条 法律适用及争议解决"
                    },
                    {
                        type: "text",
                        content: [
                            "本协议的签订、执行和解释及争议的解决均应适用中华人民共和国相关法律。",
                            "任何争议应协商解决，协商不成的，任何一方可向平台所在地人民法院提起诉讼。"
                        ]
                    }
                ]
            }
        ]
    }
];


const privateText = [
    {
        type: "title",
        content: "隐私政策"
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第一章 总则"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第一条 目标"
                    },
                    {
                        type: "text",
                        content: [
                            "本隐私政策旨在保护用户的个人隐私，确保用户数据的安全。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第二条 收集信息"
                    },
                    {
                        type: "text",
                        content: [
                            "平台在用户注册账号、使用服务时收集个人信息，包括但不限于姓名、联系方式、位置信息等。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第二章 信息的使用"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第三条 使用信息"
                    },
                    {
                        type: "text",
                        content: [
                            "平台将收集的信息用于提供、维护、保护及改进服务。",
                            "平台不会未经用户同意将个人信息用于其他目的。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第三章 信息的共享"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第四条 共享信息"
                    },
                    {
                        type: "text",
                        content: [
                            "平台仅在法律要求、用户同意或服务必须的情况下分享用户信息。",
                            "平台将采取合理措施保护用户信息不被泄露。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第四章 信息的安全"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第五条 安全措施"
                    },
                    {
                        type: "text",
                        content: [
                            "平台采取适当的技术和组织措施保护用户信息的安全。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第五章 用户权利"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第六条 访问及修改信息"
                    },
                    {
                        type: "text",
                        content: [
                            "用户有权访问、更正其个人信息。",
                            "用户有权要求平台删除用户个人信息。"
                        ]
                    }
                ]
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第七条 投诉与意见"
                    },
                    {
                        type: "text",
                        content: [
                            "用户如对本隐私政策有任何意见或建议，可随时联系平台客服。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第六章 政策修改"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第八条 修改权"
                    },
                    {
                        type: "text",
                        content: [
                            "平台有权根据需要随时修改本隐私政策，并通过适当方式通知用户。"
                        ]
                    }
                ]
            }
        ]
    },
    {
        type: "section",
        content: [
            {
                type: "subtitle",
                content: "第七章 适用法律"
            },
            {
                type: "item",
                content: [
                    {
                        type: "subheading",
                        content: "第九条 适用法律"
                    },
                    {
                        type: "text",
                        content: [
                            "本隐私政策的解释和执行均应遵循中华人民共和国相关法律。"
                        ]
                    }
                ]
            }
        ]
    }
];

    this.state={
      privateText,
      controlText,
      
    }
  }
  componentDidMount(){
    let url = window.location.href
    let result = getUrlCode(url,true)
    const { type } = result || {}

    this.setState({
      type,
    })
   
    
  }

  generateView = (data) => {
    return  data.map((item, index) => (
      <View key={index} className={item.type}>
        {typeof item.content === 'string' ? (
          <Text >{item.content}</Text>
        ) : (
          item.content.map((subItem, subIndex) => (
            <View key={subIndex} className={subItem.type}>
              {typeof subItem.content === 'string' ? (
                <Text>{subItem.content}</Text>
              ) : (
                subItem.content.map((subSubItem, subSubIndex) => (
                  <View key={subSubIndex} className={subSubItem.type}>
                    {typeof subSubItem.content === 'string' ? (
                      <Text>{subSubItem.content}</Text>
                    ) : (
                      subSubItem.content.map((subSubSubItem, subSubSubIndex) => (
                        <View key={subSubSubIndex} className={subSubSubItem.type}>
                          {typeof subSubSubItem.content === 'string' ? (
                            <Text>{subSubSubItem.content}</Text>
                          ) : (
                            // subSubSubItem.content.map((lastItem, subSubSubIndex) => (
                            //   <View key={subSubSubIndex} className='lastItem'>
                            //     <Text>{lastItem}</Text>
                            //   </View>
                            // ))
                            <Text className='lastItem'>{subSubSubItem}</Text>
                          )}
                        </View>
                      ))
                    )}
                  </View>
                ))
              )}
            </View>
          ))
        )}
      </View>
    ))
  }



  
 

  render () {
    const { type, privateText,
      controlText,
    } = this.state
    
    let tips = ''
    if(type == 0 && controlText){
      tips = this.generateView(controlText) 
    }else if(type == 1 && privateText){
      tips = this.generateView(privateText)
    }
   
    
    return (
      <View className='tips'>
       {tips}
        
      </View>
    )
  }
}
