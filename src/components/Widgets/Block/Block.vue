<template>
  <div class="block-section q-mx-md">
    <div class="block-header row justify-between q-pa-md q-mb-sm bg-white">
      <div class="row items-center block-title">
        <div class="row items-center">
          <q-badge rounded
                   class="q-mr-sm"
                   color="primary" />
        </div>
        <p class="title-box">
          {{data.title}}
        </p>

      </div>
      <q-btn
        round
        color="primary"
        :icon="isGridView ? 'grid_view':'sync_alt'"
        @click="isGridView = !isGridView"
      >
      </q-btn>
    </div>
    <div class="block-container"
    >
      <div v-if="data.products.list.length > 0"
           class="item-container q-pb-md"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="product in this.data.products.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="product.id"
        >
          <Product-item
            class="q-mr-md"
            :data="product"
          />
        </div>

      </div>
      <div v-if="data.sets.list.length > 0"
           class="item-container q-pb-md"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="set in this.data.sets.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="set.id"
        >
          <set-item
            class="q-mr-md"
            :data="set"
          />
        </div>

      </div>
      <div v-if="data.contents.list.length > 0"
           class="item-container q-pb-md"
           :class="isGridView? 'row': 'scroll-view'"
      >
        <div v-for="content in this.data.contents.list"
             :class="{'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12':isGridView}"
             :key="content.id"
        >
          <content-item
            class="q-mr-md"
            :data="content"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from 'src/components/Widgets/ProductItem/productItem'
import SetItem from 'components/Widgets/SetItem/setItem'
import ContentItem from 'components/Widgets/ContentItem/contentItem'
import { Block } from 'src/models/Block'

export default {
  name: 'Block',
  components: { ContentItem, SetItem, ProductItem },
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
  .block-header{
    border-radius: 10px;
    .block-title{
      .title-box{
        margin: 0;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
      }
    }
  }

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
