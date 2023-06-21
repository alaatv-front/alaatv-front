<template>
  <div class="ProductPriceChildItem">
    <div v-if="product.hasChildren()"
         class="ProductPriceChildItem-with-child">
      <q-expansion-item expand-separator>
        <template v-slot:header>
          <!--          <q-item-section avatar>-->
          <!--            <q-avatar icon="bluetooth" color="primary" text-color="white" />-->
          <!--          </q-item-section>-->
          <q-item-section>
            {{ product.title }}
            ({{ product.id }})
          </q-item-section>

          <q-item-section side>
            <q-toggle v-model="parentSelected"
                      @update:modelValue="onChangeParentSelected" />
          </q-item-section>
        </template>
        <q-card>
          <product-price-child-item v-for="productCh in product.getChildren().list"
                                    :key="productCh.id"
                                    :ref="'ProductPriceChildItem' + productCh.id"
                                    :product="productCh"
                                    @changeSelectedProducts="onChangeSelectedProducts" />
        </q-card>
      </q-expansion-item>
    </div>
    <div v-else
         class="ProductPriceChildItem-without-child">
      <q-item>
        <q-item-section>
          {{ product.title }}
          ({{ product.id }})
        </q-item-section>
        <q-item-section side>
          <q-toggle v-model="childSelected"
                    @update:modelValue="onChangeChildSelected" />
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
      selectedProductIds: [],
      parentSelected: false,
      childSelected: false
    }
  },
  methods: {
    onChangeSelectedProducts (selectedProductIds) {
      if (selectedProductIds.length === 0) {
        // remove child product id from selectedProductIds
        const include = this.selectedProductIds.includes(this.product.id)
        this.selectedProductIds = []
        if (include) {
          this.selectedProductIds = [this.product.id]
          // this.onChangeChildSelected(true, true)
        }
      }

      // add child product id to selectedProductIds
      selectedProductIds.forEach(productChId => {
        if (!this.selectedProductIds.includes(productChId)) {
          this.addToSelectedProducts(productChId)
        }
      })
      this.$emit('changeSelectedProducts', this.selectedProductIds)
    },
    onChangeParentSelected (newValue) {
      this.changeSelectedProducts(newValue, this.product, this)
      this.onChangeChildSelected(newValue)
    },
    changeSelectedProducts (newState, grandProduct, grandInstance) {
      grandProduct.getChildren().list.forEach(productCh => {
        const productChInstance = grandInstance.$refs['ProductPriceChildItem' + productCh.id][0]
        if (newState) {
          productChInstance.addToSelectedProducts(productCh.id)
          productChInstance.childSelected = true
        } else {
          productChInstance.removeFromSelectedProducts(productCh.id)
          productChInstance.childSelected = false
        }
        productChInstance.onChangeChildSelected(newState)
        if (productCh.hasChildren()) {
          this.changeSelectedProducts(newState, productCh, productChInstance)
        }
      })
    },
    onChangeChildSelected (newValue, withEmit = true) {
      if (newValue) {
        this.addToSelectedProducts(this.product.id)
      } else {
        this.removeFromSelectedProducts(this.product.id)
      }

      if (withEmit) {
        this.$emit('changeSelectedProducts', this.selectedProductIds)
      }
    },
    addToSelectedProducts (productId) {
      if (this.selectedProductIds.includes(productId)) {
        return
      }
      this.selectedProductIds.push(productId)
    },
    removeFromSelectedProducts (productId) {
      const target = this.selectedProductIds.findIndex(productIdItem => productIdItem === productId)
      if (target === -1) {
        return
      }
      this.selectedProductIds.splice(target, 1)
    }
  }
})
</script>

<style scoped lang="scss">
.ProductPriceChildItem {
  box-shadow: -2px -4px 10px rgb(255 255 255 / 60%), 4px 4px 10px rgb(54 90 145 / 5%);
  background: #FFFFFF;
  border-radius: 15px;
  .ProductPriceChildItem-with-child {
    :deep(.q-expansion-item) {
      .q-expansion-item__container {
        .q-item {
          //.q-focus-helper {
          //  background: white;
          //}
        }
        .q-expansion-item__content {
          padding-left: 20px;
        }
      }
    }
  }
  .ProductPriceChildItem-without-child {
    &:hover {
      background: #e8e8e8;
    }
  }
}
</style>
