<template>

  <div class="checkout-review row q-col-gutter-lg q-mb-md">
    <q-scroll-observer @scroll="onScroll" />

    <div class="col-md-8 col-12">
      <cart-item-list class="q-mb-md"
                      :items="items" />
    </div>
    <div class="side-box col-md-4 col-12 column">
      <sticky-both-sides :top-gap="100"
                         :bottom-gap="40">
        <donate class="q-mb-lg " />
        <checkout-review-cart v-if="items && items.items.list.length>0"
                              :items="items" />
        <login v-else />
      </sticky-both-sides>
    </div>
  </div>
</template>

<script>

import { computed } from 'vue'
import { Cart } from 'src/models/Cart.js'
import StickyBothSides from 'src/components/Utils/StickyBothSides.vue'
import Login from 'src/components/Widgets/CheckoutReview/SideComponents/Login.vue'
import Donate from 'src/components/Widgets/CheckoutReview/SideComponents/Donate.vue'
import CartItemList from 'src/components/Widgets/CheckoutReview/SideComponents/CartItemList.vue'
import CheckoutReviewCart from 'src/components/Widgets/CheckoutReview/CartComponents/CheckoutReviewCart.vue'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'CheckoutReview',
  components: { StickyBothSides, Login, Donate, CartItemList, CheckoutReviewCart },
  provide () {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  props: {
    data: {
      type: Cart,
      default: new Cart()
    }
  },
  data () {
    return {
      items: new Cart(),
      top: 0,
      bottom: 0,
      scrollInfo: {}
    }
  },
  mounted () {
    this.checkoutReview()
    // this.calcGapTopAndBottom()
  },
  methods: {
    onScroll (info) {
      this.scrollInfo = info
    },
    checkoutReview () {
      this.$store.dispatch('loading/overlayLoading', true)
      APIGateway.cart.reviewCart()
        .then((cart) => {
          this.items = cart
          this.$store.dispatch('loading/overlayLoading', false)
        })
        .catch(() => {
          this.$store.dispatch('loading/overlayLoading', false)
        })
    },
    calcGapTopAndBottom () {
      this.top = this.$refs.sticky.style.getBoundingClientRect().top
      this.bottom = this.$refs.sticky.style.getBoundingClientRect().bottom
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped></style>
