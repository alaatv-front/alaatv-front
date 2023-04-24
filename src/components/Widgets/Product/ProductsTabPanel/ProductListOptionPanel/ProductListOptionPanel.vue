<template>
  <div v-if="item.options.layout === 'GridRow'">
    <grid-row-option-panel :data="item" />
  </div>
  <div v-else>
    <scroll-row-option-panel :data="item" />
  </div>
</template>

<script>
import GridRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/GridRowOptionPanel.vue'
import ScrollRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ScrollRowOptionPanel.vue'

export default {
  name: 'ProductListOptionPanel',
  components: {
    GridRowOptionPanel,
    ScrollRowOptionPanel
  },
  props: {
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  }
}
</script>

<style scoped>

</style>
