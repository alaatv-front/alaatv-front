import state from './state.js'
import getters from './getters.js'
import mutations from './mutations.js'
import actions from './actions.js'
const assignedState = Object.assign({}, state)
const assignedGetters = Object.assign({}, getters)
const assignedMutations = Object.assign({}, mutations)
const assignedActions = Object.assign({}, actions)

export default {
  namespaced: true,
  state: assignedState,
  getters: assignedGetters,
  mutations: assignedMutations,
  actions: assignedActions
}
