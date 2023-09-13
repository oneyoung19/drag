import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Scroll from '../views/Scroll.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/scroll',
    name: 'scroll',
    component: Scroll
  },
  {
    path: '/rough-pdf',
    name: 'RoughPdf',
    component: () => import('@/views/RoughPdf')
  },
  {
    path: '/pdf',
    name: 'Pdf',
    component: () => import('@/views/Pdf')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
