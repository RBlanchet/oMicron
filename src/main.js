/** Composants Vue **/
import Vue from 'vue'
import Vuex from 'vuex'

/** Composants **/
import App from './App'

/** Routeur **/
import router from './router'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'

Vue.use(VueMaterial)

/** Icones **/
import "vue-material-design-icons/styles.css"

/** Store **/
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuex)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
