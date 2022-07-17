<template>
  <div class="block-section q-mx-md">
    <div
      v-if="isThereData"
      class="block-header row justify-between q-pa-md q-mb-sm bg-white"
      :class="data.headerCustomClass"
    >
      <div class="row items-center block-title">
        <div class="row items-center">
          <q-badge
            rounded
            class="q-mr-sm"
            color="primary"/>
        </div>
        <p class="title-box">
          {{ data.title }}
        </p>
      </div>
      <q-btn
        v-if="!data.banners || data.banners.list.length === 0 "
        round
        color="primary"
        :icon="isGridView ? 'sync_alt':'grid_view'"
        @click="isGridView = !isGridView"
      >
      </q-btn>
    </div>
    <div class="block-container"
    >
      <slider
        v-if="data.banners && data.banners.list.length > 0"
        class="q-mx-lg"
        :data="data.banners"
      />
      <div
        v-if="data.products.list.length > 0"
        class="item-container"
        :class="isGridView? 'row': 'scroll-view'"
        v-dragscroll
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
        <div class="block-item-box">
          <a class="show-more-title">نمایش بیشتر </a>
        </div>
      </div>
      <div
        v-if="data.sets.list.length > 0"
        class="item-container"
        :class="isGridView? 'row': 'scroll-view'"
        v-dragscroll
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
        <div class="block-item-box">
          <a class="show-more-title">نمایش بیشتر </a>
        </div>
      </div>
      <div
        v-if="data.contents.list.length > 0"
        class="item-container"
        :class="isGridView? 'row': 'scroll-view'"
        v-dragscroll
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
        <div class="block-item-box">
          <a class="show-more-title">نمایش بیشتر </a>
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
import { dragscrollNext as dragscroll }  from 'vue-dragscroll'

export default {
  name: 'Block',
  components: {
    ContentItem,
    SetItem,
    ProductItem,
    Slider
  },
  data: () => ({
    isGridView: false
  }),
  props: {
    data: {
      type: Block,
      default: new Block()
    }
  },
  directives: {
    dragscroll
  },
  computed: {
    isThereData () {
      return !!(this.data.banners.list.length || this.data.products.list.length || this.data.contents.list.length || this.data.sets.list.length)
    }
  },
  created () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.block-section {
  .block-header {
    border-radius: 10px;

    .block-title {
      .title-box {
        margin: 0;
        font-weight: 500;
        font-size: 18px;
        line-height: 24px;
        letter-spacing: -0.03em;
        color: #333333;
      }
    }
  }

  margin: 30px;

  .block-container {
    display: flex;

    .scroll-view {
      display: flex;
      width: 100%;
      overflow: auto;
    }

    .item-container {
      .block-item-box {
        display: flex;
        align-items: center;
        min-width: 200px;
        .show-more-title {
          text-decoration: none;
          color:blue;
          min-width: 200px;
          width: 100%;
          text-align: center;
        }

      }
    }
  }
}
</style>
