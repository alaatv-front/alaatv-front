const getters = {
  pageDataLoaded: (state) => {
    return state.pageDataLoaded
  },
  pageBuilderLoading: (state) => {
    return state.pageBuilderLoading
  },
  pageBuilderEditable: (state) => {
    return state.pageBuilderEditable
  },
  initialSections: (state) => {
    return state.initialSections
  },
  currentSections: (state) => {
    return state.currentSections
  },
  menuItems: (state) => {
    return state.menuItems
  }
}

export default getters
