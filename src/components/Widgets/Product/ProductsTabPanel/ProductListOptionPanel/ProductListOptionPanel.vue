<template>
  <!--  <div v-if="item.options.layout === 'GridRow'">-->
  <grid-row-option-panel :data="item.data" />
<!--  </div>-->
<!--  <div v-else>-->
<!--    <scroll-row-option-panel :data="item.data" />-->
<!--  </div>-->
<!--  <component :is="item.options.layout.concat('OptionPanel')"-->
<!--             :data="item.data" />-->
</template>

<script>
// import { defineAsyncComponent } from 'vue'
import GridRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/GridRowOptionPanel.vue'
// import ScrollRowOptionPanel from 'components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ScrollRowOptionPanel.vue'

export default {
  name: 'ProductListOptionPanel',
  components: {
    GridRowOptionPanel
    // ScrollRowOptionPanel
    // GridRowOptionPanel: defineAsyncComponent(() => import('./GridRowOptionPanel.vue')),
    // ScrollRowOptionPanel: defineAsyncComponent(() => import('./ScrollRowOptionPanel.vue'))
  },
  props: {
    data: {
      type: Array,
      default: () => []
    },
    item: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  mounted() {
    console.log(this.item)
  }
}
</script>

<style scoped>

</style>
