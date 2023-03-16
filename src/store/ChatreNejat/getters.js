const getters = {
  pageBuilderEditable: (state) => {
    return state.pageBuilderEditable
  },
  setList: (state) => {
    return state.setList
  },
  setTopicList: (state) => {
    return state.setTopicList
  },
  selectedTopic: (state) => {
    return state.selectedTopic
  },
  setListLoading: (state) => {
    return state.setListLoading
  },
  setLoading: (state) => {
    return state.setLoading
  }
}

export default getters
