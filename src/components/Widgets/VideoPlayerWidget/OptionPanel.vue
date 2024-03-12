<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="input-container q-pt-md">
          <image-upload-input v-model:value ="localOptions.poster"
                              @update:value="updatePoster($event)" />
        </div>
        <div class="input-container q-py-md">
          <q-checkbox v-model ="localOptions.showBtn"
                      label="over-player" />
        </div>
        <div class="input-container q-py-md">
          <div>نوع سورس ویدیو را انتخاب کنید:</div>
          <q-radio v-model="localOptions.srcType"
                   val="hls"
                   class="q-mr-md"
                   label="hls" />
          <q-radio v-model="localOptions.srcType"
                   val="singleQuality"
                   class="q-mr-md"
                   label="تک کیفیت" />
          <q-radio v-model="localOptions.srcType"
                   val="multipleQuality"
                   class="q-mr-md"
                   label="چند کیفیت" />
        </div>
        <div class="input-container">
          <div v-if="localOptions.srcType && localOptions.srcType === 'hls'">
            <q-input v-model="localOptions.url"
                     label="hls" />
          </div>
          <div v-if="localOptions.srcType && localOptions.srcType === 'singleQuality'">
            <q-input v-model="localOptions.url"
                     label="تک کیفیت" />
          </div>
          <div v-if="localOptions.srcType && localOptions.srcType === 'multipleQuality'">
            <div class="input-container q-pt-md">
              <q-input v-model="localOptions.src[0]"
                       label="سورس کیفیت عالی" />
            </div>
            <div class="input-container q-pt-md">
              <q-input v-model="localOptions.src[1]"
                       label="سورس کیفیت خوب" />
            </div>
            <div class="input-container q-pt-md">
              <q-input v-model="localOptions.src[2]"
                       label="سورس کیفیت متوسط" />
            </div>
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'
import ImageUploadInput from 'src/components/Utils/ImageUploadInput.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ImageUploadInput },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      dialog: false,
      defaultOptions: {
        src: '',
        url: '',
        poster: '',
        srcType: '',
        showBtn: true
      }
    }
  },
  methods: {
    updatePoster (image) {
      this.localOptions.poster = image
    }
  }
})
</script>
