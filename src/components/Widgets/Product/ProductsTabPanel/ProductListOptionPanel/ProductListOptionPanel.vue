<template>
  <div v-if="localOptions.options.layout === 'GridRow'">
    <grid-row-option-panel v-model:options="localOptions"
                           :layout="layout" />
  </div>
  <div v-else>
    <scroll-row-option-panel v-model:options="localOptions"
                             :layout="layout" />
  </div>
</template>

<script>
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import GridRowOptionPanel from 'src/components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/GridRowOptionPanel.vue'
import ScrollRowOptionPanel from 'src/components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ScrollRowOptionPanel.vue'

export default {
  name: 'ProductListOptionPanel',
  components: {
    GridRowOptionPanel,
    ScrollRowOptionPanel
  },
  mixins: [PageBuilderOptionPanel],
  props: {
    layout: {
      type: String,
      default: ''
    }
  }
}
</script>

<style scoped>

</style>
