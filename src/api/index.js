import axios from '@/axios'
export const __transfer_launch_detail = function(params = {}) {
  return axios.get('/api/home/product/transfer/launch-detail', { params })
}

export const __transfer_sell_dissent = function(params = {}) {
  return axios.post('/api/home/product/transfer/sell-dissent', params)
}

export const __test = function(params = {}) {
  return axios.get('https://wygc.longfor.com/cgiapi/shost.do', { params })
}
