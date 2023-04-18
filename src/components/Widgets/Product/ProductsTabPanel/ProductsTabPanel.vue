<template>
  <div class="product-shelf-row"
       :style="style"
       :class="localOptions.className">
    <product-panel :loading="loading"
                   :data="products"
                   :options="localOptions" />
  </div>
</template>

<script>
import ProductPanel from './components/ProductPanel.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductPanel
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  props: {
    style: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      products: [],
      productFlatList: [],
      loading: false,
      defaultOptions: {
        className: ''
      }
    }
  },
  methods: {
    extractProducts(group) {
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'GroupList') {
          this.extractProducts(groupItem.data)
        } else {
          this.productFlatList.push(...groupItem.data)
        }
      }
    },
    replaceProducts(optionList, productList) {
      for (let index = 0; index < optionList.length; index++) {
        const group = optionList[index]
        if (group.type === 'GroupList') {
          this.replaceProducts(optionList[index].data, productList)
        } else {
          for (let productIndex = 0; productIndex < optionList[index].data.length; productIndex++) {
            if (productList.find(product => product.id === optionList[index].data[productIndex])) {
              optionList[index].data[productIndex] = productList.find(product => product.id === optionList[index].data[productIndex])
            }
          }
        }
      }
    },
    getProductsPromise() {
      this.extractProducts(JSON.parse(JSON.stringify(this.data)))
      return this.$apiGateway.product.getProductList({ productList: this.productFlatList })
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (productList) {
      const products = this.data
      this.replaceProducts(products, productList.list)
      this.products = products
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
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
