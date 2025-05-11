import Vue from 'vue'
import Vuex from 'vuex'

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
  }
})
