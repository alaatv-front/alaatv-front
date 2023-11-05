export default function Authenticated (withDialog = false) {
  return function ({ next, store, to }) {
    const accessToken = store.$accessToken
    // const hasSessionToken = Object.keys(store.$sessions).filter(sessionName => !!store.$sessions[sessionName]).length === Object.keys(store.$sessions).length

    // if (!accessToken || !hasSessionToken) {
    if (!accessToken) {
      store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params, query: to.query })
      if (!withDialog) {
        return next({ name: 'login' })
      } else {
        if (typeof window !== 'undefined') {
          setTimeout(() => {
            store.commit('AppLayout/updateLoginDialog', true)
            store.commit('AppLayout/updateLoginDialogPersistent', true)
          }, 1000)
        }
      }
    } else {
      store.commit('AppLayout/updateLoginDialog', false)
      store.commit('AppLayout/updateLoginDialogPersistent', false)
    }

    return next()
  }
}
