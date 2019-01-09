// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

/*import { MdCard, MdCardActions, MdButton, MdCardMedia } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdCardActions)
Vue.use(MdCardMedia)
Vue.config.productionTip = false*/

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
 
Vue.use(VueMaterial)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
