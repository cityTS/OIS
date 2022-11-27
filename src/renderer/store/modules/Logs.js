const state = {
  logList: ''
}

const mutations = {
  ADD_LOG (state, log) {
    state.logList = log + '\n' + state.logList
  },
  CLEAR_LOG (state) {
    state.logList = ''
  }
}

const actions = {
  addLog ({commit}, log) {
    commit('ADD_LOG', log)
  },
  clearLog ({commit}) {
    commit('CLEAR_LOG')
  }
}
export default {
  state,
  mutations,
  actions
}
