<template>
  <div class="cart-item-grand-mode row justify-between items-center">
    <div class="title">{{ cartItem.product.title }}</div>
    <div class="group row items-center">
      <div class="price">{{ cartItem.price.final }} تومان</div>
      <q-btn class="delete-btn"
             icon="isax:trash"
             rounded
             flat
             :loading="loading"
             @click="deleteItem">
        <template v-slot:loading>
          <q-spinner color="primary" />
        </template>
      </q-btn>
    </div>
  </div>
</template>

<script>

import { OrderProduct } from 'src/models/OrderProduct'

export default {
  name: 'CartItemsGrandMode',
  props: {
    cartItem: {
      type: OrderProduct,
      default: new OrderProduct()
    }
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    deleteItem () {
    }
  }

}
</script>

<style lang="scss" scoped>
.cart-item-grand-mode {
  background: #FFF;

  //opacity: 0.3;
  border: 2px solid #ededed;
  border-radius: 10px;
  padding: 10px 16px;
  margin-bottom: 10px;
  color: #575962;

  .group {
    font-style: normal;
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    text-align: right;
    color: #575962;

    .price {
      margin-right: 10px;
    }

    .delete-btn {
      background: #f2f2f2;
    }
  }
}
</style>
<style lang="scss">
.cart-item-grand-mode {
  .q-btn .q-icon, .q-btn .q-spinner {
    font-size: 1.33em;
  }
}
</style>
