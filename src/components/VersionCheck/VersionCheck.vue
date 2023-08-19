<template>
  <div>
    <android-version-check ref="androidUpdateDialog" />
    <ios-version-check ref="iosUpdateDialog" />
    <web-version-check ref="webUpdateDialog" />
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
  mounted() {
    // this.checkWebVersion()
    const isNativeApp = Capacitor.isNativePlatform()
    if (isNativeApp) {
      if (Capacitor.getPlatform() === 'android') {
        this.checkAndroidVersion()
      } else if (Capacitor.getPlatform() === 'ios') {
        this.checkIosVersion()
      }
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
            this.$refs.webUpdateDialog.checkWebVersion(version)
          }
        })
        .catch(() => {
          window.location.reload()
        })
    },
    checkAndroidVersion() {
      this.getVersion('android')
        .then((version) => {
          this.$refs.androidUpdateDialog.checkAndroidVersion(version)
        })
        .catch(() => {
          window.location.reload()
        })
    },
    checkIosVersion() {
      this.getVersion('ios')
        .then((version) => {
          this.$refs.iosUpdateDialog.checkIosVersion(version)
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
    }
  }
}
</script>
<style scoped lang="scss">

</style>
