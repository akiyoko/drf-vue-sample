import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const userModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    username: '',
    isLoggedIn: false
  },
  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn
  },
  mutations: {
    set (state, payload) {
      state.username = payload.user.username
      state.isLoggedIn = true
    },
    clear (state) {
      state.username = ''
      state.isLoggedIn = false
    }
  }
}

const messagesModule = {
  strict: process.env.NODE_ENV !== 'production',
  namespaced: true,
  state: {
    error: '',
    warnings: [],
    info: ''
  },
  mutations: {
    set (state, payload) {
      if (payload.error) {
        state.error = payload.error
      }
      if (payload.warnings) {
        state.warnings = payload.warnings
      }
      if (payload.info) {
        state.info = payload.info
      }
    },
    clear (state) {
      state.error = ''
      state.warnings = []
      state.info = ''
    }
  },
  actions: {
    setErrorMessage (context, payload) {
      context.commit('clear')
      context.commit('set', { 'error': payload.message })
    },
    setWarningMessages (context, payload) {
      context.commit('clear')
      context.commit('set', { 'warnings': payload.messages })
    },
    setInfoMessage (context, payload) {
      context.commit('clear')
      context.commit('set', { 'info': payload.message })
    },
    clearMessages (context) {
      context.commit('clear')
    }
  }
}

const store = new Vuex.Store({
  modules: {
    user: userModule,
    messages: messagesModule
  }
})

export default store
