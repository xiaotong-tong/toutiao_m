// 安装并导入axios
import axios from 'axios'
import store from '@/store'
// 创建axios实例， 并自定义url
const request = axios.create(({
  baseURL: 'http://ttapi.research.itcast.cn/'
}))
request.interceptors.request.use((config) => {
  if (store.state.user && store.state.user.token) {
    config.headers.Authorization = `Bearer ${store.state.user.token}`
  }
  return config
}, (error) => {
  return Promise.reject(error)
})
export default request
