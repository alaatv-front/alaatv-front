export default function auth (/* { to, from, next, store } */ { next, store, to }) {
  if (!store.getters['Auth/accessToken']) {
    store.commit('Auth/updateRedirectTo', to.name)
    return next({ name: 'login' })
  }
  return next()
}
