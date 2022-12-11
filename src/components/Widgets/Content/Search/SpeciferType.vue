<template>
  <component :is="activeComponent"
             :data="data" />
</template>

<script>
import ProductItem from 'src/components/Widgets/Content/Search/ProductItem'
import ContentItem from 'src/components/Widgets/Content/Search/ContentItem'
import { Product } from 'src/models/Product'
import { Content } from 'src/models/Content'
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
