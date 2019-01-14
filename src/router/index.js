import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/Index'
import Personnalisation from '@/views/Personnalisation'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/personnalisation',
      name: 'Personnalisation',
      component: Personnalisation
    }
  ]
})
