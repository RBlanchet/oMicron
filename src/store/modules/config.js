
/** C'est l'endroit ou est stocké les données du store pour ce module **/
const state = {
  config: null,
}

/** Ce sont les actions qui sont appelés pendant le cylce de vie de l'application **/
const actions = {
  /**
   * Retourne une promesse quand la config sera initialisé
   *
   * @param commit
   */
  attribuerConfig({ commit }) {
    return new Promise((resolve => {
      // Chargement du fichier de config
      let config = require('../../config/config')

      commit('SET_CONFIG', config)
      resolve(true)
    }))
  }
}


/** Les mutations sont appelées en interne du module et permette de changer un state **/
const mutations = {
  SET_CONFIG(state, config) {
    state.config = config
  }
}

export default {
  // Permet d'appeler sous la forme {module}/{action}
  namespaced: true,
  state,
  actions,
  mutations
}
