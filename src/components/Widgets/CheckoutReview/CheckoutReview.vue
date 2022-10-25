<template>

  <div class="checkout-review row q-col-gutter-lg q-mb-md">
    <q-scroll-observer @scroll="onScroll" />

    <div class="col-md-8 col-12">
      <cart-item-list class="q-mb-md"
                      :items="items" />
    </div>
    <div class="side-box col-md-4 col-12 column">
      <sticky-both-sides :top-gap="100"
                         :bottom-gap="40"
      >
        <donate q-mb-lg />
        <checkout-review-cart v-if="items && items.items.list.length>0"
                              :items="items" />
        <Login v-else />
      </sticky-both-sides>
    </div>
  </div>
</template>

<script>

import CheckoutReviewCart from 'components/Widgets/CheckoutReview/CartComponents/CheckoutReviewCart'
import CartItemList from 'components/Widgets/CheckoutReview/SideComponents/CartItemList'
import Donate from 'components/Widgets/CheckoutReview/SideComponents/Donate'
import API_ADDRESS from 'src/api/Addresses'
import Login from 'components/Widgets/CheckoutReview/SideComponents/Login'
import { Cart } from 'src/models/Cart'
import StickyBothSides from 'components/Utils/StickyBothSides'
import { computed } from 'vue'

export default {
  name: 'CheckoutReview',
  components: { StickyBothSides, Login, Donate, CartItemList, CheckoutReviewCart },
  props: {
    data: {
      type: Cart,
      default: new Cart()
    }
  },
  provide() {
    return {
      scrollInfo: computed(() => this.scrollInfo)
    }
  },
  data() {
    return {
      items: new Cart(),
      top: 0,
      bottom: 0,
      scrollInfo: {}
    }
  },
  mounted() {
    this.checkoutReview()
    // this.calcGapTopAndBottom()
  },
  methods: {
    onScroll(info) {
      this.scrollInfo = info
    },
    checkoutReview() {
      this.$axios.get(API_ADDRESS.cart.review)
        .then((res) => {
          this.items = new Cart(res.data.data)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    calcGapTopAndBottom() {
      this.top = this.$refs.sticky.style.getBoundingClientRect().top
      this.bottom = this.$refs.sticky.style.getBoundingClientRect().bottom
      console.log(this.top)
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped></style>
