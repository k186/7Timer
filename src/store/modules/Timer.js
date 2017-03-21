import * as TYPE from '../mutation-types'

const state = {
  Timer7: {
    options: {
      lat: '',
      lon: '',
      ac: 0,
      lang: 'zh-CN',
      unit: 'metric',
      output: 'internal',
      tzshift: 0
    }
  }
}
/* api getters can use all */
const getters = {
  Timer7: state => state.Timer7
}
const mutations = {
  [TYPE.TIMER_7_UPDATE] (state, {options}) {
    for (let k in options) {
      state.Timer7.options[k] = options[k]
    }
  }
}
const actions = {
  timer7Update ({commit}, {options}) {
    commit(TYPE.TIMER_7_UPDATE, {options})
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
