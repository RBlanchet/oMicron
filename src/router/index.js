import Vue from 'vue'
import Router from 'vue-router'

/** Vue **/
import Listing from '@/views/Listing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Listing',
      component: Listing
    }
  ]
})
