<template>
  <div class="order-item">
    <!--    <q-banner dense-->
    <!--              class="order-item&#45;&#45;title bg-green-5 text-white q-mb-sm">-->
    <!--      شماره سفارش:-->
    <!--      {{ order.orderId }}-->
    <!--    </q-banner>-->
    <div class="order-item--list">
      <package-item v-for="packageItem in order.packages"
                    :key="packageItem.packageProductId"
                    :package-item="packageItem"
                    class="package-item"
                    @update:selectedTeachers="onChangeSelectedProducts" />
    </div>
  </div>
</template>

<script>
import PackageItem from './Package.vue'

export default {
  name: 'SelectTeacher',
  components: { PackageItem },
  props: {
    packageProducts: {
      type: Array,
      default: () => []
    },
    order: {
      type: Object,
      default: null
    }
  },
  emits: ['update:packageProducts'],
  data () {
    return {
      orders: []
    }
  },
  methods: {
    onChangeSelectedProducts (newValue) {
      this.$emit('update:packageProducts',
        newValue.map(item => {
          return {
            packageProductId: item.productId,
            productId: item.productId
          }
        })
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
