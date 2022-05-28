<template>
  <div class="block-section">
    <q-btn
      round
      color="primary"
      :icon="isGridView ? 'grid_view':'sync_alt'"
      @click="isGridView = !isGridView"
    >
    </q-btn>
    <div class="block-container"
    >
      <div v-if="this.block.products.list.length > 0"
           class="item-container"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="product in this.block.products.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="product.id"
        >
          <Product-item
            class="q-mx-lg"
            :product-data="product"
          />
        </div>

      </div>

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
    isGridView: false
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
.block-section{
  background-color: #ecb3b3;
  margin:30px;
  .block-container{
    display: flex;
    .scroll-view{
      display: flex;
      width:100%;
      overflow: auto;
    }
    .item-container{
    }
}
}

</style>
