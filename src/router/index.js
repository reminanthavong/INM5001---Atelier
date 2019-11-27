import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store/index.js'
import Login from '../components/auth/Login.vue'
import Admin from '../components/auth/Admin.vue'
import User from '../components/auth/User.vue'
import GestionEmployes from '../components/resources/GestionEmployes.vue'
import ZoneEmploye from '../components/resources/ZoneEmploye.vue'
Vue.use(VueRouter)

const routes = [
        {
            path: '/',
            name: 'home',
            component: Home
          },
	{
            path: '/admin',
            name: 'admin',
            component: Admin
          },
		{
            path: '/user',
            name: 'user',
            component: User
          },
		{
            path: '/login',
            name: 'login',
            component: Login
          },
	{
    path: '/gestionEmployes',
    name: 'gestionEmployes',
    component: GestionEmployes
  },
	{
    path: '/zoneEmploye',
    name: 'zoneEmploye',
    component: ZoneEmploye
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isLoggedIn) {
          next()
          return
        }
        next('/login')
      } else {
        next()
      }
    })


export default router
