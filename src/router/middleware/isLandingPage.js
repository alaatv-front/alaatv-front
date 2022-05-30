const dynamicPages = [
  '30'
]
export default function auth (/* { to, from, next, store } */ { to, from, next }) {
  if (!dynamicPages.includes(to.params.page_name)) {
    return next({ name: 'NotFound' })
  }
  return next()
}
