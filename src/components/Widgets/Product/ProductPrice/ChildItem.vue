<template>
  <div class="ProductPriceChildItem">
    <div v-if="product.hasChildren()"
         class="ProductPriceChildItem-with-child">
      <q-expansion-item expand-separator
                        dense
                        dense-toggle>
        <template v-slot:header>
          <q-item-section>
            <q-checkbox v-model="selected"
                        :label="product.title + '(' + product.id + ')'"
                        @update:modelValue="onChangeProductWithChildSelected" />
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
        <q-item-section>
          <q-checkbox v-model="selected"
                      :label="product.title + '(' + product.id + ')'"
                      @update:modelValue="onChangeChildlessProductSelected" />
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { Product } from 'src/models/Product'

export default defineComponent({
  name: 'ProductPriceChildItem',
  props: {
    product: {
      type: Product,
      default: new Product()
    }
  },
  data() {
    return {
      selectedOnes: [],
      selected: false
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
      this.$emit('changeSelected', this.selectedOnes)
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
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 4px 4px 10px rgb(54 90 145 / 5%);
  background: #FFF;
  border-radius: 15px;

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

    .q-item {
      height: 44px;
    }
  }
}
</style>
