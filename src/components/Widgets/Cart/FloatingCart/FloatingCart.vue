<template>
  <div class="floating-cart">
    <q-btn v-morph:btn:mygroup:300.resize="morphGroupModel"
           class="cart-floating-btn q-ma-md"
           fab
           color="primary"
           size="lg"
           icon="shopping_cart"
           @click="nextMorph" />

    <q-card v-morph:card1:mygroup:500.resize="morphGroupModel"
            class="cart-floating-card q-ma-md bg-primary text-white"
            style="width: 350px; border-bottom-left-radius: 2em">
      <q-card-section class="text-h6">
        <div class="row">
          <div class="col-12">
            <cart-empty :options="CartEmptyOptions" />
          </div>
        </div>
        <div class="row">
          <div class="col-xs-12">
            <cart-view />
          </div>
          <div class="col-xs-12">
            <cart-invoice />
          </div>
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat
               label="بستن"
               @click="nextMorph" />
      </q-card-actions>
    </q-card>
  </div>
</template>

<script>
import CartEmpty from '../CartEmpty/CartEmpty.vue'
import CartInvoice from '../CartInvoice/CartInvoice.vue'
import CartView from '../CartView/CartView.vue'

const nextMorphStep = {
  btn: 'card1',
  card1: 'btn'
}

export default {
  name: 'FloatingCart',
  components: {
    CartEmpty,
    CartInvoice,
    CartView
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
        photo: 'https://nodes.alaatv.com/aaa/landing/Soalaa/States/empty_cart.png'
      }
    }
  },
  methods: {
    nextMorph () {
      this.morphGroupModel = nextMorphStep[this.morphGroupModel]
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
  }
}
</style>
