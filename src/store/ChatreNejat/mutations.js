const mutations = {
  updateShowHamburgerBtn: (state, data) => {
    state.showHamburgerBtn = data
  },
  updateSetList: (state, data) => {
    state.setList = data
    console.log(state.setList)
  },
  updateTopicList: (state, data) => {
    state.setTopicList = data
    console.log(state.setTopicList)
  }
}

export default mutations
