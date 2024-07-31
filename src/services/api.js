import Taro from '@tarojs/taro'
import { HTTP_STATUS } from '../constants/status'
import { logError } from '../utils/error'

const baseUrl = BASE_URL

export default {
  baseOptions(params, method = 'GET') {
    let { url, data } = params
    let contentType = 'application/json'
    contentType = params.contentType || contentType
    
    const setCookie = (res) => {
      if (res.cookies && res.cookies.length > 0 && url.indexOf('login/cellphone') !== -1) {
        let cookies = '';
        res.cookies.forEach((cookie, index) => {
          if (cookie.name && cookie.value) {
            cookies += index === res.cookies.length - 1 ? `${cookie.name}=${cookie.value};expires=${cookie.expires};path=${cookie.path}` : `${cookie.name}=${cookie.value};`
          } else {
            cookies += `${cookie}`
          }
        });
        Taro.setStorageSync('cookies', cookies)
      }
    }
    data = {
      ...data,
      timestamp: new Date().getTime()
    }
    const option = {
      url: url.indexOf('http') !== -1 ? url : baseUrl + url,
      data: data,
      method: method,
      header: {
        'content-type': contentType,
        cookie: Taro.getStorageSync('cookies')
      },
      xhrFields: { withCredentials: true },
      success(res) {
        console.log('res', res)
        setCookie(res)
        if (res.statusCode === HTTP_STATUS.NOT_FOUND) {
          return logError('api', '请求资源不存在')
        } else if (res.statusCode === HTTP_STATUS.BAD_GATEWAY) {
          return logError('api', '服务端出现了问题')
        } else if (res.statusCode === HTTP_STATUS.FORBIDDEN) {
          return logError('api', '没有权限访问')
        } else if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
          Taro.clearStorage()
          Taro.navigateTo({
            url: '/pages/login/index'
          })
          return logError('api', '请先登录')
        } else if (res.statusCode === HTTP_STATUS.SUCCESS) {
          let result = res.data
          return result
        }
      },
      error(e) {
        logError('api', '请求接口出现问题', e)
      }
    }
    
    let next = new Promise( (res,rej) =>{
      Taro.request(option).then((result) =>{
        res(result.data)
      }).catch( err =>{
        console.log('err',err)
      })
    }).catch( err =>{
      console.log('err',err)
    })
    return next
  },
  get(url, data) {
    let option = { url, data }
    return this.baseOptions(option)
  },
  post: function (url, data, contentType) {
    let params = { url, data, contentType }
    return this.baseOptions(params, 'POST')
  },
  put(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'PUT')
  },
  delete(url, data) {
    let option = { url, data }
    return this.baseOptions(option, 'DELETE')
  }
}
