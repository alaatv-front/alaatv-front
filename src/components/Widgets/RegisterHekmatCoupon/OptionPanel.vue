<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      ...
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        className: '',
        style: {}
      }
    }
  }
})
</script>
