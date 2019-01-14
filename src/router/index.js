import Vue from 'vue'
import Router from 'vue-router'

/** Vue **/
import Listing from '@/views/Listing'
import Tuto from '@/views/Tuto'
import Test from '@/views/test'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Listing',
      component: Listing
    },
    {
      path: '/tuto',
      name: 'Tuto',
      component: Tuto
    },
    {
      path: '/test',
      name: 'Test',
      component: Test
    }
  ]
})
