<template>
  <div :style="style"
       :class="className">
    Test-component-1
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
import { APIGateway } from 'src/api/APIGateway'

export default {
  name: 'Test-component-1widget',
  mixins: [mixinWidget],
  setup () {
    const cart = APIGateway.cart
    const thisUser = APIGateway.user
    const product = APIGateway.product
    thisUser.get({
      data: {
        id: '219548'
      },
      cache: {
        TTL: 10000
      }
    })
    return {
      thisUser,
      cart,
      product
    }
  },
  computed: {
    api4g4g4 () {
      return this.$apiGateway
    }
  }
}
</script>

<style scoped>
div {
  border: solid 1px red;
}
</style>
