<template>
  <div>
    <div
      v-if="items.items.list.length > 0"
      class="cart-item-list q-mx-sm shadow-4"
    >
      <div class="item-list-header">
        سبد خرید
      </div>
      <q-separator />
      <div
        v-if="items"
      >
        <div
          class="cart-items"
          v-for="(item, index) in items.items.list"
          :key="index"
        >
          <template v-if="!!(item.grand_id)">
            <cart-item
              :raw-item="item"
              :has-grand="true"
              :id="item.grand.id"
            />
            <q-separator />
          </template>
          <template
            v-else
            v-for="(cartItem, index) in item.order_product.list"
            :key="index"
          >
            <cart-item
              :cart-item="cartItem"
              :has-grand="false"
              :id="cartItem.product.id"
            />
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
import CartItem from 'components/Widgets/CheckoutReview/SideComponents/CartItem'
import { Cart } from 'src/models/Cart'
export default {
  name: 'CartItemList',
  components: {
    CartItem
  },
  props: {
    items: {
      type: Cart,
      default: new Cart()
    }
  },
  data() {
    return {}
  },
  mounted() {
    // setTimeout(() => {
    //   console.log(this.items)
    // }, 1000)
  }
}
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
.cart-item-list {
  /*width: 1230px;*/
  background: #FFFFFF;
  /*box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);*/
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
