/**
 * Auth middleware example.
 */
export default function auth (/* { to, from, next, store } */ { next, store }) {
  // console.log('to', to)
  // console.log('from', from)
  // console.log('next', next)
  if (!store.getters['Auth/accessToken']) {
    console.log('middleware auth redirect to login ############################')
    // return next({ name: 'login' })
  }
  console.log('middleware auth next ************************************')
  return next()
}
