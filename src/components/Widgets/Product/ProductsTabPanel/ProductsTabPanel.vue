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
  data () {
    return {
      loading: false,
      clonedData: [],
      defaultOptions: {
        className: '',
        style: {},
        data: [],
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        }
      }
    }
  },
  computed: {
    localOptions: {
      get () {
        // const clonedOptions = JSON.parse(JSON.stringify(Object.assign(this.defaultOptions, this.options)))
        // const clonedDataAdapter = function (group) {
        //   const groupLength = group.length
        //   for (let index = 0; index < groupLength; index++) {
        //     if (group[index].type === 'GroupList') {
        //       clonedDataAdapter(group[index].data)
        //     } else {
        //       group[index].data = group[index].data.map(item => isNaN(item) ? (new Product(item)) : (new Product({ id: item })))
        //     }
        //   }
        // }
        //
        // clonedDataAdapter(clonedOptions.data)
        //
        // return clonedOptions

        const clonedOptions = Object.assign(this.defaultOptions, this.options)

        // const dataAdapter = function (group) {
        //   const groupLength = group.length
        //   for (let index = 0; index < groupLength; index++) {
        //     if (group[index].type === 'GroupList') {
        //       dataAdapter(group[index].data)
        //     } else {
        //       group[index].data = group[index].data.map(item => isNaN(item) ? item.id : item)
        //     }
        //   }
        // }
        //
        // dataAdapter(clonedOptions.data)

        return clonedOptions
      },
      set (newValue) {
        // const dataAdapter = function (group) {
        //   const groupLength = group.length
        //   for (let index = 0; index < groupLength; index++) {
        //     if (group[index].type === 'GroupList') {
        //       dataAdapter(group[index].data)
        //     } else {
        //       group[index].data = group[index].data.map(item => isNaN(item) ? item.id : item)
        //     }
        //   }
        // }
        //
        // dataAdapter(newValue.data)

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
    extractProducts (group) {
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
    replaceProducts (optionList, productList) {
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
    fixGroupData (data) {
      for (let ProductIndex = 0; ProductIndex < data.length; ProductIndex++) {
        const productItem = data[ProductIndex]
        data[ProductIndex] = typeof productItem === 'number' ? productItem : productItem.id
      }
    },
    getProductsPromise () {
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
@import "quasar-ui-q-page-builder/src/components/Component";

$responsiveSpacing: (
  xs: (
    marginTop: v-bind('localOptions.responsiveSpacing.xs.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xs.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xs.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xs.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xs.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xs.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xs.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xs.paddingBottom'),
  ),
  sm: (
    marginTop: v-bind('localOptions.responsiveSpacing.sm.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.sm.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.sm.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.sm.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.sm.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.sm.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.sm.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.sm.paddingBottom'),
  ),
  md: (
    marginTop: v-bind('localOptions.responsiveSpacing.md.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.md.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.md.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.md.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.md.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.md.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.md.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.md.paddingBottom'),
  ),
  lg: (
    marginTop: v-bind('localOptions.responsiveSpacing.lg.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.lg.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.lg.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.lg.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.lg.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.lg.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.lg.paddingRight'),
  ),
  xl: (
    marginTop: v-bind('localOptions.responsiveSpacing.xl.marginTop'),
    marginLeft: v-bind('localOptions.responsiveSpacing.xl.marginLeft'),
    marginRight: v-bind('localOptions.responsiveSpacing.xl.marginRight'),
    marginBottom: v-bind('localOptions.responsiveSpacing.xl.marginBottom'),
    paddingTop: v-bind('localOptions.responsiveSpacing.xl.paddingTop'),
    paddingLeft: v-bind('localOptions.responsiveSpacing.xl.paddingLeft'),
    paddingRight: v-bind('localOptions.responsiveSpacing.xl.paddingRight'),
    paddingBottom: v-bind('localOptions.responsiveSpacing.xl.paddingBottom'),
  )
);

.product-panels-row {
  @include media-query-spacings($responsiveSpacing, $sizes);

  width: 100%;
}
</style>
