<template>
  <q-card class="order-item-package">
    <q-card-section>
      پکیج:
      {{ packageItem.packageTitle }}
    </q-card-section>
    <q-separator class="q-my-md" />
    <q-card-section>
      <div class="row q-col-gutter-md">
        <div v-for="(productGroup, productGroupIndex) in packageItem.products"
             :key="productGroupIndex"
             class="package-product-group col-md-6 col-xs-12">
          <div class="package-product-item">
            <q-select v-model="productGroups[productGroupIndex].selectedProduct"
                      :label="productGroup[0].title"
                      :options="getTeacherOptions(productGroup)"
                      map-options
                      emit-value
                      @update:model-value="onChangeSelectedTeacher" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'Package',
  props: {
    packageItem: {
      type: Object,
      default: null
    },
    selectedProducts: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selectedProducts'],
  data () {
    return {
      productGroups: []
    }
  },
  created () {
    this.productGroups = this.packageItem.products.map(() => {
      return {
        selectedProduct: null
      }
    })
  },
  methods: {
    getTeacherOptions (products) {
      return products.map(product => {
        return {
          label: product.title,
          value: product
        }
      })
    },
    allProductSelected () {
      return !this.productGroups.find(item => !item.selectedProduct)
    },
    onChangeSelectedTeacher () {
      const selectedProducts = this.productGroups
        .filter(item => item.selectedProduct)
        .map(item => {
          return {
            packageProductId: this.packageItem.packageProductId,
            productId: item.selectedProduct.productId
          }
        })
      this.$emit('update:selectedProducts', selectedProducts)
    }
  }
}
</script>

<style scoped lang="scss">
.order-item-package {
  box-shadow: $shadow-3;
  .package-product-group {
    margin-bottom: $space-4;
    .package-product-item {
    }
  }
}
</style>
