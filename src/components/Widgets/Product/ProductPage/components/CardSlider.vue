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
          <div class="carousel-btns text-right">
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
        <div v-if="sliderType === 'content'">
          <div class="product-tab-panel">
            <product-demos :options="{
              contents: contents,
              product: product
            }" />
          </div>
        </div>
        <div v-else-if="sliderType === 'product'">
          <div v-dragscroll
               class="contents-block">
            <div v-for="product in products.list"
                 :key="product"
                 class="product">
              <product-item :options="{
                product,
                theme: 'ThemeProduct3'
              }" />
            </div>
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
  }
}
</script>

<style scoped lang="scss">
@import "src/css/Theme/spacing";

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
    .contents-block {
      display: flex;
      overflow: auto;
      .product {
        margin-right: $space-6;
      }
    }
  }
}
</style>
