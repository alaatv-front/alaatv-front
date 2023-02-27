<template>
  <div class="block-section">
    <div v-if="isThereData"
         class="block-header row q-pa-md q-mb-sm"
         :class="block.headerCustomClass">
      <a :href="block?.url?.web"
         class="block-title">
        {{ block.title }}
      </a>
      <q-btn v-if="!block.banners || block.banners.list.length === 0"
             round
             color="primary"
             :icon="isGridView ? 'sync_alt' : 'grid_view'"
             @click="isGridView = !isGridView" />
    </div>
    <div class="block-container">
      <slider v-if="block.banners && block.banners.list.length > 0"
              :options="bannerSlides" />
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
          <product-item :options="{product, minWidth: '318px'}" />
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
          <set-item :options="{set, minWidth: '318px'}" />
        </div>
        <div class="block-item-box">
          <a :href="block?.url?.web"
             class="show-more-title">
            نمایش بیشتر
          </a>
        </div>
      </div>
      <div v-if="block.contents.list.length > 0"
           v-dragscroll
           class="item-container"
           :class="isGridView ? 'row' : 'scroll-view'">
        <div v-for="content in block.contents.list"
             :key="content.id"
             :class="{
               'col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-12': isGridView
             }"
             class="content-spacing">
          <content-item :options="{content, minWidth: '318px'}" />
        </div>
        <div class="block-item-box">
          <a :href="block?.url?.web"
             class="show-more-title">
            نمایش بیشتر
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { Block } from 'src/models/Block.js'
import { mixinWidget } from 'src/mixin/Mixins.js'
import Slider from 'components/Widgets/Slider/Slider.vue'
import SetItem from 'components/Widgets/SetItem/SetItem.vue'
import ContentItem from 'components/Widgets/ContentItem/ContentItem.vue'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'

export default {
  name: 'Block',
  components: {
    ContentItem,
    SetItem,
    ProductItem,
    Slider
  },
  directives: {
    dragscroll
  },
  mixins: [mixinWidget],
  props: {
    options: {
      type: Block,
      default: new Block()
    }
  },
  data: () => ({
    isGridView: false,
    block: new Block()
  }),
  computed: {
    isThereData() {
      return !!(
        this.block.banners.list.length ||
        this.block.products.list.length ||
        this.block.contents.list.length ||
        this.block.sets.list.length
      )
    },
    blocksToShow() {
      return this.getBlocks(this.blocks)
    },
    bannerSlides() {
      this.block.banners.list.forEach(element => {
        element.photo = {
          src: element.photo
        }
      })
      return this.block.banners
    }
  },
  watch: {
    options: {
      handler() {
        this.block = new Block(this.options)
      },
      deep: true
    }
  },
  mounted() {
    if (this.options.apiName) {
      this.loadBlocks()
    } else {
      this.block = new Block(this.options)
    }
  },

  methods: {
    loadBlocks() {
      this.getBlocksByRequest()
    },

    getBlocksByRequest() {
      this.block.loading = true
      this.getApiRequest()
        .then((products) => {
          console.log(products)
          this.block = new Block({
            title: 'محصولات مرتبط',
            products
          })

          this.block.loading = false
        })
        .catch(() => {
          this.block.loading = false
        })
    },

    getBlocks(blocks) {
      if (!blocks || !blocks.list || blocks.list.length === 0) {
        return
      }
      return blocks.list.slice(this.options.from, this.options.to)
    },

    getApiRequest() {
      if (this.options.apiName === 'home') {
        return this.$apiGateway.pages.home({
          cache: {
            TTL: 100000
          }
        })
      }
      if (this.options.apiName === 'shop') {
        return this.$apiGateway.pages.shop()
      }
      if (this.options.apiName === 'content') {
        return this.$apiGateway.content.relatedProducts({ id: this.$route.params.id })
      }
      return Promise.reject('wrong api name')
    }
  }
}
</script>

<style lang="scss" scoped>
.product-spacing {
  margin-right: 30px;
}
.set-spacing {
  margin-right: 30px;
}
.content-spacing {
  margin-right: 30px;
}

.block-section {
  margin-bottom: 30px;
  .block-header {
    border-radius: 10px;
    justify-content: space-between;

    .block-title {
      text-decoration: none;
      cursor: pointer;
      margin: 0;
      font-style: normal;
      font-weight: 600;
      font-size: 20px;
      line-height: 31px;
      color: #333333;
      padding: 0 0 4px 0;
      border-bottom: 1px solid white;
      transition: 0.3s ease;
      &:hover {
        padding: 0 0 6px 0;
        border-color: #333333;
      }
    }
  }

  .block-container {
    display: flex;
    margin-bottom: 5px;
    .scroll-view {
      display: flex;
      width: 100%;
      overflow-x: scroll;
      /* this padding is needed due to move animation of card
      to avoid overflow behavior:
      https://stackoverflow.com/questions/6421966/css-overflow-x-visible-and-overflow-y-hidden-causing-scrollbar-issue
      */
      padding-top: 10px;
      padding-bottom: 10px;
      @media screen and (max-width: 600px){
        height: 500px;
      }
    }

    .item-container {
      .block-item-box {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 200px;
        .show-more-title {
          color: blue;
          text-decoration: none;
          cursor: pointer;
          margin: 0;
          line-height: 24px;
          letter-spacing: -0.03em;
          padding: 4px;
          border: 1px solid blue;
          transition: 0.3s ease;
          &:hover {
            background-color: blue;
            color: #f1f1f1;
          }
        }
      }
    }
  }
}
</style>
