import { Loading, uid } from 'quasar'

const mixinPrefetchServerData = {
  data() {
    return {
      widgetUid: null
    }
  },
  serverPrefetch () {
    return this.prefetchServerData(true)
  },
  mounted () {
    return this.prefetchServerData(false)
  },
  methods: {
    prefetchServerData(prefetch) {
      const widgetName = this.$options.name
      if (prefetch) {
        this.widgetUid = uid()
        this.$store.dispatch('Widgets/addWidgetData', {
          data: null,
          name: widgetName,
          uid: this.widgetUid
        })
        Loading.show()
        return this.prefetchServerDataPromise()
          .then((data) => {
            this.$store.commit('Widgets/updateDataByUid', {
              data,
              name: widgetName,
              uid: this.widgetUid
            })
            this.prefetchServerDataPromiseThen(data)
            Loading.hide()
          })
          .catch((error) => {
            this.prefetchServerDataPromiseCatch(error)
            Loading.hide()
          })
      } else {
        this.$store.dispatch('Widgets/getWidgetData', { name: widgetName })
          .then(item => {
            if (!item || !item.widgetData) {
              this.prefetchServerDataPromise()
                .then((data) => {
                  this.prefetchServerDataPromiseThen(data)
                  Loading.hide()
                })
                .catch((error) => {
                  this.prefetchServerDataPromiseCatch(error)
                  Loading.hide()
                })
            } else {
              this.prefetchServerDataPromiseThen(item.widgetData)
            }
          })
      }
    },
    prefetchServerDataPromise () {
      return Promise.resolve()
    },
    prefetchServerDataPromiseThen (data) {
    },
    prefetchServerDataPromiseCatch () {
    }
  }
}

export default mixinPrefetchServerData
