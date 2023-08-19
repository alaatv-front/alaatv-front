<template>
  <div>
    <component :is="platformTypeComponent"
               v-if="dataLoaded"
               :latest-version="globalVersion" />

  </div>
</template>
<script>
import { APIGateway } from 'src/api/APIGateway'
import { Capacitor } from '@capacitor/core'
import AndroidVersionCheck from 'components/VersionCheck/Components/Android/andoid.vue'
import IosVersionCheck from 'components/VersionCheck/Components/Ios/ios.vue'
import WebVersionCheck from 'components/VersionCheck/Components/Web/web.vue'

export default {
  name: 'VersionCheck',
  components: { WebVersionCheck, IosVersionCheck, AndroidVersionCheck },
  data() {
    return {
      globalVersion: null,
      dataLoaded: false
    }
  },
  computed: {
    platformTypeComponent() {
      const isNativeApp = Capacitor.isNativePlatform()
      if (isNativeApp) {
        if (Capacitor.getPlatform() === 'android') {
          return 'android-version-check'
        } else if (Capacitor.getPlatform() === 'ios') {
          return 'ios-version-check'
        }
      }
      return 'web-version-check'
    }
  },
  mounted() {
    this.getVersion()
      .then((version) => {
        this.globalVersion = version
        this.dataLoaded = true
      })
      .catch(() => {})
  },
  methods: {
    getVersion() {
      return new Promise(function (resolve, reject) {
        APIGateway.version.getLastVersion()
          .then((version) => {
            resolve(version)
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
}
</script>
<style scoped lang="scss">

</style>
