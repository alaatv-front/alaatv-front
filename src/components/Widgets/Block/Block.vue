<template>
  <div class="block-section">
    <div class="row justify-between q-pb-md">
      <div
        class="blockTitle">{{data.title}}</div>
      <q-btn
        v-if="!data.banners && !data.banners.length "
        round
        color="primary"
        :icon="isGridView ? 'grid_view':'sync_alt'"
        @click="isGridView = !isGridView"
      >
      </q-btn>
    </div>

    <div class="block-container"
    >
      <slider
        v-if="data.banners && data.banners.length > 0"
        class="q-mx-lg"
        :data="data.banners"
      />
      <div v-if="data.products.list.length > 0"
           class="item-container"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="product in this.data.products.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="product.id"
        >
          <Product-item
            class="q-mx-lg"
            :data="product"
          />
        </div>

      </div>
      <div v-if="data.sets.list.length > 0"
           class="item-container"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="set in this.data.sets.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="set.id"
        >
          <set-item
            class="q-mx-lg"
            :data="set"
          />
        </div>

      </div>
      <div v-if="data.contents.list.length > 0"
           class="item-container"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="content in this.data.contents.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="content.id"
        >
          <content-item
            class="q-mx-lg"
            :data="content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from 'src/components/Widgets/ProductItem/productItem'
import Slider from 'src/components/Widgets/Slider'
import SetItem from 'components/Widgets/SetItem/setItem'
import ContentItem from 'components/Widgets/ContentItem/contentItem'
import { Block } from 'src/models/Block'

export default {
  name: 'Block',
  components: { ContentItem, SetItem, ProductItem, Slider },
  data: () => ({
    isGridView: false
  }),
  props: {
    data: {
      type: Block,
      default: new Block()
    }
  },
  created () {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.block-section{
  border: 1px solid #e60808;
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
