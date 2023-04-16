<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <option-panel-component v-model:options="localOptions" />
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import optionPanelComponent from './optionPanelComponent.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, optionPanelComponent },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  }
})
</script>
<style lang="scss" scoped>
:deep(.q-card.custom-card) {
  :not([class^=col]) {
    box-shadow: none;
  }
  .custom-card {
    //width: 150px;
  }
}
</style>
