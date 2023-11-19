<template>
  <div class="block-container">
    <div v-if="block.products.list.length > 0"
         v-dragscroll
         class="item-container"
         :class="isGridView ? 'row' : 'scroll-view'">
      <div v-for="product in block.products.list"
           :key="product.id"
           :class="{
             'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12': isGridView
           }"
           class="product-spacing">
        <product-item :options="product" />
      </div>
      <div v-if="block?.url?.web"
           class="block-item-box">
        <a :href="block?.url?.web"
           class="show-more-title">
          نمایش بیشتر
        </a>
      </div>
    </div>
    <div v-if="block.sets.list.length > 0"
         v-dragscroll
         class="item-container"
         :class="isGridView ? 'row' : 'scroll-view'">
      <div v-for="set in block.sets.list"
           :key="set.id"
           :class="{
             'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12': isGridView
           }"
           class="set-spacing">
        <set-item :data="set" />
      </div>
      <div class="block-item-box">
        <a :href="block?.url?.web"
           class="show-more-title">
          نمایش بیشتر
        </a>
      </div>
    </div>
    <div v-if="block.contents.list.length > 0"
         class="item-container row scroll-view">
      <div v-for="content in block.contents.list"
           :key="content.id"
           class="col-5 content-spacing">
        <content-item :options="content" />
      </div>
    </div>
  </div>
</template>

<script>
import SetItem from 'components/Widgets/SetItem/SetItem.vue'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import { Block } from 'src/models/Block'

export default {
  name: 'favItem',
  components: {
    ContentItem,
    SetItem,
    ProductItem
  },
  props: {
    options: {
      type: Block,
      default: new Block()
    }
  },
  data () {
    return {
      block: new Block()
    }
  },
  mounted () {
    this.block = new Block(this.options)
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.block-container{
  display: flex;
  margin-bottom: 5px;

  .scroll-view {
    display: flex;
    width: 100%;
    overflow-y: scroll;

    /* this padding is needed due to move animation of card
    to avoid overflow behavior:
    https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue
    */
    padding-top: 10px;
    padding-bottom: 10px;

    @media screen and (width <= 600px){
      height: 500px;
    }
  }
}
</style>
