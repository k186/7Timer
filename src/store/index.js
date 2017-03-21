import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'
// if global getters and actions is blank just not to import it !
// or ti would catch a error
import Timer from './modules/Timer'

Vue.use(Vuex)

export default new Vuex.Store({
  // actions,
  // getters,
  modules: {
    Timer
  },
  strict: true
})
