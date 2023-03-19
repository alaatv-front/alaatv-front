export default function Authenticated ({ next, store, to }) {
  const accessToken = store.$accessToken
  if (!accessToken) {
    store.commit('Auth/updateRedirectTo', to)
    return next({ name: 'login' })
  }

  return next()
}
