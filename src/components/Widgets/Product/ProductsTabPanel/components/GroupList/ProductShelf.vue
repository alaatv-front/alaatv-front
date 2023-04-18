<template>
  <div v-for="(item, index) in data"
       :key="index"
       class="product-panel">
    <div v-if="item.options.label "
         class="col-12 product-label"
         :style="item.options.labelStyle">
      {{ item.options.label }}
    </div>
    <product-list v-if="isProduct(item)"
                  :loading="loading"
                  :data="item.data"
                  :options="item.options" />
    <div v-else
         class="product-content row"
         :class="{'scroll': item.options.rowLayout === 'ScrollRow'}"
         :style="item.options.style">
      <product-panel :loading="loading"
                     :data="data"
                     :options="item.options" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
import ProductList from '../ProductList/ProductList.vue'

export default {
  name: 'ProductShelf',
  components: {
    ProductList,
    ProductPanel: defineAsyncComponent(() =>
      import('../ProductPanel.vue')
    )
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'scroll'
    },
    options: {
      type: Object,
      default: () => {}
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
