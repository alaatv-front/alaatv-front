<template>
  <q-card class="card-slider-container main-card grey-card">
    <q-card-section>
      <div class="row items-center">
        <div class="col-6">
          <div class="row items-center">
            <lazy-img src="https://nodes.alaatv.com/upload/alaaPages/2023-11/Rectangle1700578454.png" />
            <h6 class="title">
              {{title}}
            </h6>
            <slot />
          </div>
        </div>
        <div class="col-6">
          <div class="carousel-btns flex justify-end">
            <q-btn icon="ph:caret-right"
                   class="carousel-right"
                   text-color="grey-9"
                   color="grey-1"
                   round
                   @click="scrollToRight" />
            <q-btn icon="ph:caret-left"
                   class="carousel-left"
                   text-color="grey-9"
                   color="grey-1"
                   round
                   @click="scrollToLeft" />
          </div>
        </div>
      </div>
    </q-card-section>
    <q-card-section>
      <div class="content">
        <div v-if="sliderType === 'content'"
             class="product-tab-panel">
          <product-demos ref="scrollContainer"
                         :options="{
                           contents: contents,
                           product: product
                         }" />
        </div>
        <div v-else-if="sliderType === 'product'"
             ref="scrollContainer"
             v-dragscroll
             class="contents-block">
          <div v-for="product in products.list"
               :key="product"
               class="product">
            <product-item :options="{
              backgrounds: {
                xs: {
                  color: null,
                },
                sm: {
                  color: null,
                },
                md: {
                  color: null,
                },
                lg: {
                  color: null,
                },
                xl: {
                  color: null,
                }
              },
              product,
              theme: 'ThemeProduct3'
            }" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import lazyImg from 'components/lazyImg.vue'
import ProductDemos from 'src/components/Widgets/Product/ProductDemos/ProductDemos.vue'
import ProductItem from 'src/components/Widgets/Product/ProductItem/ProductItem.vue'
import { ContentList } from 'src/models/Content'
import { Product, ProductList } from 'src/models/Product'

export default {
  name: 'CartSlider',
  components: {
    lazyImg,
    ProductDemos,
    ProductItem
  },
  directives: {
    dragscroll
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    sliderType: {
      type: String,
      default: 'product'
    },
    contents: {
      type: ContentList,
      default: new ContentList()
    },
    product: {
      type: Product,
      default: new Product()
    },
    products: {
      type: ProductList,
      default: new ProductList()
    }
  },
  methods: {
    scrollToRight () {
      this.$refs.scrollContainer.scrollToRight()
    },
    scrollToLeft () {
      this.$refs.scrollContainer.scrollToLeft()
    }
  }
}
</script>

<style scoped lang="scss">
.card-slider-container {
  .carousel-btns {
    .carousel-right {
      margin-right: $spacing-base;
    }
  }
  .title {
    margin-left: $space-2;
  }
  .content {
    margin-top: $space-6;
    .product-tab-panel {
      overflow-x: auto;
      white-space: nowrap;
    }
    .contents-block {
      display: flex;
      white-space: nowrap;
      overflow-x: auto;
      .product {
        margin-right: $space-6;
      }
    }
  }
}
</style>
