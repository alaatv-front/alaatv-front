<template>
  <component :is="component" :block-data="blockData" />
</template>

<script>
import ProductBlocks from 'components/Product/ProductBlocks'
import { Block, BlockList } from 'src/models/Block'
export default {
  name: 'Block',
  components: { ProductBlocks },
  data: () => ({
    component: ''
  }),
  props: {
    blockData: {
      type: Block,
      default: new BlockList()
    }
  },
  created () {
    this.checkBlockType()
  },
  methods: {
    checkBlockType () {
      const data = this.blockData
      console.log(this.blockData)
      if (data.products.list.length > 0) {
        this.component = 'ProductBlocks'
      }
    }
  }
}
</script>

<style scoped>

</style>
