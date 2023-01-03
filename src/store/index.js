import Cart from 'src/store/Cart'
import Auth from 'src/store/Auth'
import { createStore } from 'vuex'
import loading from 'src/store/loading'
import { store } from 'quasar/wrappers'
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
      AppLayout,
      Cart
    },
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: debug
  })

  return Store
})
