
import {createRouter, createWebHistory} from 'vue-router'
import headerC from '@/components/layout/headerC.vue';


const routes = [
  {
    path: '/',
    name: 'headerC',
    component: headerC
  },
  {
    path: '/register',
    name: 'registerC',
    component: () => import(/* webpackChunkName: "login" */ '../components/registerC.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../components/loginC.vue')
  }
]

const router = new createRouter({
    history: createWebHistory(),
  routes,
})

export default router;