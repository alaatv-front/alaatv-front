import SEO from './Seo'
import Cart from './Cart'
import Auth from './Auth'
import process from 'process'
import loading from './loading'
import { createStore } from 'vuex'
import AppLayout from './AppLayout'
import PageBuilder from './PageBuilder'
import { store } from 'quasar/wrappers'
import createPersistedState from 'vuex-persistedstate'

const plugins = []

if (process.browser) {
  const vuexPersistedState =
    createPersistedState({
      key: 'vuex',
      storage: window.localStorage,
      fetchBeforeUse: true,
      paths: [
        'Cart',
        'Auth.user',
        'Auth.redirectTo',
        'Auth.accessToken'
      ]
    })

  plugins.push(vuexPersistedState)
}

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */
const debug = false
export default store(function (/* { ssrContext } */) {
  const Store = createStore({
    modules: {
      SEO,
      Cart,
      Auth,
      loading,
      AppLayout,
      PageBuilder
    },
    plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
