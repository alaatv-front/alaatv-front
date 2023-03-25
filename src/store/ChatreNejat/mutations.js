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
  updateSelectedTopic: (state, data) => {
    state.selectedTopic = data
  },
  updateSet: (state, data) => {
    state.setList.find(set => set.id === data.setId).contents.list = data.data.list
  },
  toggleSetListLoading: (state) => {
    state.setListLoading = !state.setListLoading
  },
  toggleSetLoading: (state) => {
    state.setLoading = !state.setLoading
  },
  setSelectedProduct: (state, data) => {
    state.selectedProduct = data
  },
  setSelectedContent: (state, data) => {
    state.selectedContent = data
  },
  setSelectedSet: (state, data) => {
    state.selectedSet = data
  }
}

export default mutations
