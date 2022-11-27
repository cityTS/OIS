const state = {
  name: undefined,
  studentNumber: undefined,
  examinationId: undefined
}

const mutations = {
  SET_TOKEN (state, [name, studentNumber, examinationId]) {
    state.name = name
    state.studentNumber = studentNumber
    state.examinationId = examinationId
  },
  CLEAR_TOKEN (state) {
    console.log(111)
    state.name = undefined
    state.studentNumber = undefined
    state.examinationId = undefined
  }
}
const actions = {
  setToken ({commit}, token) {
    commit('SET_TOKEN', token)
  },
  clearToken ({commit}) {
    commit('CLEAR_TOKEN')
  }
}
export default {
  state,
  mutations,
  actions
}
