<template>
  <q-dialog v-model="visible"
            :persistent="isAndroidForceUpdate">
    <q-card class="card">
      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-2">
            <q-icon name="system_update"
                    size="sm"
                    color="green" />
          </div>
          <div class="col-8 text-bold">آلاء رو بروزرسـانی کُـن !</div>
          <div class="col-2">
            <q-icon v-if="!isAndroidForceUpdate"
                    v-close-popup
                    name="close"
                    class="col-1"
                    size="sm" />
          </div>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list>
          <q-item v-for="(option, index) in androidOptions.filter(option => option.link)"
                  :key="index"
                  v-ripple
                  clickable
                  @click="selectOption(option)">
            <q-item-section>
              <div class="row q-col-gutter-md justify-center">
                <div class="col-3">
                  <q-img :src="option.iconLink" />
                </div>
                <div class="col-9">
                  {{ option.label }}
                </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-dialog>

</template>
<script>
import VersionConfig from 'app/src-capacitor/android/versionConfig.json'
export default {
  name: 'androidVersionCheck',
  props: {
    latestVersion: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
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
    isAndroidForceUpdate() {
      return this.latestVersion.android.type.code === 1
    }
  },
  mounted() {
    this.checkAndroidVersion(this.latestVersion.android)
  },
  methods: {
    checkAndroidVersion(apiAndroidVersion) {
      const installedVersion = VersionConfig.androidVersion
      const isLastVersion = apiAndroidVersion.last_version === installedVersion
      if (!isLastVersion) {
        this.showDialog()
        this.handleUrlLinks()
      }
    },
    selectOption(option) {
      window.open(option.link, '_blank')
      if (!this.isAndroidForceUpdate) {
        this.visible = false
      }
    },
    showDialog() {
      this.visible = true
    },
    handleUrlLinks() {
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
