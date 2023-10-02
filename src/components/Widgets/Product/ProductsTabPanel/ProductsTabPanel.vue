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
import { Product } from 'src/models/Product.js'
import { APIGateway } from 'src/api/APIGateway.js'
import ProductPanel from './components/ProductPanel.vue'
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'ProductsTabPanel',
  components: {
    ProductPanel
  },
  mixins: [mixinPrefetchServerData, mixinWidget],
  emits: ['update:options'],
  data() {
    return {
      loading: false,
      clonedData: [],
      defaultOptions: {
        className: '',
        style: {},
        data: []
      }
    }
  },
  computed: {
    localOptions: {
      get() {
        const clonedOptions = JSON.parse(JSON.stringify(Object.assign(this.defaultOptions, this.options)))
        const clonedDataAdapter = function (group) {
          const groupLength = group.length
          for (let index = 0; index < groupLength; index++) {
            if (group[index].type === 'GroupList') {
              clonedDataAdapter(group[index].data)
            } else {
              group[index].data = group[index].data.map(item => isNaN(item) ? (new Product(item)) : (new Product({ id: item })))
            }
          }
        }

        clonedDataAdapter(clonedOptions.data)

        return clonedOptions
      },
      set (newValue) {
        const dataAdapter = function (group) {
          const groupLength = group.length
          for (let index = 0; index < groupLength; index++) {
            if (group[index].type === 'GroupList') {
              dataAdapter(group[index].data)
            } else {
              group[index].data = group[index].data.map(item => isNaN(item) ? item.id : item)
            }
          }
        }

        dataAdapter(newValue.data)

        this.$emit('update:options', newValue)
      }
    },
    productFlatList () {
      const clonedData = this.optionsWithObjectProduct
      return this.extractProducts(clonedData)
    },
    productFlatListLength () {
      return this.productFlatList.length
    },
    optionsWithObjectProduct () {
      const clonedData = JSON.parse(JSON.stringify(this.localOptions.data))

      const clonedDataAdapter = function (group) {
        const groupLength = group.length
        for (let index = 0; index < groupLength; index++) {
          if (group[index].type === 'GroupList') {
            clonedDataAdapter(group[index].data)
          } else {
            group[index].data = group[index].data.map(item => isNaN(item) ? (new Product(item)) : (new Product({ id: item })))
          }
        }
      }

      clonedDataAdapter(clonedData)

      return clonedData
    }
  },
  watch: {
    productFlatListLength (vale) {
      this.loading = true
      this.getProductsPromise()
        .then(productList => {
          this.clonedData = this.optionsWithObjectProduct
          this.replaceProducts(this.clonedData, productList.list)
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
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
        productIds: this.productFlatList,
        params: {
          length: this.productFlatListLength
        }
      }

      return APIGateway.product.getProductList(data)
    },
    prefetchServerDataPromise () {
      this.loading = true
      return this.getProductsPromise()
    },
    prefetchServerDataPromiseThen (productList) {
      this.clonedData = this.optionsWithObjectProduct
      this.replaceProducts(this.clonedData, productList.list)
      this.loading = false
    },
    prefetchServerDataPromiseCatch () {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.product-panels-row {
  width: 100%;
}
</style>
