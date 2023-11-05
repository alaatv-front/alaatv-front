import { boot } from 'quasar/wrappers'
import { createMetaMixin } from 'quasar'

export default boot(({ app, router }) => {
  function hasEwanoQuery (route) {
    return route.query.ewano && route.query.ewano.toString() === '1'
  }

  function currentRouteHasEwanoQuery () {
    if (typeof window === 'undefined') {
      return false
    }
    return window.location.search.indexOf('ewano=1') > 0
  }

  function isLoadedEwanoLibrary () {
    if (typeof window === 'undefined') {
      return false
    }
    return !!window.ewano
  }

  router.beforeEach((to, from, next) => {
    console.warn('beforeEach route to: ', to)
    console.warn('beforeEach route from: ', from)
    console.warn('beforeEach currentRouteHasEwanoQuery: ', currentRouteHasEwanoQuery())

    if (currentRouteHasEwanoQuery() && !isLoadedEwanoLibrary()) {
      console.warn('add Ewano library from cdn')
      app.mixin(
        createMetaMixin(function () {
          return {
            // whenever "title" from above changes, your meta will automatically update
            script: {
              evano: {
                src: 'https://static-ebcom.mci.ir/static/ewano/assets/ewano-web-toolkit-v1.min.js',
                defer: true
              }
            }
          }
        })
      )
    }

    if (!hasEwanoQuery(to) && hasEwanoQuery(from)) {
      to.query.ewano = 1
      next({ name: to.name, params: to.params, query: to.query })
    } else {
      next()
    }
  })
})
