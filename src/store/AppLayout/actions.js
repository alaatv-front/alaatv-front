const actions = {
  showConfirmDialog: (context, newInfo) => {
    context.commit('AppLayout/showConfirmDialog', newInfo)
  }
}

export default actions
