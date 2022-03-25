import { set, get } from './../../utils/storage'
const TOKEN_KEY = 'toutiao_user'
export default {
  namespaced: true,
  state: {
    users: get(TOKEN_KEY) || {}
  },
  mutations: {
    setToken (state, payload) {
      state.users = payload
      // 持久化用户数据
      set(TOKEN_KEY, state.users)
    }
  },
  actions: {}
}
