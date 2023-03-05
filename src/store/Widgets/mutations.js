export function updateData(state, newData) {
  const widgetName = newData.name
  const widgetData = newData.data
  if (!widgetName) {
    return
  }
  state.data[widgetName] = widgetData
}
