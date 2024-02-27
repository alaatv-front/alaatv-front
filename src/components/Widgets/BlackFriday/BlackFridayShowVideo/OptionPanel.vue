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
        <q-checkbox v-model="localOptions.popupForFirstVideo"
                    label="popup for first video" />
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
        scrollToProducts: null,
        popupForFirstVideo: true,
        scrollToParticipateSection: null
      }
    }
  }
})
</script>
