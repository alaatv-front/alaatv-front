<template>
  <div v-if="cart.count === 0"
       class="cart-container">
    <div class="cart-image">
      <q-img :src=options.photo />
    </div>
    <div class="title">{{options.text}}</div>
    <router-link :to="{path: options.link.url}"
                 class="back">
      {{options.link.text}}
    </router-link>
  </div>
</template>

<script>
import { Cart } from 'src/models/Cart'

export default {
  name: 'CartEmpty',
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      cart: new Cart()
    }
  },
  mounted () {
    this.cartReview()
    this.$bus.on('busEvent-refreshCart', this.cartReview)
  },
  methods: {
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

<style scoped lang="scss">
.cart-image {
  opacity: 0.7;
  width: 290px;
  height: 290px;
  margin-top: 142px;
}

.cart-container {
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-bottom: 200px;

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 37px;
    text-align: center;
    color: #6D708B;
    margin-top: 60px;
  }

  .back {
    font-style: normal;
    font-weight: 600;
    font-size: 18px;
    line-height: 28px;
    text-align: center;
    color: #8075DC;
    margin-top: 12px;
    text-decoration: none;
  }
}

@media screen and (width <= 1439px) {
  .cart-image {
    width: 230px;
    height: 230px;
    margin-top: 46px;
  }

  .cart-container {
    .title {
      font-size: 22px;
      line-height: 34px;
      margin-top: 48px;
    }

    .back {
      margin-top: 24px;
      font-size: 18px;
    }
  }
}

@media screen and (width <= 1023px) {
  .cart-image {
    width: 290px;
    height: 290px;
    margin-top: 201px;
  }
}

@media screen and (width <= 599px) {
  .cart-image {
    width: 200px;
    height: 200px;
    margin-top: 76px;
  }

  .cart-container {
    .title {
      font-size: 18px;
      line-height: 28px;
      margin-top: 40px;
    }

    .back {
      font-size: 14px;
      line-height: 22px;
      margin-top: 10px;
    }
  }
}

</style>
