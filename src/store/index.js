import Vue from 'vue'
import Vuex from 'vuex'
import user from './module/user'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
    users: state => state.user.users
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
