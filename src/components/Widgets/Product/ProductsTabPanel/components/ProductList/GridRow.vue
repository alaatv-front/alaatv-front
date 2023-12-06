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
         :style="options.style">
      <div v-for="(product, index) in data"
           v-show="showProduct(index)"
           :key="index"
           :class="colClassName"
           class="product-item">
        <product-item :options="{product: product, ...localOptions.productOptions}" />
      </div>
    </div>
    <div v-if="options.hasExpand"
         class="col-12 view-more">
      <action-button v-if="isPanelCollapsed"
                     class="action-btn"
                     :options="options.expandedButtonOptions" />
      <action-button v-else
                     class="action-btn"
                     :options="options.collapsedButtonOptions" />
    </div>
  </div>
</template>

<script>
import ProductRowSkeleton from '../ProductRowSkeleton.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ActionButton from 'components/Widgets/ActionButton/ActionButton.vue'

export default {
  name: 'GridRow',
  components: {
    ProductItem,
    ProductRowSkeleton,
    ActionButton
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
    this.$bus.on('expand', this.expandPanel)
    this.$bus.on('collapse', this.collapsePanel)
  },
  methods: {
    showProduct (index) {
      if (this.isPanelCollapsed) {
        return index < 3
      } else {
        return true
      }
    },
    expandPanel () {
      this.isPanelCollapsed = false
    },
    collapsePanel () {
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
    .action-btn {
      place-content: center;
    }
  }

  .product-content {
    //justify-content: flex-start;
    padding: $space-4 0 0;
    width: 100%;

    @media screen and (width <= 600px){
      padding: 0;
    }

    .product-item {
      padding: 5px;
    }
  }
}

</style>
