<template>
  <q-card class="product-item-skeleton-card"
          flat>
    <q-card-section>
      <q-skeleton height="120px" />
    </q-card-section>
  </q-card>
</template>
<script>
export default {
  name: 'ProductItemSkeleton'
}
</script>

<style lang="scss" scoped>
.product-item-skeleton-card {
  width: 100%;
  background: transparent;
}
</style>
