<template>
  <div v-if="productGroupLayout === 'tab'"
       class="products-tab-"
       :style="options.style"
       :class="options.className">
    <product-tab :layout="options.rowLayout"
                 :itemList="groups" /></div>
  <div v-else-if="productGroupLayout === 'shelf'"
       class="product-shelf-row">
    <product-shelf :itemList="groups"
                   :layout="options.rowLayout"
                   :rowStyle="options.rowStyle"
                   :labelStyle="options.shelfRowLabelStyle" />
  </div>
</template>

<script>
import ProductTab from './components/ProductTab.vue'
import ProductShelf from './components/ProductShelf.vue'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductTab,
    ProductShelf
  },
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {
      title: null,
      subtitle: null,
      tab: null,
      groups: [],
      productGroupLayout: null
    }
  },
  watch: {
    options: {
      handler() {
        this.loadConfig()
      }
    }
  },
  mounted() {
    this.loadConfig()
  },
  methods: {
    loadConfig() {
      this.groups = this.options.list
      this.productGroupLayout = this.options.productGroupLayout
    }
  }
}
</script>

<style lang="scss" scoped>
.products-tab-panel-container {
  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 41px;
    letter-spacing: -0.02em;
    color: #575962;
    margin-bottom: 30px;
    text-align: center;
  }

  .subtitle{
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 31px;
    letter-spacing: -0.02em;
    color: #575962;
    text-align: center;
    margin-top: 20px;
  }

  .tabs-wrapper {
    display: flex;
    overflow-x: auto;
    justify-content: center;
    align-items: center;
    .product-tabs {
      display: flex;
      height: 62px;
      background: #F8F4F0;
      border-radius: 16px;
      padding: 5px;

      .product-tab {
        border-radius: 10px;
        margin: 5px;

        &:deep(.q-tab__content .q-focus-helper) {
          display: none;
        }

        &:deep(.q-tab__label) {
          font-size: 18px;
          line-height: 31px;
          text-align: center;
          font-weight: 700;
          padding: 0 15px;
        }
      }
    }
  }
  .tab-panels-wrapper {

    .product-tab-panels {
      background: transparent;
      .product-tab-panel {
        .product-panel-content {
          justify-content: space-between;
          padding: 40px 0;
          width: 100%;

          &.special {
            padding: 15px 15px 5px;
            border-radius: 30px;
            background: #F9F4EF;
          }

          @media screen and (max-width: 600px){
            padding: 0;

            &.special {
              padding: 5px;
            }
          }
        }
      }
    }

  }
}
.product-shelf-row {

}
</style>
