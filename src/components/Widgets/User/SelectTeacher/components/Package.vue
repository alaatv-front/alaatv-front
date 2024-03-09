<template>
  <div class="order-item-package">
    <q-banner dense
              class="order-item--title bg-green-5 text-white q-mb-sm">
      پکیج:
      {{ packageItem.packageProductId }}
    </q-banner>
    <div class="row q-col-gutter-md">
      <div v-for="(productGroup, productGroupIndex) in packageItem.products"
           :key="productGroupIndex"
           class="package-product-group col-md-4">
        <div class="package-product-item">
          <q-select v-model="selectedTeachers[productGroupIndex].selectedProduct"
                    :label="productGroup[0].name"
                    :options="getTeacherOptions(productGroup)" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SelectTeacher',
  props: {
    packageItem: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      selectedTeachers: []
    }
  },
  created () {
    console.log('packageItem', this.packageItem)
    this.selectedTeachers = this.packageItem.products.map(product => {
      return {
        selectedProduct: null
      }
    })
  },
  methods: {
    getTeacherOptions (products) {
      return products.map(product => {
        return {
          label: product.name,
          value: product.id
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
.order-item-package {
  margin-bottom: $space-4;
  .package-product-group {
    margin-bottom: $space-4;
    .package-product-item {
    }
  }
}
</style>
