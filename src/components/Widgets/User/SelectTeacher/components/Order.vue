<template>
  <div class="order-item">
    <q-banner dense
              class="order-item--title bg-green-5 text-white q-mb-sm">
      شماره سفارش:
      {{ order.orderId }}
    </q-banner>
    <div class="order-item--list">
      <package-item v-for="packageItem in order.packages"
                    :key="packageItem.packageProductId"
                    :package-item="packageItem" />
    </div>
  </div>
</template>

<script>
import PackageItem from './Package.vue'

export default {
  name: 'SelectTeacher',
  components: { PackageItem },
  props: {
    order: {
      type: Object,
      default: null
    }
  }
}
</script>

<style scoped lang="scss">
.order-item {
  margin-bottom: $space-4;
}
</style>
