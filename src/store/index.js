import Vue from 'vue'
import Vuex from 'vuex'
import { setItem, getItem } from '@/utibs/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('token_user'),
    routerBackFlag: false
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('token_user', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
