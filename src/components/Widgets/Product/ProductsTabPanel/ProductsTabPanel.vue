<template>
  <div v-if="localOptions.productGroupLayout === 'tab'"
       class="product-tab"
       :style="localOptions.style"
       :class="localOptions.className">
    <product-tab :layout="localOptions.rowLayout"
                 :loading="loading"
                 :itemList="products"
                 :active-bg-color="localOptions.activeBgColor"
                 :active-color="localOptions.activeColor"
                 :indicator-color="localOptions.indicatorColor" />
  </div>
  <div v-else-if="localOptions.productGroupLayout === 'shelf'"
       class="product-shelf-row">
    <product-shelf :itemList="products"
                   :loading="loading"
                   :layout="localOptions.rowLayout"
                   :rowStyle="localOptions.rowStyle"
                   :labelStyle="localOptions.shelfRowLabelStyle" />
  </div>
</template>

<script>
import ProductTab from './components/ProductTab.vue'
import ProductShelf from './components/ProductShelf.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductTab,
    ProductShelf
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  props: {
    isWidget: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      products: [],
      productFlatList: [],
      loading: false,
      defaultOptions: {
        title: null,
        subtitle: null,
        tab: null,
        list: [],
        productGroupLayout: null,
        className: '',
        rowLayout: null,
        style: {},
        rowStyle: {},
        shelfRowLabelStyle: {},
        activeColor: null,
        indicatorColor: null,
        activeBgColor: null
      }
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    extractProducts(group) {
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'group') {
          this.extractProducts(groupItem.list)
        } else {
          this.productFlatList.push(...groupItem.products)
        }
      }
    },
    replaceProducts(optionList, productList) {
      for (let index = 0; index < optionList.length; index++) {
        const group = optionList[index]
        if (group.type === 'group') {
          this.replaceProducts(optionList[index].list, productList)
        } else {
          for (let productIndex = 0; productIndex < optionList[index].products.length; productIndex++) {
            optionList[index].products[productIndex] = productList.find(product => product.id === optionList[index].products[productIndex])
          }
        }
      }
    },
    getProducts() {
      if (!this.isWidget) {
        this.products = this.defaultOptions.list
        return
      }
      const products = this.localOptions.list
      this.extractProducts(this.localOptions.list)
      if (this.isWidget) {
        this.loading = true
        this.$apiGateway.product.getProductList({ productList: this.productFlatList })
          .then(productList => {
            this.replaceProducts(products, productList.list)
            this.products = products
            this.loading = false
          })
          .catch(() => {
            this.loading = false
          })
      }
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
