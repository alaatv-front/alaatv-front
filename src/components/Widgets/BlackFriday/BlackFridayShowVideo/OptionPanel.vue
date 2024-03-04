<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div>
        <q-input v-model="localOptions.scrollToProducts"
                 label="scrollTo Products" />
      </div>
      <div>
        <q-input v-model="localOptions.scrollToParticipateSection"
                 label="scrollTo Participate Section" />
      </div>
      <div>
        <q-input v-model="localOptions.startIndex"
                 type="number"
                 label="step startIndex" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.popupForFirstVideo"
                    label="popup for first video" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.showBtn"
                    label="show Btn" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.disablePlaybackRateMenuButton"
                    label="disable Playback Rate Menu Button" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.disableProgressControl"
                    label="disable Progress Control" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.fromFirstIndex"
                    label="from First Index" />
      </div>
      <div>
        <q-checkbox v-model="localOptions.hasNewsletter"
                    label="has Newsletter" />
        <q-input v-if="localOptions.hasNewsletter"
                 v-model="localOptions.newsletterEventName"
                 type="text"
                 label="Newsletter Event Name" />
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultOptions: {
        showBtn: false,
        startIndex: 0,
        hasNewsletter: false,
        fromFirstIndex: false,
        scrollToProducts: null,
        newsletterEventName: '',
        popupForFirstVideo: true,
        disableProgressControl: true,
        scrollToParticipateSection: null,
        disablePlaybackRateMenuButton: true
      }
    }
  }
})
</script>
