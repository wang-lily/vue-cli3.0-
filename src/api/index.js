import axios from '@/axios'
export const __transfer_launch_detail = function(params = {}) {
  return axios.get("/api/home/product/transfer/launch-detail", {params})
}

export const __transfer_sell_dissent = function (params = {}) {
  return axios.post('/api/home/product/transfer/sell-dissent', params)
}