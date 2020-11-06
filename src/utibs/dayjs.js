// 导入dayjs
import dayjs from 'dayjs'
import Vue from 'vue'
// 导入中文版本
import 'dayjs/locale/zh-cn'

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

// 全局挂载
dayjs.locale('zh-cn')
Vue.filter('relativeTime', value => {
  return dayjs().to(dayjs(value))
})
