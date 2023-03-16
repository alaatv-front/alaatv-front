const mutations = {
  updateShowHamburgerBtn: (state, data) => {
    state.showHamburgerBtn = data
  },
  updateSetList: (state, data) => {
    state.setList = data
  },
  updateTopicList: (state, data) => {
    state.setTopicList = data
  },
  updateSet: (state, data) => {
    state.setList.splice(state.setList.findIndex(set => set.id === data.id), 1, Object.assign(data, state.setList.findIndex(set => set.id === data.id)))
  },
  toggleSetListLoading: (state) => {
    state.setListLoading = !state.setListLoading
  },
  toggleSetLoading: (state) => {
    state.setLoading = !state.setLoading
  }
}

export default mutations
