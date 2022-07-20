<template>
  <product-introduction />
  <product-demos />
  <product-review />
</template>

<script>
import productIntroduction from 'components/Widgets/Product/productIntroduction'
import productDemos from 'components/Widgets/Product/productDemos'
import productReview from 'components/Widgets/Product/productReview'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'show',
  components: { productIntroduction, productDemos, productReview },
  mixins:[mixinWidget],
  data () {
    return {}
  },
  created () {},
  methods: {}
}
</script>

<style scoped>

</style>
