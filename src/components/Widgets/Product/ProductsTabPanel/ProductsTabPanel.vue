<template>
  <div class="product-panels-row"
       :style="localOptions.style"
       :class="localOptions.className">
    <product-panel :loading="loading"
                   :data="clonedData"
                   :options="localOptions" />
  </div>
</template>

<script>
import ProductPanel from './components/ProductPanel.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { APIGateway } from 'src/api/APIGateway'

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
      clonedData: [],
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
      const clonedData = this.getClonedData()
      return this.extractProducts(clonedData)
    },
    productIdList() {
      // return this.productFlatList.map(product => product.id)
      return this.productFlatList
    },
    productIdListLength() {
      return this.productIdList.length
    }
  },
  watch: {
    productIdListLength(vale) {
      this.loading = true
      this.getProductsPromise()
        .then(productList => {
          this.clonedData = this.getClonedData()
          this.replaceProducts(this.clonedData, productList.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    getClonedData () {
      return JSON.parse(JSON.stringify(this.localOptions.data))
    },
    extractProducts(group) {
      const productIds = []
      for (let index = 0; index < group.length; index++) {
        const groupItem = group[index]
        if (groupItem.type === 'GroupList') {
          const productStack = this.extractProducts(groupItem.data)
          productIds.push(...productStack)
        } else {
          const productIdArray = groupItem.data.map(item => (item.id) ? item.id : item)
          productIds.push(...productIdArray)
        }
      }
      return productIds
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
      return APIGateway.product.getProductList(data)
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (productList) {
      this.clonedData = this.getClonedData()
      this.replaceProducts(this.clonedData, productList.list)
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    },
    loadData() {
      this.loading = true
      this.cloneData = JSON.parse(JSON.stringify(this.localOptions.data))
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
