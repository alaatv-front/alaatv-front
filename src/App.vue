<template>
  <div id="q-app">
    <router-view :key="$route.path" />
  </div>
  <div>
    <update-available-dialog ref="updateDialog"
                             :options="androidDownloadOptions"
                             :forceUpdate="isAndroidForceUpdate"
                             @select="handleOptionSelect" />
  </div>
</template>
<script>
import process from 'process'
import { defineComponent } from 'vue'
import { APIGateway } from 'src/api/APIGateway'
import { Capacitor } from '@capacitor/core'
import VersionConfig from '../src-capacitor/android/versionConfig.json'
import UpdateAvailableDialog from 'src/components/UpdateAvailableDialog.vue'
export default defineComponent({
  name: 'App',
  components: { UpdateAvailableDialog },
  data: () => ({
    refreshing: false,
    registration: null,
    updateExists: false,
    isAndroidForceUpdate: false,
    androidDownloadOptions: [
      { label: 'دانلود از گوگل پلی', value: 'play_store', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/googlePlay.svg' },
      { label: 'دانلود مستقیم', value: 'direct', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/directDownloadAndroid.svg' },
      { label: 'دانلود از کافه بازار', value: 'bazaar', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/cafebazzar.svg' }
    ]
  }),
  computed: {
    accessToken() {
      return this.$store.getters['Auth/accessToken']
    }
  },
  // created () {
  // this.setServiceWorker()
  // this.checkInternetConnection()
  // },
  mounted() {
    // this.checkWebVersion()
    const isNativeApp = Capacitor.isNativePlatform()
    if (isNativeApp) {
      this.checkAndroidVersion()
    } else {
      this.checkWebVersion()
    }
  },
  methods: {
    checkWebVersion() {
      const webAppVersion = '1.0.0'
      this.getVersion('web')
        .then((version) => {
          const isLastVersion = version.last_version === webAppVersion
          if (!isLastVersion) {
            this.showUpdateDialog = true
            // window.location.reload()
          }
        })
        .catch(() => {
          window.location.reload()
        })
    },
    checkAndroidVersion() {
      const androidVersion = VersionConfig.androidVersion
      this.getVersion('android')
        .then((version) => {
          const isLastVersion = version.last_version === androidVersion
          if (!isLastVersion) {
            if (version.type.code === 1) {
              this.isAndroidForceUpdate = true
            }
            this.showDialog()
            this.androidDownloadOptions.forEach(option => {
              option.link = version.url[option.value]
            })
            // this.handleAndroidDownloadLinks(version.url)
          }
        })
        .catch(() => {
          window.location.reload()
        })
    },
    getVersion(versionType) {
      return new Promise(function (resolve, reject) {
        APIGateway.version.getLastVersion()
          .then((version) => {
            resolve(version[versionType])
          })
          .catch(() => {
            reject()
          })
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
    setServiceWorker() {
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
    updateAvailable(event) {
      this.registration = event.detail
      this.updateExists = true
    },
    showDialog() {
      this.$refs.updateDialog.visible = true
    },
    handleOptionSelect(option) {
      window.open(option.link, '_blank')
    }
  }
})
</script>
