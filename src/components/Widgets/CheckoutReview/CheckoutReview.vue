<template>
  <div class="checkout-review row">
    <cart-item-list class="col-auto" />
    <div class="side-box col-auto column ">
      <donate />
      <checkout-review-cart />
    </div>
  </div>
</template>

<script>

import CheckoutReviewCart from 'components/Widgets/CheckoutReview/SideComponents/CheckoutReviewCart'
import CartItemList from 'components/Widgets/CheckoutReview/SideComponents/CartItemList'
import Donate from 'components/Widgets/CheckoutReview/SideComponents/Donate'
export default {
  name: 'CheckoutReview',
  components: { Donate, CartItemList, CheckoutReviewCart },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped></style>
