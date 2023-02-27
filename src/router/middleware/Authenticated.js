export default function Authenticated (
  /* { to, from, next, store } */ { next, store, to }
) {
  if (!process.env.SERVER && !store.getters['Auth/accessToken']) {
    store.commit('Auth/updateRedirectTo', to.name)
    return next({ name: 'login' })
  }

  return next()
}
