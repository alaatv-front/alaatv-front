export default function auth (permission) {
  return ({ next, store, to }) => {
    const user = store.getters['Auth/user']
    if (!user.hasPermission(permission)) {
      return next({ name: 'login' })
    }

    return next()
  }
}
