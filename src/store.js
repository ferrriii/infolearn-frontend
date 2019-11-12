import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/modules/axios.js'
import jwtDecode from '@/modules/jwt.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deviceId: localStorage.getItem('deviceId'),
    token: localStorage.getItem('token')
  },
  getters: {
    userId: (state) => jwtDecode(state.token).sub,
    isAuthorized: (state, getters) => getters.userId !== undefined
    // isLoggedIn: (state, getters) => getters.userId !== undefined
  },
  mutations: {
    setToken: (state, { token }) => {
      state.token = token
    },
    setDeviceID: (state, { deviceId }) => {
      state.deviceId = deviceId
    }
  },
  actions: {
    loadStates ({ commit, dispatch }) {
      let deviceId = localStorage.getItem('deviceId')
      let token = localStorage.getItem('token')
      dispatch('updateDeviceId', { deviceId })
      dispatch('updateToken', { token })
    },
    async register ({ commit, dispatch }, { deviceId }) {
      try {
        let response = await http.post('/register', { deviceId })
        let body = response.data
        let token = body.data.token
        // let name = tryJwtDecode(token).name
        // let email = tryJwtDecode(token).email
        let updateDevieIdPromise = dispatch('updateDeviceId', { deviceId })
        let updateTokenPromise = dispatch('updateToken', { token })
        await Promise.all([updateDevieIdPromise, updateTokenPromise])
      } catch (err) {
        return Promise.reject(
          err.response ? err.response.data.error.msg : err.message
        )
      }
    },
    async updateDeviceId ({ commit }, { deviceId }) {
      localStorage.setItem('deviceId', deviceId)
      await commit('setDeviceID', { deviceId })
    },
    async updateToken ({ commit }, { token }) {
      http.defaults.headers.authorization = 'Bearer ' + token
      localStorage.setItem('token', token)
      await commit('setToken', { token })
    }
  }
})
