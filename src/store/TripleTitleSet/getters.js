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
  },
  productLoading: (state) => {
    return state.productLoading
  },
  selectedProduct: (state) => {
    return state.selectedProduct
  },
  selectedContent: (state) => {
    return state.selectedContent
  },
  selectedSet: (state) => {
    return state.selectedSet
  }
}

export default getters
