// 安装并导入axios
import axios from 'axios'
import store from '@/store'
import JSONbig from 'json-bigint'
// 创建axios实例， 并自定义url
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/',
  transformResponse: [function (data) {
    try {
      // 如果转换成功则返回转换的数据结果
      return JSONbig.parse(data)
    } catch (err) {
      // 如果转换失败，则包装为统一数据格式并返回
      return data
    }
  }]
})
request.interceptors.request.use((config) => {
  if (store.state.user && store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
export default request
