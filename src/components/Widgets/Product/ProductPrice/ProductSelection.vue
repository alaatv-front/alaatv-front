<template>
  <div v-if="product.hasChildren()"
       class="ProductSelection">
    <product-price-child-item :product="product"
                              @changeSelected="onChangeSelectedProducts" />
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import ProductPriceChildItem from 'components/Widgets/Product/ProductPrice/ChildItem.vue'

export default {
  name: 'ProductSelection',
  components: { ProductPriceChildItem },
  props: {
    product: {
      type: Product,
      default: new Product()
    },
    selectedIds: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    discountInPercent () {
      if (this.product?.price?.discountInPercent && typeof this.product.price.discountInPercent === 'function') {
        return this.product.price.discountInPercent()
      }

      return 0
    },
    productId () {
      if (typeof this.options.productId !== 'undefined' && this.options.productId !== null) {
        return this.options.productId
      }
      if (this.options.urlParam && this.$route.params[this.options.urlParam]) {
        return this.$route.params[this.options.urlParam]
      }
      if (this.$route.params.id) {
        return this.$route.params.id
      }
      return this.product.id
    }
  },
  methods: {
    removeProductIdFromSelectedOnes (selectedOnes) {
      const target = selectedOnes.findIndex(item => item === this.product.id)
      if (target === -1) {
        return selectedOnes
      }
      selectedOnes.splice(target, 1)
      return selectedOnes
    },
    onChangeSelectedProducts (selectedProducts) {
      this.$emit('update:selectedIds', this.removeProductIdFromSelectedOnes(selectedProducts))
    }
  }
}
</script>

<style lang="scss" scoped>
.ProductSelection {
  box-shadow: 2px -4px 10px rgb(255 255 255 / 60%), -2px 4px 10px rgb(54 90 145 / 5%);
  background: #FFF;
  border-radius: 15px;
}
</style>
