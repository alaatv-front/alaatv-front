<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-item v-for="(product, index) in data"
                    :key="index"
                    :options="{product: product}"
                    class="product-item col-md-3" />
    </div>
  </div>
</template>

<script>
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ProductRowSkeleton from '../ProductRowSkeleton.vue'

export default {
  name: 'GridRow',
  components: {
    ProductItem,
    ProductRowSkeleton
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    options: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
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

  .product-item {
    padding: 5px;
  }
}
</style>
