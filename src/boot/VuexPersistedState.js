import { boot } from 'quasar/wrappers'
import merge from 'deepmerge'

const key = process.env.VUEX_PERSISTED_STATE_KEY ? process.env.VUEX_PERSISTED_STATE_KEY : 'vuex'

export default boot(({ store, ssrContext }) => {
  if (ssrContext) {
    return
  }

  const savedStateOnLocalStorage = JSON.parse(window.localStorage.getItem(key))
  if (!savedStateOnLocalStorage) {
    return
  }
  store.replaceState(
    merge(store.state, savedStateOnLocalStorage, {
      arrayMerge: function (store, saved) {
        return saved
      },
      clone: false
    })
  )

  const accessToken = store.getters['Auth/accessToken']
  if (accessToken) {
    store.commit('Auth/updateAxiosAuthorization', accessToken)
  } else {
    console.error('VuexPersistedState boot->Auth/logOut')
    store.dispatch('Auth/logOut')
  }
})
