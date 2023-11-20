<template>
  <q-dialog v-model="visible"
            :persistent="isAndroidForceUpdate">
    <card-component :is-android-force-update="isAndroidForceUpdate"
                    :android-options="androidOptions"
                    @selectOption="selectOption" />
  </q-dialog>
</template>

<script>
import CardComponent from './components/card.vue'
import VersionConfig from 'app/src-capacitor/android/versionConfig.json'
export default {
  name: 'androidVersionCheck',
  components: { CardComponent },
  props: {
    latestVersion: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      visible: false,
      androidOptions: [
        { label: 'دانلود از گوگل پلی', value: 'play_store', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/googlePlay.svg' },
        { label: 'دانلود مستقیم', value: 'direct', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/directDownloadAndroid.svg' },
        { label: 'دانلود از کافه بازار', value: 'bazaar', link: '', iconLink: 'https://nodes.alaatv.com/upload/android/cafebazzar.svg' }
      ]
    }
  },
  computed: {
    isAndroidForceUpdate () {
      return this.latestVersion.android.type.code === 1
    }
  },
  mounted () {
    this.checkAndroidVersion(this.latestVersion.android)
  },
  methods: {
    checkAndroidVersion (apiAndroidVersion) {
      const installedVersion = VersionConfig.androidVersion
      const isLastVersion = apiAndroidVersion.last_version === installedVersion
      if (!isLastVersion) {
        this.showDialog()
        this.handleUrlLinks()
      }
    },
    selectOption (option) {
      window.open(option.link, '_blank')
      if (!this.isAndroidForceUpdate) {
        this.visible = false
      }
    },
    showDialog () {
      this.visible = true
    },
    handleUrlLinks () {
      this.androidOptions.forEach(option => {
        option.link = this.latestVersion.android.url[option.value]
      })
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  border-radius: 16px;
}
</style>
