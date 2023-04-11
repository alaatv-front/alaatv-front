<template>
  <div v-for="(item, index) in itemList"
       :key="index"
       class="product-panel">
    <div v-if="item.label "
         class="col-12 product-label"
         :style="labelStyle">
      {{ item.label }}
    </div>
    <product-shelf-row v-if="isProduct(item)"
                       :products-list="item.products"
                       :layout="item.shelfRowLabelStyle"
                       :className="item.className"
                       :rowStyle="item.rowStyle" />
    <div v-else
         class="product-content row"
         :class="{'scroll': layout === 'scroll'}"
         :style="rowStyle">
      <products-tab-panel :options="item" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ProductShelfRow from './ProductShelfRow.vue'
// import ProductsTabPanel from '../ProductsTabPanel.vue'

export default {
  name: 'ProductShelf',
  components: {
    ProductShelfRow,
    ProductsTabPanel: defineAsyncComponent(() =>
      import('../ProductsTabPanel.vue')
    )
  },
  props: {
    itemList: {
      type: Object,
      default: () => {}
    },
    labelStyle: {
      type: Object,
      default: () => {}
    },
    rowStyle: {
      type: Object,
      default: () => {}
    },
    layout: {
      type: String,
      default: 'scroll'
    }
  },
  methods: {
    isProduct(item) {
      return item.type === 'product'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel {
  .product-label {
    font-size: 18px;
    line-height: 31px;
    font-weight: 700;
    padding: 15px;
  }
  .product-content {
    justify-content: space-between;
    padding: 40px 0;
    width: 100%;

    &.scroll {
      overflow-x: auto;
      flex-wrap: nowrap !important;
      max-width: 100%;
    }

    @media screen and (max-width: 600px){
      padding: 0;
    }
  }
}
</style>
