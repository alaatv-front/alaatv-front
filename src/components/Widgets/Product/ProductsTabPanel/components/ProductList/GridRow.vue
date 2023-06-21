<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row justify-center items-center"
         :class="options.className"
         :style="options.style">
      <div v-for="(product, index) in data"
           :key="index"
           :class="colClassName"
           class="product-item">
        <product-item :options="{product: product}" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ProductRowSkeleton from '../ProductRowSkeleton.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'GridRow',
  components: {
    ProductItem,
    ProductRowSkeleton
  },
  mixins: [PageBuilderOptionPanel],
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
  },
  data() {
    return {
      defaultOptions: {
        colNumber: 'col'
      }
    }
  },
  computed: {
    colClassName() {
      const colNumber = this.options.colNumber ? this.options.colNumber : ''

      return colNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.product-content-wrapper {
  width: 100%;

  .product-content {
    //justify-content: flex-start;
    padding: 10px 0 40px;
    width: 100%;

    @media screen and (max-width: 600px){
      padding: 0;
    }

    .product-item {
      padding: 5px;
    }
  }
}

</style>
