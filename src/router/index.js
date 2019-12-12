import Vue from 'vue'
import VueRouter from 'vue-router'
import home from '../components/home.vue'
//import store from '../store/index.js'
import login from '../components/auth/Login.vue'
import gestionEmployes from '../components/resources/GestionEmployes.vue'
import zoneEmploye from '../components/resources/ZoneEmploye.vue'
import affichageHoraire from '../components/resources/AffichageHoraire.vue'
import gestionHoraire from '../components/resources/GestionHoraire.vue'
import success from '../components/auth/Success.vue'
import unauthorized from '../components/auth/Unauthorized.vue'

Vue.use(VueRouter)

const routes=[ 
    {
    path: '/',
    name: 'home',
    component: home
    },
    {
    path: '/login',
    name: 'login',
    component: login   
    },
    {
    path: '/unauthorized',
    name: 'unauthorized',
    component: unauthorized
    },
    {
    path: '/gestionEmployes',
    name: 'gestionEmployes',
    component: gestionEmployes,  
    meta: {
        requiresAuth: true
          }
    },
    {
    path: '/zoneEmploye',
    name: 'zoneEmploye',
    component: zoneEmploye,
    meta: {
        isUser: true
          }  
    },
{
    path: '/gestionHoraire',
    name: 'gestionHoraire',
    component: gestionHoraire,
    meta: {
        requiresAuth: true
          }
},
{
    path: '/affichageHoraire',
    name: 'affichageHoraire',
    component: affichageHoraire
},
{
    path: '/success',
    name: 'success',
    component: success
}] 

const router=new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          //alert(localStorage.getItem('user'))
         //console.log(store.getters.isAdmin)
         // alert(store.getters.isAdmin)
        if (JSON.parse(localStorage.getItem('admin'))) {
            //alert('Condition passer')
          next()
           return
        }       
       // alert('Condition fail')  
          next('/unauthorized')   
      } else if (to.matched.some(record => record.meta.isUser)){
           if (JSON.parse(localStorage.getItem('user'))) {
            //alert('Condition passer')
          next()
           return
        }       
        //  alert('Condition bypasser')
        next('/unauthorized')
      } else {
      next()
      }
    })
export default router
