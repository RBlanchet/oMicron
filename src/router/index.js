import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Tuto from '@/views/Tuto'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/tuto',
      name: 'Tuto',
      component: Tuto
    }
  ]
})
