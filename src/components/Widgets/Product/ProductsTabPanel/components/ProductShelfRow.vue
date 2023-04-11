<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="{'scroll': layout === 'scroll'}"
         :style="rowStyle">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row"
         :class="{'scroll': layout === 'scroll'}"
         :style="rowStyle">
      <product-item v-for="(product, index) in products.list"
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
  name: 'ProductShelfRow',
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
    }
  },
  data() {
    return {
      loading: false,
      products: []
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    getProducts() {
      this.loading = true
      this.$apiGateway.product.getProductList({ productList: this.productsList })
        .then(productList => {
          this.products = productList
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
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

  &.special {
    padding: 15px 15px 5px;
    margin-bottom: 5px;
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
