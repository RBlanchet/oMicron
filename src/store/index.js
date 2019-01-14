/**
 * Vue X
 *
 * Un store permet d'initialiser un "magasin" de données, ces données pourront être accessible de partout sur
 * l'application.
 *
 */

/** Composants Vue **/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

/** Modules du store **/
import Config from "./modules/config"

export default new Vuex.Store({
  // Importer les modules ICI
  modules: {
    Config
  },
})
