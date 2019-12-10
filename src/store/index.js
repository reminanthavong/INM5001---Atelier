import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

    Vue.use(Vuex)
    export default new Vuex.Store({
      state: {
      status: '',
      token: localStorage.getItem('token') || '',
      admin: localStorage.getItem('admin') || '',
      user: localStorage.getItem('user') || ''
      },
      mutations: {
           auth_request(state) {
            state.status = 'loading'
          },
          auth_success(state, token, admin,user) {
            state.status = 'success'
            state.token = token
            state.admin = admin
            state.user = user
          },
          auth_error(state) {
            state.status = 'error'
          },
          logout(state) {
            state.status = ''
            state.token = ''
            state.user = ''
            state.admin = ''
          }
      },
      actions: {
          login({ commit }, user) {
            return new Promise((resolve, reject) => {
              commit('auth_request')
              axios({ url: '/login', data: user, method: 'POST' })
                .then(resp => {
                  const token = resp.data.token
                  const admin = resp.data.user.admin
                  const user = resp.data.user.user
                  localStorage.setItem('token', token)
                  localStorage.setItem('user', user)
                  localStorage.setItem('admin', admin)
                  // Add the following line:
                  axios.defaults.headers.common['Authorization'] = token
                  commit('auth_success', token, admin,user)
                  resolve(resp)
                })
                .catch(err => {
                  commit('auth_error')
                  alert("Mauvais utilisateur ou mot de passe.");
                  localStorage.removeItem('token')
                  reject(err)
                })
            })
          },
          logout({ commit }) {
            return new Promise((resolve) => {
              commit('logout')
              localStorage.removeItem('token')
                localStorage.removeItem('user')
              delete axios.defaults.headers.common['Authorization']
              resolve()
            })
          }
      },
      getters: {
      isLoggedIn: state => !!state.token,
      authStatus: state => state.status,
      isAdmin: state => {return state.user},
      isUser: state => {return state.admin}
      }
    })
