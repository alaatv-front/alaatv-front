<template>
  <div class="cart-item-list">
    <div class="item-list-header">
      سبد خرید
    </div>
    <q-separator />
    <div
      v-if="items.list && items.list.length > 0"
      class="cart-items"
      v-for="(item, index) in items.list"
      :key="index"
    >
      <cart-item :cart-item="item" />
      <q-separator />
    </div>
  </div>
</template>

<script>
import CartItem from 'components/Widgets/CheckoutReview/SideComponents/CartItem'
import API_ADDRESS from 'src/api/Addresses'
import { CartItemList } from 'src/models/CartItem'
export default {
  name: 'CartItemList',
  components: { CartItem },
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.checkoutReview()
  },
  methods: {
    checkoutReview () {
      this.$axios.get(API_ADDRESS.cart.review)
        .then((res) => {
          this.items = new CartItemList(res.data.data.items[0].order_product)
          // console.log('this.items', this.items)
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.cart-item-list {
  width: 1230px;
  background: #FFFFFF;
  box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  font-family: IRANSans,sans-serif;
  font-style: normal;
  color: #575962;
  .item-list-header {
    font-weight: 400;
    font-size: 15px;
    line-height: 23px;
    padding: 16px 30px;
  }
}
</style>
