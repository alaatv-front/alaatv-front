<template>
  <div class="product-content-wrapper">
    <div v-if="loading"
         class="product-content row"
         :class="options.className"
         :style="options.style">
      <product-row-skeleton :skeletons="4" />
    </div>
    <div v-else
         class="product-content row justify-center items-center"
         :class="{'expand-panel': options.hasExpand, ...options.className}"
         :style="options.style">
      <div v-for="(product, index) in data"
           :key="index"
           :class="colClassName"
           class="product-item">
        <product-item :options="{product: product, ...localOptions.productOptions}" />
      </div>
    </div>
    <div v-if="options.hasExpand"
         class="col-12 text-center view-more">
      <q-btn v-if="isPanelCollapsed"
             label="مشاهده بیشتر"
             class="size-lg"
             flat
             text-color="neutral-4"
             icon="ph:caret-down"
             @click="expandPanel" />
      <q-btn v-else
             label="بستن"
             class="size-lg"
             flat
             text-color="neutral-4"
             icon="ph:caret-up"
             @click="collapsePanel" />
    </div>
  </div>
</template>

<script>
import ProductRowSkeleton from '../ProductRowSkeleton.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ProductItem from '../../../ProductItem/ProductItem.vue'

export default {
  name: 'GridRow',
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
    options: {
      type: Object,
      default: () => {}
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      collapseHeight: '',
      height: '100%',
      isPanelCollapsed: true,
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
      const colNumber = this.options.colNumber ? this.options.colNumber : ''

      return colNumber
    }
  },
  mounted () {
    this.height = this.options.collapsedHeight
  },
  methods: {
    expandPanel () {
      this.collapseHeight = this.height
      this.isPanelCollapsed = false
      this.height = '100%'
    },
    collapsePanel () {
      this.height = this.collapseHeight
      this.isPanelCollapsed = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import "src/css/Theme/spacing";

.product-content-wrapper {
  width: 100%;

  .view-more {
    margin-top: $space-5;
  }

  .product-content {
    //justify-content: flex-start;
    padding: $space-3 0 $space-8;
    width: 100%;
    &.expand-panel {
      padding: $space-3 0 0;
      overflow-y: hidden;
      height: v-bind('height');
    }

    @media screen and (width <= 600px){
      padding: 0;
    }

    .product-item {
      padding: 5px;
    }
  }
}

</style>
