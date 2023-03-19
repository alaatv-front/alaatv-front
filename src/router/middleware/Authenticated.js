export default function Authenticated ({ next, store, to }) {
  const accessToken = store.$accessToken
  if (!accessToken) {
    store.commit('Auth/updateRedirectTo', { name: to.name, params: to.params })
    return next({ name: 'login' })
  }

  return next()
}
