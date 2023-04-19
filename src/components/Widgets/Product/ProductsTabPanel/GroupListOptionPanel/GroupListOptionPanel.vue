<template>
  <!--  <component :is="item.options.layout + 'OptionPanel'"-->
  <!--             :data="item.data" />-->
  <div v-if="item.options.layout === 'ProductShelf'">
    <product-shelf-option-panel :data="item.data" />
  </div>
  <div v-else>
    <product-tab-option-panel :data="item.data" />
  </div>
</template>

<script>
// import { defineAsyncComponent } from 'vue'
import productShelfOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductShelfOptionPanel.vue'
import ProductTabOptionPanel from 'components/Widgets/Product/ProductsTabPanel/GroupListOptionPanel/ProductTabOptionPanel.vue'

export default {
  name: 'groupList',
  components: {
    productShelfOptionPanel,
    ProductTabOptionPanel
    // ProductShelfOptionPanel: defineAsyncComponent(() => import('./ProductShelfOptionPanel')),
    // ProductTabOptionPanel: defineAsyncComponent(() => import('./ProductTabOptionPanel'))
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
  data() {
    return {
      layoutOptions: ['ProductShelf', 'ProductTab']
    }
  },
  computed: {
    localOptions: {
      get() {
        return this.item.options
      },
      set() {

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
