import process from 'process'
import { store } from 'quasar/wrappers'
import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

const plugins = []

if (process.browser) {
  const vuexPersistedState =
    createPersistedState({
      // storage: window.localStorage,
      paths: [
        'Auth.accessToken',
        'Auth.user',
        'AppLayout'
      ]
    })

  plugins.push(vuexPersistedState)
}

import Auth from 'src/store/Auth'
import loading from 'src/store/loading'
import AppLayout from 'src/store/AppLayout'

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
      Auth,
      loading,
      AppLayout
    },
    plugins: plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
