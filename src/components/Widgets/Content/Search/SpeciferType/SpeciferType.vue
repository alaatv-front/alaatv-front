<template>
  <component :is="activeComponent"
             :data="data" />
</template>

<script>
import ProductItem from 'components/Widgets/Content/Search/ProductItem/ProductItem.vue'
import ContentItem from 'components/Widgets/Content/Search/ContentItem/ContentItem.vue'
import { Product } from 'src/models/Product.js'
import { Content } from 'src/models/Content.js'
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
