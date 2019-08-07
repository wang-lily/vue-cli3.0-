import axios from '@/axios'
import { USER } from './params_map'

//API
export const __post_status = function(params = {}) {
  let data = {}
  params.name && (data[USER.name] = params.name)
  params.phone && (data[USER.phone] = params.phone)
  params.email && (data[USER.email] = params.email)
  return axios.post('/api/user/do_something', data)
}
export const __get_status = function(params = {}) {
  let data = {}
  params.name && (data[USER.name] = params.name)
  params.phone && (data[USER.phone] = params.phone)
  params.email && (data[USER.email] = params.email)
  return axios.get('/api/user/do_something', { params: data })
}
