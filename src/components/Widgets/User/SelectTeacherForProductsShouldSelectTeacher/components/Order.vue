<template>
  <div class="order-item">
    <!--    <q-banner dense-->
    <!--              class="order-item&#45;&#45;title bg-green-5 text-white q-mb-sm">-->
    <!--      شماره سفارش:-->
    <!--      {{ order.orderId }}-->
    <!--    </q-banner>-->
    <div class="order-item--list">
      <package-item v-for="(packageItem, packageIndex) in order.packages"
                    :key="packageIndex"
                    :ref="'PackageItem' + packageIndex"
                    v-model:selected-products="packages[packageIndex].selectedProducts"
                    :package-item="packageItem"
                    class="package-item"
                    @update:selectedProducts="onChangeSelectedProducts" />
    </div>
  </div>
</template>

<script>
import PackageItem from './Package.vue'

export default {
  name: 'Order',
  components: { PackageItem },
  props: {
    selectedProducts: {
      type: Array,
      default: () => []
    },
    order: {
      type: Object,
      default: null
    }
  },
  emits: ['update:selectedProducts'],
  data () {
    return {
      packages: []
    }
  },
  created () {
    this.packages = this.order.packages.map(packageItem => {
      return {
        orderId: this.order.orderId,
        packageProductId: packageItem.packageProductId,
        selectedProducts: []
      }
    })
  },
  methods: {
    allProductSelected () {
      let allProductSelected = true
      this.order.packages.forEach((item, itemIndex) => {
        if (!this.$refs['PackageItem' + itemIndex][0].allProductSelected()) {
          allProductSelected = false
        }
      })
      return allProductSelected
    },
    onChangeSelectedProducts () {
      this.$emit('update:selectedProducts',
        this.packages
          .filter(packageItem => packageItem.selectedProducts.length > 0)
          .reduce((accumulator, currentValue) => {
            return accumulator.concat(currentValue.selectedProducts.map(item => {
              return {
                orderId: currentValue.orderId,
                packageProductId: currentValue.packageProductId,
                productId: item.productId
              }
            }))
          }, [])
      )
    }
  }
}
</script>

<style scoped lang="scss">
.order-item {
  .package-item {
    margin-bottom: $space-4;
  }
}
</style>
