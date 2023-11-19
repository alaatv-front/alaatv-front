<template>
  <div v-if="product.hasChildren()"
       class="ProductSelection">
    <product-price-child-item v-for="(productChild, index) in productChildrenList "
                              :key="index"
                              :product="productChild"
                              :index="index"
                              @changeSelected="onChangeSelectedProducts" />
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import ProductPriceChildItem from 'components/Widgets/Product/ProductPriceWithPopup/ChildItem.vue'

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
  data () {
    return {
      selectedProductsIds: []
    }
  },
  computed: {
    productChildrenList () {
      const childList = []
      for (let productIndex = 0; productIndex < this.product.children.length; productIndex++) {
        childList.push(new Product(this.product.children[productIndex]))
      }
      return childList
    },
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
    onChangeSelectedProducts (selectedProductsAndIndex) {
      this.selectedProductsIds[selectedProductsAndIndex.index] = selectedProductsAndIndex.selectedProducts
      let idList = []
      for (let i = 0; i < this.selectedProductsIds.length; i++) {
        idList = [...idList, ...this.selectedProductsIds[i]]
      }
      this.$emit('update:selectedIds', this.removeProductIdFromSelectedOnes(idList))
    }
  }
}
</script>

<style lang="scss" scoped>
.ProductSelection {
  border-radius: 15px;
}
</style>
