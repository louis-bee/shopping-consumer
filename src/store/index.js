import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cartNum: parseInt(localStorage.getItem('cartNum')) || 0
  },
  getters: {
    cartNum (state) {
      return state.cartNum
    }
  },
  mutations: {
    setCartNum (state, payload) {
      state.cartNum = payload
      localStorage.setItem('cartNum', payload)
    }
  },
  actions: {
    // logout (context) {
    //   context.commit('setCartNum', 0)
    // }
  }
  // plugins: [createPersistedState()]
})
