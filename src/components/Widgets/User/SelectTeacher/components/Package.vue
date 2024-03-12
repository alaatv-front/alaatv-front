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
             class="package-product-group col-md-4 col-sm-6 col-xs-12">
          <div class="package-product-item">
            <q-select v-model="productGroups[productGroupIndex].selectedProduct"
                      :label="productGroup[0].title"
                      :options="getTeacherOptions(productGroup)"
                      @update:model-value="onChangeSelectedTeacher" />
          </div>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: 'SelectTeacher',
  props: {
    packageItem: {
      type: Object,
      default: null
    },
    selectedTeachers: {
      type: Array,
      default: () => []
    }
  },
  emits: ['update:selectedTeachers'],
  data () {
    return {
      productGroups: []
    }
  },
  created () {
    this.productGroups = this.packageItem.products.map(product => {
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
          value: product.id
        }
      })
    },
    onChangeSelectedTeacher () {
      const selectedProducts = this.productGroups
        .filter(item => item.selectedProduct)
        .map(item => {
          return {
            productId: item.selectedProduct.id
          }
        })
      this.$emit('update:selectedTeachers', selectedProducts)
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
