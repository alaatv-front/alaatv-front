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
      <div v-for="(product, index) in displayableProducts"
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
                     :options="options.expandedButtonOptions"
                     @click="expandPanel" />
      <action-button v-else
                     class="action-btn"
                     :options="options.collapsedButtonOptions"
                     @click="collapsePanel" />
    </div>
  </div>
</template>

<script>
import ProductRowSkeleton from '../ProductRowSkeleton.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import ProductItem from '../../../ProductItem/ProductItem.vue'
import ActionButton from 'src/components/Widgets/ActionButton/ActionButton.vue'

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
    displayableProducts () {
      if (this.isPanelCollapsed) {
        return this.data.slice(0, this.options.showInCollapse)
      } else {
        return this.data
      }
    },
    colClassName () {
      const colNumber = this.options.colNumber ? this.options.colNumber : ''

      return colNumber
    }
  },
  methods: {
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
    width: 100%;
  }
}

</style>
