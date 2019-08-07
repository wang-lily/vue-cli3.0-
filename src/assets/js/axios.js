import axios from 'axios'
// import router from '@/router'
import { getmd5 } from '@/assets/js/common'
// import Vue from 'vue'
axios.defaults.baseURL = 'http://127.0.0.1:3001'
axios.defaults.timeout = 6 * 1000
//设置全局的请求次数，请求的间隙
axios.defaults.retry = 0
axios.defaults.retryDelay = 1000

let len = 6
let chars =
  'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678' /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
let maxPos = chars.length
let nonceStr = ''
for (let i = 0; i < len; i++) {
  nonceStr += chars.charAt(Math.floor(Math.random() * maxPos))
}
//请求时的拦截
axios.interceptors.request.use(
  config => {
    // 数据加载完成前
    // 显示加载提示
    // Vue.$toast.loading({
    //     mask: true,
    //     message: '加载中...'
    // });
    // 在发送请求之前做些什么
    let token = localStorage.getItem('token') || ''
    let query =
      'appId=804f968b052e5598&appKey=955c1723804f968b052e55983fb280f6&nonceStr=' +
      nonceStr // app_id加上app_key上面拼好的字符串
    let db_token = getmd5(token).toUpperCase() // 得到数据TOKEN并转大写
    let sign = getmd5(query + db_token).toUpperCase() // 生成签名并转大写
    // config.headers.common['Authorization'] = token; // 设置 axios 默认请求头
    config.headers.common['token'] = token // 设置 axios 默认请求头
    config.headers.common['sign'] = sign // 设置 axios 默认请求头
    config.headers.common['nonceStr'] = nonceStr // 设置 axios 默认请求头
    return config
  },
  err => {
    alert('请求错误!')
    return Promise.resolve(err)
  }
)
//响应时的拦截
axios.interceptors.response.use(
  response => {
    // 返回响应时做一些处理
    // 第一种方式
    const data = response.data

    // 根据返回的code值来做不同的处理（和后端约定）
    // switch (data.code) {
    //     case '0':
    //         // 举例
    //         // exp: 修复iPhone 6+ 微信点击返回出现页面空白的问题
    //         if (isIOS()) {
    //             // 异步以保证数据已渲染到页面上
    //             setTimeout(() => {
    //                 // 通过滚动强制浏览器进行页面重绘
    //                 document.body.scrollTop += 1
    //             }, 0)
    //         }
    //         // 这一步保证数据返回，如果没有return则会走接下来的代码，不是未登录就是报错
    //         return data

    //         // 需要重新登录
    //     case 'SHIRO_E5001':
    //         // 微信生产环境下授权登录
    //         if (isWeChat() && IS_PRODUCTION) {
    //             axios.get(apis.common.wechat.authorizeUrl).then(({
    //                 result
    //             }) => {
    //                 location.replace(global.decodeURIComponent(result))
    //             })
    //         } else {
    //             // 否则跳转到h5登录并带上跳转路由
    //             const search = encodeSearchParams({
    //                 next: location.href,
    //             })

    //             location.replace(`/user/login?${search}`)
    //         }

    //         // 不显示提示消息
    //         data.description = ''
    //         break

    //     default:
    // }
    // // 若不是正确的返回code，且已经登录，就抛出错误
    // const err = new Error(data.description)

    // err.data = data
    // err.response = response

    // 第二种方式，我采取的
    if (data.status && data.status == 200 && data.data.status == 'error') {
      alert(data.data.msg)
    }
    return data
  },
  err => {
    // 当响应异常时做一些处理
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误，错误信息(400)'
          break
        case 401:
          err.message = '未授权，请重新登录(401)'
          localStorage.setItem('token', '')
          break
        case 403:
          err.message = '拒绝访问(403)'
          break
        case 404:
          err.message = '请求出错(404)'
          break
        case 408:
          err.message = '请求超时(408)'
          break
        case 500:
          err.message = '服务器错误(500)'
          break
        case 501:
          err.message = '服务未实现(501)'
          break
        case 502:
          err.message = '网络错误(502)'
          break
        case 503:
          err.message = '服务不可用(503)'
          break
        case 504:
          err.message = '网络超时(504)'
          break
        case 505:
          err.message = 'HTTP版本不受支持(505)'
          break
        default:
          err.message = `连接出错(${err.response.status})!`
      }
    } else {
      err.message = '连接服务器失败!'
    }
    alert(err.message)
    return Promise.resolve(err)
  }
)

//如果需要可以封装一些请求的方法
let base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const uploadFileRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
export const putRequest = (url, params) => {
  return axios({
    method: 'put',
    url: `${base}${url}`,
    data: params,
    transformRequest: [
      function(data) {
        let ret = ''
        for (let it in data) {
          ret +=
            encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
        }
        return ret
      }
    ],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
export const deleteRequest = url => {
  return axios({
    method: 'delete',
    url: `${base}${url}`
  })
}
export const get = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}?`,
    params: params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Token': localStorage.getItem('AccessToken')
    }
  })
}
