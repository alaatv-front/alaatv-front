const mutations = {
  updateLinearLoading: (state, newInfo) => {
    state.linearLoading = !!newInfo
  },
  updatePageBuilderEditable: (state, newInfo) => {
    state.pageBuilderEditable = !!newInfo
  },
  updateWindowSize: (state, newInfo) => {
    state.windowSize.x = newInfo.width
    state.windowSize.y = newInfo.height
  },
  updateBubbleSize: (state, newInfo) => {
    state.bubbleSize = newInfo
  },
  updateLoginDialog: (state, newInfo) => {
    state.loginDialog = newInfo
  },
  changeTemplateHeaderType: (state, newInfo) => {
    state.templateHeaderType = newInfo
  },
  changeTemplateLeftSideBarType: (state, newInfo) => {
    state.templateLeftSideBarType = newInfo
  },
  changeTemplateRightSideBarType: (state, newInfo) => {
    state.templateRightSideBarType = newInfo
  },
  showConfirmDialog: (state, newInfo) => {
    state.confirmDialog = newInfo
  },
  updateBreadcrumbs: (state, data) => {
    Object.assign(state.breadcrumbs, data)
  },
  updateBreadcrumbLoading: (state, data) => {
    state.breadcrumbs.loading = data
  },
  updateLastBreadcrumb: (state, data) => {
    state.breadcrumbs.path[state.breadcrumbs.path.length - 1] = data
  },
  updateVisibilityBreadcrumb: (state, data) => {
    state.breadcrumbs.visible = data
  },
  updateHeaderSize: (state, data) => {
    Object.assign(state.headerSize, data)
  },
  updateAppLayout: (state, data) => {
    const storage = JSON.parse(localStorage.getItem('vuex'))
    Object.assign(storage.AppLayout, data)
    Object.assign(state, storage.AppLayout)
  }
}

export default mutations
