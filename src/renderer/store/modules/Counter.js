const state = {
  main: 0,
  recorder: undefined
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  SET_RECORDER (state, recorder) {
    state.recorder = recorder
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  setRecorder ({commit}, data) {
    commit('SET_RECORDER', data)
  }
}

export default {
  state,
  mutations,
  actions
}
