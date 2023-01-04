const actions = {
  updateAppBarAndDrawer: (context, newInfo) => {
    context.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
    context.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
  },
  showConfirmDialog: (context, newInfo) => {
    context.commit('AppLayout/showConfirmDialog', newInfo)
  },
  updateTemplateLayout: (context, newInfo) => {
    if (newInfo.layoutHeaderType !== undefined) {
      context.commit('AppLayout/changeTemplateHeaderType', newInfo.layoutHeaderType, { root: true })
    }
    if (newInfo.layoutLeftSideBarType !== undefined) {
      context.commit('AppLayout/changeTemplateLeftSideBarType', newInfo.layoutLeftSideBarType, { root: true })
    }
    if (newInfo.layoutRightSideBarType !== undefined) {
      context.commit('AppLayout/changeTemplateRightSideBarType', newInfo.layoutRightSideBarType, { root: true })
    }
    if (newInfo.layoutLeftDrawerWidth !== undefined) {
      context.commit('AppLayout/changeTemplateLeftSideBarWidth', newInfo.layoutLeftDrawerWidth, { root: true })
    }
    context.dispatch('AppLayout/updateStore', newInfo, { root: true })
  }
}

export default actions
