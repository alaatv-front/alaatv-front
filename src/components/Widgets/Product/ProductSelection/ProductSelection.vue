<template>
  <div v-if="product.hasChildren()"
       class="ProductSelection"
       :class="options.className"
       :style="options.style">
    <product-price-child-item :product="product"
                              @changeSelectedProducts="onChangeSelectedProducts" />
  </div>
</template>

<script>
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import { mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import ProductPriceChildItem from 'components/Widgets/Product/ProductPrice/ChildItem.vue'

export default {
  name: 'ProductSelection',
  components: { ProductPriceChildItem },
  mixins: [mixinPrefetchServerData],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      product: new Product()
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
    prefetchServerDataPromise () {
      this.product.loading = true
      return this.getProduct()
    },
    prefetchServerDataPromiseThen (data) {
      this.product = new Product(data)
      if (window) {
        this.updateEECEventDetail()
      }
      this.product.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.product.loading = false
    },
    updateEECEventDetail() {
      AEE.productDetailViews('product.show', this.product.eec.getData(), {
        TTl: 1000,
        key: this.product.id
      })
    },
    getProduct() {
      return APIGateway.product.show(this.productId)
    },
    onChangeSelectedProducts (selectedProducts) {
      console.log('selectedProducts', selectedProducts)
    },
    addToCart() {
      this.$store.dispatch('Cart/addToCart', this.product).then(() => {
        this.$router.push({ name: 'Public.Checkout.Review' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.ProductSelection {
  box-shadow: 2px -4px 10px rgb(255 255 255 / 60%), -2px 4px 10px rgb(54 90 145 / 5%);
  background: #FFFFFF;
  border-radius: 15px;
}
</style>
