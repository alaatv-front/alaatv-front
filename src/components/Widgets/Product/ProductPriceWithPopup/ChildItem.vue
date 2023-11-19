<template>
  <div class="ProductPriceChildItem">
    <div v-if="product.hasChildren()"
         class="ProductPriceChildItem-with-child">
      <q-expansion-item expand-separator
                        dense
                        dense-toggle>
        <template v-slot:header>
          <q-item-section class="checkbox-section"
                          side>
            <q-checkbox v-model="selected"
                        @update:modelValue="onChangeProductWithChildSelected" />
          </q-item-section>
          <q-item-section class="product-name ellipsis-2-lines">
            {{ product.title + '(' + product.id + ')' }}
          </q-item-section>
          <q-item-section side>
            {{ productPrice.toman('final',null) }} تومان
          </q-item-section>
        </template>
        <q-card>
          <product-price-child-item v-for="productCh in product.getChildren().list"
                                    :key="productCh.id"
                                    :ref="'ProductPriceChildItem' + productCh.id"
                                    :product="productCh"
                                    @changeSelected="onChangeSelected" />
        </q-card>
      </q-expansion-item>
    </div>
    <div v-else
         class="ProductPriceChildItem-without-child">
      <q-item>
        <q-item-section class="checkbox-section"
                        side>
          <q-checkbox v-model="selected"
                      @update:modelValue="onChangeChildlessProductSelected" />
        </q-item-section>
        <q-item-section class="product-name ellipsis-2-lines">
          {{ product.title + '(' + product.id + ')' }}
        </q-item-section>
        <q-item-section side>
          {{ productPrice.toman('final',null) }} تومان
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product'
import Price from 'src/models/Price.js'

export default defineComponent({
  name: 'ProductPriceChildItem',
  props: {
    product: {
      type: Product,
      default: new Product()
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      selectedOnes: [],
      selected: false
    }
  },
  computed: {
    productPrice () {
      return new Price(this.product.price)
    }
  },
  methods: {
    onChangeChildlessProductSelected () {
      this.setSelectedAndSelectedOnesAndEmitThem()
    },
    onChangeProductWithChildSelected (newValue) {
      this.changeSelectedAllOfProducts(newValue, this.product, this)
      this.setSelectedAndSelectedOnesAndEmitThem()
    },
    onChangeSelected () {
      this.setSelectedAndSelectedOnesAndEmitThem()
    },
    setSelectedAndSelectedOnesAndEmitThem () {
      this.setSelected()
      this.setSelectedOnes()
      this.emitSelected()
    },
    setSelected () {
      this.selected = this.getSelectedBasedOnChildren(this.product, this)
    },
    setSelectedOnes () {
      this.selectedOnes = this.getAllChildProductId(this.product, this)
    },
    emitSelected () {
      this.$emit('changeSelected', {
        selectedProducts: this.selectedOnes,
        index: this.index
      })
    },
    getSelectedBasedOnChildren (grandProduct, grandInstance) {
      let selected = null
      let allSelected = true
      let allNotSelected = true
      let hasNullSelectedChild = false
      if (grandProduct.hasChildren()) {
        const productChList = grandProduct.getChildren().list
        const productChListLength = productChList.length
        for (let i = 0; i < productChListLength; i++) {
          const productCh = productChList[i]
          const productChInstance = grandInstance.$refs['ProductPriceChildItem' + productCh.id][0]
          if (!productChInstance.selected) {
            allSelected = false
          }
          if (productChInstance.selected) {
            allNotSelected = false
          }
          if (productChInstance.selected === null) {
            hasNullSelectedChild = true
          }
          selected = this.getSelectedBasedOnChildren(productCh, productChInstance)
        }
      } else {
        selected = grandInstance.selected
      }

      if (grandProduct.hasChildren() && ((!allSelected && !allNotSelected) || hasNullSelectedChild)) {
        return null
      }
      if (grandProduct.hasChildren() && allSelected && !allNotSelected) {
        return true
      }
      if (grandProduct.hasChildren() && !allSelected && allNotSelected) {
        return false
      }
      if (!grandProduct.hasChildren()) {
        return selected
      }
    },
    getAllChildProductId (grandProduct, grandInstance) {
      if (grandProduct.hasChildren()) {
        let selectedOnes = []
        const productChList = grandProduct.getChildren().list
        const productChListLength = productChList.length
        for (let i = 0; i < productChListLength; i++) {
          const productCh = productChList[i]
          const productChInstance = grandInstance.$refs['ProductPriceChildItem' + productCh.id][0]
          selectedOnes = selectedOnes.concat(this.getAllChildProductId(productCh, productChInstance)).filter(item => item !== null)
        }
        if (!grandInstance.selected) {
          return selectedOnes
        }
        return selectedOnes.concat([grandProduct.id])
      }

      if (!grandInstance.selected) {
        return []
      }
      return [grandProduct.id]
    },
    changeSelectedAllOfProducts (newState, grandProduct, grandInstance) {
      grandProduct.getChildren().list.forEach(productCh => {
        const productChInstance = grandInstance.$refs['ProductPriceChildItem' + productCh.id][0]
        productChInstance.selected = newState
        if (productCh.hasChildren()) {
          this.changeSelectedAllOfProducts(newState, productCh, productChInstance)
        }
      })
    }
  }
})
</script>

<style scoped lang="scss">
.ProductPriceChildItem {
  border-radius: 15px;

  .product-name {
    color:#424242;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: -0.28px;
    margin: auto;
  }

  .checkbox-section{
    padding: 0;
  }

  .ProductPriceChildItem-with-child {
    :deep(.q-expansion-item) {
      .q-expansion-item__container {
        .q-item {
          border-radius: 15px;

          //.q-focus-helper {
          //  background: white;
          //}
        }

        .q-expansion-item__content {
          padding-left: 20px;

          .q-card {
            border-radius: 15px;
          }
        }
      }
    }
  }

  .ProductPriceChildItem-without-child {
    border-radius: 15px;

    &:hover {
      background: #e8e8e8;
    }
  }
}
</style>
