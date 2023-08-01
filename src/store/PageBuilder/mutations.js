const mutations = {
  updatePageBuilderLoading: (state, newInfo) => {
    state.pageBuilderLoading = newInfo
  },
  updatePageDataLoaded: (state, newInfo) => {
    state.pageDataLoaded = newInfo
  },
  updatePageBuilderEditable: (state, newInfo) => {
    state.pageBuilderEditable = newInfo
  },
  updateInitialSections: (state, newInfo) => {
    state.initialSections = newInfo
  },
  updateCurrentSections: (state, newInfo) => {
    state.currentSections = newInfo
  },
  updateMenuItems: (state, newInfo) => {
    state.menuItems = newInfo
  }
}

export default mutations
