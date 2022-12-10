<template>
  <div :style="style"
       :class="className">
    Test-component-1
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import { API_Gateway } from 'src/api/APIGateway'

export default {
  name: 'Test-component-1widget',
  mixins: [mixinWidget],
  setup() {
    const cart = API_Gateway.cart
    const thisUser = API_Gateway.user
    const product = API_Gateway.product
    // thisUser.get({
    //   id: '219548',
    //   cache: {
    //     TTL: 10000
    //   }
    // }).then(res => {
    //   console.log(res)
    // })
    // cart.review().then(res => {
    //   console.log(res)
    // })
    return {
      thisUser,
      cart,
      product
    }
  },
  computed: {
    api4g4g4() {
      return this.$api_gateway
    }
  }
}
</script>

<style scoped>
div {
  border: solid 1px red;
}
</style>
