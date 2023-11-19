<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <div v-for="(product, index) in data"
           :key="index"
           :class="colClassName"
           class="product-item">
        <product-item :options="{product: product, ...options}" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ProductRowSkeleton from '../ProductRowSkeleton.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'ScrollRow',
  components: {
    ProductItem,
    ProductRowSkeleton
  },
  mixins: [PageBuilderOptionPanel],
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    },
    options: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      defaultOptions: {
        colNumber: 'col',
        productOptions: {
          theme: 'ThemeDefault',
          className: '',
          height: 'auto',
          boxed: false,
          boxedWidth: 1200,
          style: {},
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: '20px'
          },
          boxShadows: [
            '-2px -4px 10px rgba(255, 255, 255, 0.6)',
            '2px 4px 10px rgba(46, 56, 112, 0.05)'
          ],
          cssHoverEffects: {
            boxShadows: [
              '-5px -6px 10px rgba(255, 255, 255, 0.6)',
              '5px 5px 20px rgba(0, 0, 0, 0.1)'
            ],
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: '20px'
            },
            transition: {
              time: 0.4
            },
            transform: {
              rotate: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              translateX: 0,
              translateY: -10
            }
          }
        }
      }
    }
  },
  computed: {
    colClassName () {
      const colNumber = this.localOptions.colNumber ? this.localOptions.colNumber : ''

      return colNumber
    }
  }
}
</script>

<style lang="scss" scoped>
.product-content-wrapper {
  width: 100%;

  .product-content {
    justify-content: flex-start;
    padding: 10px 0 40px;
    width: 100%;
    overflow-x: auto;
    flex-wrap: nowrap !important;
    max-width: 100%;

    @media screen and (width <= 600px){
      padding: 0;
    }

    .product-item {
      padding: 5px;
    }
  }
}
</style>
