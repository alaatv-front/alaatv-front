<template>
  <div id="q-app">
    <router-view :key="$route.path" />
  </div>
</template>
<script>
import process from 'process'
// import { Plugins } from '@capacitor/core'
// const { Network } = Plugins

import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway'

export default defineComponent({
  name: 'App',
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false
  }),
  computed: {
    accessToken () {
      return this.$store.getters['Auth/accessToken']
    }
  },
  // created () {
  // this.setServiceWorker()
  // this.checkInternetConnection()
  // },
  // mounted () {
  // this.checkWebVersion()
  // },
  methods: {
    checkWebVersion () {
      const webAppVersion = '1.0.0'
      APIGateway.version.getLastVersion()
        .then((version) => {
          const isLastVersion = version.web.last_version === webAppVersion
          if (!isLastVersion) {
            window.location.reload()
          }
        })
    },
    // async checkInternetConnection () {
    //   Network.addListener('networkStatusChange', (status) => {
    //     // alert("Network status changed" + status)
    //     // window.location.reload()
    //     console.log('Network status changed', status)
    //   })
    //
    //   // Get the current network status
    //   const status = await Network.getStatus()
    //   console.log('status', status)
    // },
    setServiceWorker () {
      // Listen for our custom event from the SW registration
      if (!process.browser) {
        return
      }
      document.addEventListener('swUpdated', this.updateAvailable, { once: true })

      if (navigator && navigator.serviceWorker) {
        // Prevent multiple refreshes
        navigator.serviceWorker.addEventListener('controllerchange', () => {
          if (this.refreshing) return
          this.refreshing = true
          // Here the actual reload of the page occurs
          // window.location.reload()
        })
      }
    },
    updateAvailable (event) {
      this.registration = event.detail
      this.updateExists = true
    }
  }
})
</script>
