import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({ key: 'bibliotecaonline', storage: localStorage })

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
  state: {
    token: null,
    permissao: null,
    isLogged: false
  },
  getters: {
    getToken (state) {
      return state.token
    },
    getPermissao (state) {
      return state.permissao
    }
  },
  mutations: {
    setToken (state, payload) {
      state.isLogged = payload.isLogged
      state.token = payload.token
    },
    setPermissao (state, payload) {
      state.permissao = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
