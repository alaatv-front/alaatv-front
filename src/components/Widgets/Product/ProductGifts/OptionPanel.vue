<template>
  <option-panel-tabs v-model:options="localOptions" />
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel, OptionPanelTabs } from 'quasar-ui-q-page-builder'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  }
})
</script>
