export function drawer (state) {
  return state.drawer
}

export function appBar (state) {
  return state.appBar
}
export function confirmDialog (state) {
  return state.confirmDialog
}

export function windowSize (state) {
  return state.windowSize
}

export function bubbleSize (state) {
  return state.bubbleSize
}

export function ColumnsWidth (state) {
  return state.ColumnsWidth
}

export function breadcrumbs (state) {
  return state.breadcrumbs
}
export function breadcrumbLoading (state) {
  return state.breadcrumbs.loading
}
export function breadcrumbsVisibility (state) {
  return state.breadcrumbs.visible
}

export function appLayout (state) {
  return state.appLayout
}

export function containerWidth (state){
  // if drawers are visible and not in desktop mode, they will subtract from main windowWidth
  state.containerSize.w = state.windowSize.x;
  if(state.layoutRightDrawerVisible && state.layoutRightDrawerBehavior == 'desktop'){
    state.containerSize.w -= state.rightDrawerWidth
  }
  if(state.layoutLeftDrawerVisible && state.layoutLeftDrawerBehavior == 'desktop'){
    state.containerSize.w -= state.leftDrawerWidth
  }
  if(state.containerSize.w < 0){
    state.containerSize.w = state.windowSize.x
  }
  return state.containerSize.w
}

export function containerHeight (state){
  // since using css on appBar, using querySelector to select main parts and calculate the heights.
  state.containerSize.h = state.windowSize.y;
  if(state.layoutHeader || state.appBar){
    let box = document.querySelector('.main-layout-header')
    if(box){
      let height = box.offsetHeight;
      state.containerSize.h -= height;
    }
  }
  if(state.layoutFooter){
    let box = document.querySelector('.main-layout-footer')
    if(box){
      let height = box.offsetHeight;
      state.containerSize.h -= height;
    }
  }
  return state.containerSize.h

}
