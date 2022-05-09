<template>
  <div class="block-container">
    <div v-if="this.block.products.list.length > 0" class="product-container">
      <Product-item
        v-for="product in this.block.products.list"
        :product="product"
      />
    </div>

  </div>
</template>

<script>
import ProductItem from 'src/components/Widgets/ProductItem/productItem'
import { Block, BlockList } from 'src/models/Block'
export default {
  name: 'Block',
  components: { ProductItem },
  data: () => ({
  }),
  props: {
    block: {
      type: Block,
      default: new BlockList()
    }
  },
  created () {
    this.checkBlockType()
  },
  methods: {
    checkBlockType () {
      const data = this.block
      console.log(this.block)
      if (data.products.list.length > 0) {
        this.component = 'ProductBlocks'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.block-container{
  background-color: #ecb3b3;
  margin:10px
}

</style>
