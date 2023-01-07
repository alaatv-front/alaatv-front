import Cart from './Cart'
import Auth from './Auth'
import * as shvl from 'shvl'
import process from 'process'
import loading from './loading'
import { createStore } from 'vuex'
import AppLayout from './AppLayout'
import { store } from 'quasar/wrappers'
import createPersistedState from 'vuex-persistedstate'

const plugins = []

if (process.browser) {
  const localStorageKey = 'vuex'
  const createPersistedStatePathes = [
    'Cart',
    'Auth.user',
    // 'Auth.redirectTo',
    'Auth.accessToken'
    // 'AppLayout',
  ]
  const vuexPersistedState =
    createPersistedState({
      key: localStorageKey,
      storage: window.localStorage,
      overwrite: true,
      reducer: function (state, paths) {
        if (Array.isArray(paths)) {
          const localStorageValue = JSON.parse(window.localStorage.getItem(localStorageKey))
          createPersistedStatePathes.forEach(item => {
            const localStorageItemValue = shvl.get(localStorageValue, item)
            if (localStorageItemValue) {
              shvl.set(state, item, localStorageItemValue)
            }
          })
          return paths.reduce(function (substate, path) {
            const localStorageValue = JSON.parse(window.localStorage.getItem(localStorageKey))
            const localStoragePathValue = shvl.get(localStorageValue, path)
            const statePathValue = shvl.get(state, path)
            const pathValue = statePathValue || localStoragePathValue
            return shvl.set(substate, path, pathValue)
          }, {})
        }

        return state
      },
      paths: createPersistedStatePathes
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
      Auth,
      loading,
      AppLayout,
      Cart
    },
    plugins,
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
