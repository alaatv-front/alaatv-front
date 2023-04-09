<template>

  <div class="cart-template row">
    <div v-if="count"
         class="side-invoice col-12">
      <cart-invoice />
    </div>

    <div v-if="count === 0"
         class="empty-cart col-12">
      <cart-empty />
    </div>

  </div>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import CartEmpty from 'src/components/Widgets/CheckoutReview/CartComponents/CartEmpty.vue'
import CartInvoice from 'src/components/Widgets/CheckoutReview/CartComponents/CartInvoice.vue'

export default {
  name: 'CheckoutReviewCart',
  components: {
    CartEmpty,
    CartInvoice
  },
  props: {
    items: {
      type: Cart,
      default: new Cart()
    }
  },
  data: () => ({
  }),
  computed: {
    count() {
      return this.$store.getters['Cart/cart'].count
    }
  },

  created () {
    this.cartReview()
  },
  methods: {
    add () {
      this.$store.dispatch('Cart/addToCart', {
        product: { id: 901 },
        products: [903]
      })
        .then(() => {
          this.cartReview()
        })
    },
    cartReview() {
      this.$store.dispatch('loading/overlayLoading', true)
      this.$store.dispatch('Cart/reviewCart')
        .then(() => {
          this.$store.dispatch('loading/overlayLoading', false)
          // console.log('cart', this.$store.getters['Cart/cart'])
        })
    }
  }
}

</script>

<style lang="scss" scoped>

</style>
