<template>
  <div class="checkout-review row wrap q-mb-md">
    <div class="col-md-8 col-12">
      <cart-item-list class="q-mb-md"
                      :items="items" />
    </div>
    <div class="side-box col-md-4 col-12 column">
      <donate />
      <checkout-review-cart v-if="items && items.length > 0"
                            :final-price="finalPrice"
                            :items="items" />
      <Login v-else />
    </div>
  </div>
</template>

<script>

import CheckoutReviewCart from 'components/Widgets/CheckoutReview/SideComponents/CheckoutReviewCart'
import CartItemList from 'components/Widgets/CheckoutReview/SideComponents/CartItemList'
import Donate from 'components/Widgets/CheckoutReview/SideComponents/Donate'
import API_ADDRESS from 'src/api/Addresses'
// import Login from 'pages/Auth/Login'
import Login from 'components/Widgets/CheckoutReview/SideComponents/Login'

export default {
  name: 'CheckoutReview',
  components: { Login, Donate, CartItemList, CheckoutReviewCart },
  data() {
    return {
      items: [],
      finalPrice: 0
    }
  },
  mounted() {
    this.checkoutReview()
  },
  methods: {
    checkoutReview() {
      this.$axios.get(API_ADDRESS.cart.review)
        .then((res) => {
          this.items = res.data.data.items
          // console.log(this.items)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped></style>
