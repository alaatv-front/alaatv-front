<template>
  <div v-for="(item, index) in data"
       :key="index"
       ref="productShelf"
       class="product-panel">
    <div v-if="item.options.label "
         class="col-12 product-label"
         :style="item.options.labelStyle">
      {{ item.options.label }}
    </div>
    <div class="product-content row"
         :style="item.options.style">
      <product-panel :loading="loading"
                     :data="[item]"
                     :options="item.options" />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'ProductShelf',
  components: {
    ProductPanel: defineAsyncComponent(() =>
      import('../ProductPanel.vue')
    )
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    layout: {
      type: String,
      default: 'scroll'
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    scrollToShelf () {
      const el = this.$refs.productShelf
      const headerOffset = 150
      const elementPosition = el.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    },
    isProduct(item) {
      return item.type === 'product'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel {
  .product-label {
    font-size: 18px;
    line-height: 31px;
    font-weight: 700;
    padding: 15px;
  }
  .product-content {
    justify-content: space-between;
    padding: 10px 0 40px;
    width: 100%;

    @media screen and (max-width: 600px){
      padding: 0;
    }
  }
}
</style>
