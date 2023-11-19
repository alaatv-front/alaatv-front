<template>
  <div>
    <component :is="platformTypeComponent"
               v-if="globalVersion"
               :latest-version="globalVersion" />

  </div>
</template>
<script>
import { Capacitor } from '@capacitor/core'
import { APIGateway } from 'src/api/APIGateway.js'
import WebVersionCheck from 'src/components/VersionCheck/Components/Web/web.vue'
import IosVersionCheck from 'src/components/VersionCheck/Components/Ios/ios.vue'
import AndroidVersionCheck from 'src/components/VersionCheck/Components/Android/andoid.vue'

export default {
  name: 'VersionCheck',
  components: { WebVersionCheck, IosVersionCheck, AndroidVersionCheck },
  data () {
    return {
      globalVersion: null
    }
  },
  computed: {
    platformTypeComponent () {
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
  mounted () {
    if (this.platformTypeComponent === 'web-version-check') {
      return
    }
    this.getVersion()
      .then((version) => {
        this.globalVersion = version
      })
      .catch(() => {})
  },
  methods: {
    getVersion () {
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
