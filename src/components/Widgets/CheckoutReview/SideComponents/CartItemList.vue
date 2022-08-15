<template>
  <div class="cart-item-list q-mx-sm">
    <div class="item-list-header">
      سبد خرید
    </div>
    <q-separator/>
    <div
      v-if="items && items.length > 0"
      class="cart-items"
      v-for="(item, index) in items"
      :key="index"
    >
      <template v-if="!!(item.grand)">
        <cart-item
          :items="items"
          :raw-item="item"
          :has-grand="true"
          :id="item.grand.id"
        />
        <q-separator/>
      </template>
      <template
        v-else
        v-for="(cartItem, index) in item.order_product"
        :key="index"
      >
        <cart-item
          :items="items"
          :raw-item="cartItem"
          :has-grand="false"
          :id="cartItem.product.id"
        />
        <q-separator/>
      </template>
    </div>
  </div>
</template>

<script>
  import CartItem from 'components/Widgets/CheckoutReview/SideComponents/CartItem'
  // import { CartItemList } from 'src/models/CartItem'
  export default {
    name: 'CartItemList',
    components: {CartItem},
    props: {
      items: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {}
    },
  }
</script>

<style lang="scss"></style>
<style lang="scss" scoped>
  .cart-item-list {
    /*width: 1230px;*/
    background: #FFFFFF;
    box-shadow: 0px 6px 5px rgba(0, 0, 0, 0.03);
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
