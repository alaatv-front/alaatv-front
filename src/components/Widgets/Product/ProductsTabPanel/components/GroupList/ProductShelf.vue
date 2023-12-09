<template>
  <div v-for="(item, index) in data"
       :key="index"
       ref="productShelf"
       class="product-panel">
    <div v-if="item.options.hasLabel || item.options.hasAction"
         class="col-12 product-label">
      <text-widget :options="item.options.labelOptions" />
      <action-button v-if="item.options.hasAction"
                     :options="item.options.actionButtonOptions" />
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
import TextWidget from 'src/components/Widgets/TextWidget/TextWidget.vue'
import ActionButton from 'src/components/Widgets/ActionButton/ActionButton.vue'

export default {
  name: 'ProductShelf',
  components: {
    ProductPanel: defineAsyncComponent(() =>
      import('../ProductPanel.vue')
    ),
    TextWidget,
    ActionButton
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
    isProduct (item) {
      return item.type === 'product'
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panel {
  .product-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 18px;
    line-height: 31px;
    font-weight: 700;
    padding: 15px;
  }

  .product-content {
    justify-content: space-between;
    width: 100%;
  }
}
</style>
