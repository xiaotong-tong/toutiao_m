import Vue from 'vue'
import App from './App.vue'
// 导入router
import router from './router'
// 导入 vuex
import store from './store'
// 导入 vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 导入自己的css规则
import './style/index.scss'
// 导入flexible
import 'amfe-flexible'
// 导入dayjs
import './utibs/dayjs'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
