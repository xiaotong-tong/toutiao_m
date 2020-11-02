// 安装并导入axios
import axios from 'axios'
// 创建axios实例， 并自定义url
const request = axios.create(({
  baseURL: 'http://ttapi.research.itcast.cn/'
}))

export default request
