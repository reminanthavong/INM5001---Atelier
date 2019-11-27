import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import router from './router'
import store from './store'
import Axios from 'axios'

Vue.use(BootstrapVue)
Vue.config.productionTip = false


      Vue.prototype.$http = Axios;
      const token = localStorage.getItem('token');
      if (token) {
        Vue.prototype.$http.defaults.headers.common['Authorization'] = token
      }
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
