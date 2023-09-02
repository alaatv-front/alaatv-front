<template>
  <div class="product-panels-row"
       :style="localOptions.style"
       :class="localOptions.className">
    <product-panel :loading="loading"
                   :data="cloneData"
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
  data() {
    return {
      products: [],
      loading: false,
      defaultOptions: {
        className: '',
        style: {},
        data: []
      },
      cloneData: []
    }
  },
  computed: {
    productFlatList() {
      return this.extractProducts(this.localOptions.data)
    },
    productIdList() {
      return this.productFlatList
    },
    productIdListLength() {
      return this.productIdList.length
    }
  },
  watch: {
    productIdListLength(vale) {
      this.loadData()
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    extractProducts(group) {
      const products = []
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'GroupList') {
          const productStack = this.extractProducts(groupItem.data)
          products.push(...productStack)
        } else {
          this.fixGroupData(groupItem.data)
          products.push(...groupItem.data)
        }
      }
      return products
    },
    replaceProducts(optionList, productList) {
      for (let groupIndex = 0; groupIndex < optionList.length; groupIndex++) {
        const group = optionList[groupIndex]
        if (group.type === 'GroupList') {
          this.replaceProducts(optionList[groupIndex].data, productList)
        } else if (group.type === 'ProductList') {
          for (let productIndex = 0; productIndex < optionList[groupIndex].data.length; productIndex++) {
            const productItem = productList.find(product => product.id === optionList[groupIndex].data[productIndex].id)
            if (productItem) {
              optionList[groupIndex].data[productIndex] = productItem
            }
          }
        }
      }
    },
    fixGroupData(data) {
      for (let ProductIndex = 0; ProductIndex < data.length; ProductIndex++) {
        const productItem = data[ProductIndex]
        data[ProductIndex] = typeof productItem === 'number' ? productItem : productItem.id
      }
    },
    getProductsPromise() {
      const data = {
        productIds: this.productIdList,
        params: {
          length: this.productIdListLength
        }
      }
      return this.$apiGateway.product.getProductList(data)
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (productList) {
      this.replaceProducts(this.cloneData, productList.list)
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    },
    loadData() {
      this.loading = true
      this.cloneData = JSON.parse(JSON.stringify(this.localOptions.data))
      console.log('cloneeeee', this.cloneData)
      this.getProductsPromise()
        .then(productList => {
          this.replaceProducts(this.cloneData, productList.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panels-row {
  width: 100%;
}
</style>
