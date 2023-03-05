export function data (state) {
  return (widgetName) => {
    return state.data[widgetName]
  }
}
