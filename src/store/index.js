import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
      status: '',
        token: localStorage.getItem('token') || '',
        user: {},
        isAdmin: false
      },
      mutations: {
           auth_request(state) {
            state.status = 'loading'
          },
          auth_success(state, token, user, admin) {
            state.status = 'success'
            state.token = token
            state.user = user
            state.isAdmin = admin
          },
          auth_error(state) {
            state.status = 'error'
          },
          logout(state) {
            state.status = ''
            state.token = ''
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
                  const admin = user.typeutilisateur
                  var isAdmin = false
                  if (admin == 1 || admin == "1"){isAdmin=true}
                  localStorage.setItem('token', token)
                  // Add the following line:
                  axios.defaults.headers.common['Authorization'] = token
                  commit('auth_success', token, user,isAdmin)
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
      userStatus: state => {
      return state.isAdmin
    }
      }
    })
