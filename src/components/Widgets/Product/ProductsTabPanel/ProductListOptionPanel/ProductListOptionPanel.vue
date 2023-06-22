<template>
  <div v-if="localOptions.options.layout === 'GridRow'">
    <grid-row-option-panel :options="localOptions"
                           :layout="layout" />
  </div>
  <div v-else>
    <scroll-row-option-panel :options="localOptions"
                             :layout="layout" />
  </div>
</template>

<script>
import GridRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/GridRowOptionPanel.vue'
import ScrollRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ScrollRowOptionPanel.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'

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
