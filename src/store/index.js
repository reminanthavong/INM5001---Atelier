import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
      status: '',
        token: localStorage.getItem('token') || '',
        user: false,
        admin: false  
      },
      mutations: {
           auth_request(state) {
            state.status = 'loading'
          },
          auth_success(state, token, user, admin) {
            state.status = 'success'
            state.token = token
            state.user = user
            state.admin = admin
          },
          auth_error(state) {
            state.status = 'error'
          },
          logout(state) {
            state.status = ''
            state.token = ''
            state.user = false
            state.admin = false
          }
      },
      actions: {
          login({ commit }, user) {
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({ url: '/login', data: user, method: 'POST' })
                .then(resp => {
                  const token = resp.data.token
                  const user = resp.data.user
                  const admin = resp.data.admin
                  localStorage.setItem('token', token)
                  // Add the following line:
                  axios.defaults.headers.common['Authorization'] = token
                  commit('auth_success', token, user, admin)
                  resolve(resp)
                })
                .catch(err => {
                  commit('auth_error')
                  localStorage.removeItem('token')
                  reject(err)
                })
            })
          },
          logout({ commit }) {
            return new Promise((resolve) => {
              commit('logout')
              localStorage.removeItem('token')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
          }
      },
      getters: {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      userStatus: state => state.user,
      adminStatus: state => state.admin
      }
    })
