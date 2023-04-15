<template>
  <div class="product-tab-wrapper">
    <div v-if="loading"
         class="product-panel-content row"
         :class="{'scroll': layout === 'scroll',...className}"
         :style="rowStyle">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-panel-content row"
         :class="{'scroll': layout === 'scroll',...className}"
         :style="rowStyle">
      <product-item v-for="(product, index) in productsList"
                    :key="index"
                    :options="{product: product}"
                    class="product-item col-md-4"
                    :class="{'q-mx-xs': layout === 'scroll'}" />
    </div>
  </div>
</template>

<script>
import ProductItem from '../../ProductItem/ProductItem.vue'
import ProductRowSkeleton from './ProductRowSkeleton.vue'

export default {
  name: 'ProductTabRow',
  components: {
    ProductItem,
    ProductRowSkeleton
  },
  props: {
    productsList: {
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
    },
    loading: {
      type: Boolean,
      default: false
    },
    className: {
      type: [Array, String],
      default: null
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel-content {
  justify-content: space-between;
  padding: 40px 0;
  width: 100%;

  &.scroll {
    overflow-x: auto;
    flex-wrap: nowrap !important;
    max-width: 100%;
  }

  &.special {
    padding: 15px 15px 5px;
    border-radius: 30px;
    background: #F9F4EF;
  }

  @media screen and (max-width: 600px){
    padding: 0;

    &.special {
      padding: 5px;
    }
  }
}
</style>
