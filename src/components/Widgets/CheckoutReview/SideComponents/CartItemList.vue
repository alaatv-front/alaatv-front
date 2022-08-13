<template>

  <div class="cart-item-list">
    <div class="item-list-header">
      سبد خرید
    </div>
    <q-separator />
    <div
      v-if="items && items.length > 0"
      class="cart-items"
      v-for="(item, index) in items"
      :key="index"
    >
      <template v-if="!!(item.grand)">
        <cart-item
          :raw-item="item"
          :has-grand="true"
        />
        <q-separator />
      </template>
      <template
        v-else
        v-for="(cartItem, index) in item.order_product"
        :key="index"
      >
        <cart-item
          :raw-item="cartItem"
          :has-grand="false"
        />
        <q-separator />
      </template>
    </div>
  </div>
</template>

<script>
import CartItem from 'components/Widgets/CheckoutReview/SideComponents/CartItem'
import API_ADDRESS from 'src/api/Addresses'
// import { CartItemList } from 'src/models/CartItem'
export default {
  name: 'CartItemList',
  components: {  CartItem},
  data () {
    return {
      items: []
    }
  },
  mounted () {
    this.checkoutReview()
  },
  methods: {
    checkoutReview (){
      this.$axios.get(API_ADDRESS.cart.review)
        .then((res) => {
          this.items = res.data.data.items
          console.log(this.items)
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
  /*width: 1230px;*/
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
