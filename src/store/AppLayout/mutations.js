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
  updateLoginDialogPersistent: (state, newInfo) => {
    state.loginDialogPersistent = newInfo
  },
  updateLayoutHeaderType: (state, newInfo) => {
    state.layoutHeaderType = newInfo
  },
  updateLayoutLeftSideBarType: (state, newInfo) => {
    state.layoutLeftSideBarType = newInfo
  },
  updateLayoutRightSideBarType: (state, newInfo) => {
    state.layoutRightSideBarType = newInfo
  },
  updateLayoutFooterType: (state, newInfo) => {
    state.layoutFooterType = newInfo
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
  updateShowHamburgerBtn: (state, data) => {
    state.showHamburgerBtn = data
  }
  // updateAppLayout: (state, data) => {
  //   const storage = JSON.parse(localStorage.getItem('vuex'))
  //   Object.assign(storage.AppLayout, data)
  //   Object.assign(state, storage.AppLayout)
  // }
}

export default mutations
