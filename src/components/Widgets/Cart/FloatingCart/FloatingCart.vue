<template>
  <div class="floating-cart">
    <q-btn v-morph:btn:mygroup:300.resize="morphGroupModel"
           class="cart-floating-btn q-ma-md"
           fab
           color="primary"
           size="lg"
           icon="shopping_cart"
           @click="nextMorph">
      <q-badge v-if="cart.count > 0"
               color="positive"
               text-color="white"
               floating
               rounded
               :label="cart.count" />
    </q-btn>
    <q-card v-morph:card1:mygroup:500.resize="morphGroupModel"
            class="cart-floating-card q-ma-md bg-primary text-white">
      <q-card-section>
        <div class="row">
          <div class="col-12">
            <cart-empty ref="cartEmpty"
                        :options="CartEmptyOptions" />
          </div>
          <q-btn flat
                 class="cart-floating-close"
                 icon="close"
                 @click="nextMorph" />
        </div>
        <div class="row">
          <div class="col-xs-12">
            <cart-view ref="cartView" />
          </div>
          <div class="col-xs-12">
            <cart-invoice ref="cartInvoice"
                          :dense="dense" />
          </div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { Cart } from 'src/models/Cart.js'
import CartView from '../CartView/CartView.vue'
import CartEmpty from '../CartEmpty/CartEmpty.vue'
import CartInvoice from '../CartInvoice/CartInvoice.vue'

const nextMorphStep = {
  btn: 'card1',
  card1: 'btn'
}

export default {
  name: 'FloatingCart',
  components: {
    CartView,
    CartEmpty,
    CartInvoice
  },
  data() {
    return {
      morphGroupModel: 'btn',
      CartEmptyOptions: {
        text: 'سبد خرید شما خالی است',
        link: {
          text: 'بازگشت به فروشگاه',
          url: '/shop'
        },
        photo: 'https://nodes.alaatv.com/upload/empty-cart.png'
      },
      dense: true,
      cart: new Cart()
    }
  },
  mounted () {
    this.$bus.on('busEvent-refreshCart', this.cartReview)
  },
  methods: {
    nextMorph () {
      this.morphGroupModel = nextMorphStep[this.morphGroupModel]
    },
    cartReview() {
      this.cart.loading = true
      this.$store.dispatch('Cart/reviewCart')
        .then((response) => {
          const invoice = response

          const cart = new Cart(invoice)

          if (invoice.count > 0) {
            invoice.items.list[0].order_product.list.forEach((order) => {
              cart.items.list.push(order)
            })
          }
          this.cart = cart
          this.cart.loading = false
        }).catch(() => {
          this.cart.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.floating-cart {
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9;
  height: 780px;

  .cart-floating-btn {
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .cart-floating-card {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 30px;
    max-height: 780px;
    overflow-y: auto;
    width: 500px;
    border-bottom-left-radius: 2em;

    @media screen and (max-width: 600px) {
      width: 330px;
      height: 650px;
    }

    .cart-container {
      margin-bottom: 0;
    }
    &:deep(.cart-image) {
      height: 140px;
      margin-top: 0px;
    }
    &:deep(.cart-invoice .cart-invoice-container .invoice-container) {
      margin: 0;
    }

    .cart-floating-close{
      position: absolute;
      right: 0;
    }
  }
}
</style>
