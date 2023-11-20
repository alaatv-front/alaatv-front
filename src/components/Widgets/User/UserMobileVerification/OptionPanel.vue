<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab />
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data () {
    return {
      accountInfo: true,
      personalInfo: true,
      educationalInfo: true,
      contactInfo: true,
      defaultOptions: {
        accountInfo: true,
        personalInfo: true,
        educationalInfo: true,
        contactInfo: true,
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
