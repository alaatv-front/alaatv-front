export function drawer (state) {
  return state.drawer
}

export function pageBuilderEditable (state) {
  return state.pageBuilderEditable
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

export function templateHeaderType (state) {
  return state.templateHeaderType
}

export function templateLeftSideBarType (state) {
  return state.templateLeftSideBarType
}

export function templateRightSideBarType (state) {
  return state.templateRightSideBarType
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

export function headerSize (state) {
  return state.headerSize
}

export function calculateContainerFullHeight (state) {
  let offset = 0
  // if there is a header
  if (state.layoutHeader || state.appBar) {
    offset = state.headerSize.height
  }
  // implemented when footer part added to project
  const calculatedHeight = `calc(100vh - ${offset}px)`
  return calculatedHeight
}
