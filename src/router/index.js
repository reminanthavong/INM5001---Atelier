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
        requiresAuth: true,
        is_admin : true
          }
    },
    {
    path: '/zoneEmploye',
    name: 'zoneEmploye',
    component: ZoneEmploye,
    meta: {
        requiresAuth: true
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
    component: AffichageHoraire,
    meta: {
        requiresAuth: true
          }
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
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (localStorage.getItem('jwt') == null) {
            next({
                path: '/login',
                params: { nextUrl: to.fullPath }
            })
        } else {
            let user = JSON.parse(localStorage.getItem('user'))
            if(to.matched.some(record => record.meta.is_admin)) {
                if(user.is_admin == 1){
                    next()
                }
                else{
                    next('/unauthorized')
                }
            }else {
                next()
            }
        }
    } else {
        next() 
    }
})



export default router
