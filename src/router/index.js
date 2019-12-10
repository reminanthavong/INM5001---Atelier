import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
//import store from '../store/index.js'
import Login from '../components/auth/Login.vue'
import GestionEmployes from '../components/resources/GestionEmployes.vue'
import ZoneEmploye from '../components/resources/ZoneEmploye.vue'
import AffichageHoraire from '../components/resources/AffichageHoraire.vue'
import GestionHoraire from '../components/resources/GestionHoraire.vue'
import Success from '../components/auth/Success.vue'
import Unauthorized from '../components/auth/Unauthorized.vue'

Vue.use(VueRouter)

const routes=[ 
    {
    path: '/',
    name: 'home',
    component: Home
    },
    {
    path: '/login',
    name: 'login',
    component: Login   
    },
    {
    path: '/unauthorized',
    name: 'unauthorized',
    component: Unauthorized
    },
    {
    path: '/gestionEmployes',
    name: 'gestionEmployes',
    component: GestionEmployes,  
    meta: {
        requiresAuth: true
          }
    },
    {
    path: '/zoneEmploye',
    name: 'zoneEmploye',
    component: ZoneEmploye,
    meta: {
        isUser: true
          }    
    },
{
    path: '/gestionHoraire',
    name: 'gestionHoraire',
    component: GestionHoraire,
    meta: {
        requiresAuth: true
          }
},
{
    path: '/affichageHoraire',
    name: 'affichageHoraire',
    component: AffichageHoraire
},
{
    path: '/success',
    name: 'success',
    component: Success
}] 

const router=new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
      if (to.matched.some(record => record.meta.requiresAuth)) {
          //alert(localStorage.getItem('user'))
         // console.log(store.getters.userData)
        if (localStorage.getItem('user') == 'true') {
            //alert('Condition passer')
          next()
           return
        }
        
        else{
        if (to.matched.some(record => record.meta.isUser)) {
          //alert(localStorage.getItem('user'))
         // console.log(store.getters.userData)
        if (localStorage.getItem('user') == 'false') {
            //alert('Condition passer')
          next()
           return
        }
      } 
        }
        
        
       // alert('Condition fail')  
          next('/unauthorized')   
      } else {
        //  alert('Condition bypasser')
        next()
      }
    })
export default router
