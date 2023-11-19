<template>
  <div>
    <div v-if="items.items.list.length > 0"
         class="cart-item-list ">
      <div class="item-list-header">
        سبد خرید
      </div>
      <q-separator />
      <div v-if="items">
        <div v-for="(item, index) in items.items.list"
             :key="index"
             class="cart-items">
          <template v-if="!!(item.grand_id)">
            <cart-item :id="item.grand.id"
                       :raw-item="item"
                       :has-grand="true" />
            <q-separator />
          </template>
          <template v-for="(cartItem, index) in item.order_product.list"
                    v-else
                    :key="index">
            <cart-item :id="cartItem.product.id"
                       :cart-item="cartItem"
                       :has-grand="false" />
            <q-separator />
          </template>
        </div>
      </div>
    </div>
    <div v-else>
      <span>سبد خرید شما خالی است</span>
    </div>
  </div>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import CartItem from 'components/Widgets/CheckoutReview/SideComponents/CartItem.vue'
export default {
  name: 'CartItemList',
  components: { CartItem },
  props: {
    items: {
      type: Cart,
      default: new Cart()
    }
  },
  data () {
    return {}
  },
  mounted () {
    // setTimeout(() => {
    //   console.log(this.items)
    // }, 1000)
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.cart-item-list {
  /* width: 1230px; */
  background: #FFF;
  box-shadow: 0 6px 5px rgb(0 0 0 / 3%);
  border-radius: 10px;
  font-family: IRANSans, sans-serif;
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
