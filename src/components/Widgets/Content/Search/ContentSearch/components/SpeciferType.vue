<template>
  <component :is="activeComponent"
             :data="data" />
</template>

<script>
import { Content } from 'src/models/Content.js'
import { Product } from 'src/models/Product.js'
import ContentItem from 'components/Widgets/Content/Search/ContentSearch/components/ContentItem.vue'
import ProductItem from 'components/Widgets/Content/Search/ContentSearch/components/ProductItem.vue'
export default {
  name: 'MainContentBox',
  components: { ProductItem, ContentItem },
  props: {
    info: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data: () => ({
    data: {},
    activeComponent: ''
  }),
  created () {
    if (this.info.type === 'products') {
      this.activeComponent = 'ProductItem'
      this.data = new Product(this.info)
      return
    }
    this.activeComponent = 'ContentItem'
    this.data = new Content(this.info)
  }
}
</script>
