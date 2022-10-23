export function updateAppBarAndDrawer (context, newInfo) {
  this.commit('AppLayout/updateLayoutHeaderVisible', newInfo)
  this.commit('AppLayout/updateLayoutLeftDrawerVisible', newInfo)
}
export function showConfirmDialog (context, newInfo) {
  this.commit('AppLayout/showConfirmDialog', newInfo)
}
export function updateTemplateLayout (context, newInfo) {
  if (newInfo.layoutHeaderType !== undefined) {
    this.commit('AppLayout/changeTemplateHeaderType', newInfo.layoutHeaderType)
  }
  if (newInfo.layoutLeftSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateLeftSideBarType', newInfo.layoutLeftSideBarType)
  }
  if (newInfo.layoutRightSideBarType !== undefined) {
    this.commit('AppLayout/changeTemplateRightSideBarType', newInfo.layoutRightSideBarType)
  }
  this.dispatch('AppLayout/updateStore', newInfo)
}
