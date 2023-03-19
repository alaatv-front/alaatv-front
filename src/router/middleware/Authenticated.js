export default function Authenticated (
  /* { to, from, next, store } */ { next, store, to }
) {
  if (!process.env.SERVER && !store.getters['Auth/accessToken']) {
    store.commit('Auth/updateRedirectTo', to)
    // return next({ name: 'login' })
    setTimeout(() => {
      next({ name: 'login' })
    }, 500)
    return next()
  }

  return next()
}
