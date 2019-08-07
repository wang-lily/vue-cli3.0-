import axios from 'axios'
// import router from '@/router'
import { getmd5 } from '@/assets/js/common'
// import Vue from 'vue'
// axios.defaults.baseURL = "http://127.0.0.1:3001";
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
//错误映射
let errMap = {
  '400': { desc: '请求错误，错误信息(400)', handler: undefined },
  '401': {
    desc: '未授权，请重新登录(401)',
    handler: () => {
      window.localStorage.setItem('token', '')
    }
  },
  '403': { desc: '拒绝访问(403)', handler: undefined },
  '404': { desc: '请求出错(404)', handler: undefined },
  '408': { desc: '请求超时(408)', handler: undefined },
  '500': { desc: '服务器错误(500)', handler: undefined },
  '501': { desc: '服务未实现(501)', handler: undefined },
  '502': { desc: '网络错误(502)', handler: undefined },
  '503': { desc: '服务不可用(503)', handler: undefined },
  '504': { desc: '网络超时(504)', handler: undefined },
  '505': { desc: 'HTTP版本不受支持(505)', handler: undefined },
  default: { desc: 'HTTP版本不受支持(505)', handler: undefined }
}

// http请求拦截器添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    // 数据加载完成前
    // 显示加载提示
    // Vue.$toast.loading({
    //     mask: true,
    //     message: '加载中...'
    // });
    // 在发送请求之前做些什么
    let token = window.localStorage.getItem('token') || ''
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
    alert('请求错误')
    // 对请求错误做些什么
    return Promise.reject(err)
  }
)
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 服务器响应回数据后
    //关闭加载提示
    // Vue.$toast.clear();
    // 业务码统一处理
    if (
      response.status &&
      response.status == 200 &&
      response.data.status == 1 //服务器端返回的错误业务码
    ) {
      // alert(response.data.message); //服务器端返回的错误信息
      return Promise.reject(response.data)
    }
    return response
  },
  err => {
    //关闭加载提示
    // Vue.$toast.clear();
    var config = err.config
    // 当响应异常时做一些处理
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry === undefined) {
      // 对响应错误做点什么
      // 当响应异常时做一些处理
      if (err.response) {
        let status = err.response.status
        if (errMap[status] !== undefined) {
          err.message = errMap[status].desc
          errMap[status].handler && errMap[status].handler()
        } else {
          err.message = errMap['default'].desc
          errMap[status].handler && errMap[status].handler()
        }
      } else {
        err.message = '连接服务器失败!'
      }
      alert(err.message)
      return Promise.reject(err)
    }
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      alert('网络错误')
      return Promise.reject(err)
    }

    // Increase the retry count
    config.__retryCount += 1
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
      setTimeout(function() {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
      return axios(config)
    })
  }
)

export default axios
