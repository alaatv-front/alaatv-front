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

export function headerSize (state) {
  return state.headerSize
}

export function containerHeightOffset (state) {
  if (state.layoutHeader || state.appBar) {
    state.containerHeightOffset = state.headerSize.height;
  }
  // implemented when footer part added to project
  // when both are active should be considered separately
  // if (state.layoutFooter) {
  //   let box = document.querySelector('.main-layout-footer')
  //   if (box) {
  //     let height = box.offsetHeight
  //     state.containerHeightOffset = height
  //   }
  // }
  return state.containerHeightOffset
}
