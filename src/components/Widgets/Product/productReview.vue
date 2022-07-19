<template>
  <div class="product-review">
    <p class="review-title"> بررسی محصول</p>
    <q-card class="custom-card">
      <q-card-section v-html="">

      </q-card-section>
    </q-card>
  </div>
</template>

<script>

export default {
name: "productReview",
  props: {
    data: {
      type: Object,
      default: {}
    }
  },
  data() {

  }
}
</script>

<style scoped>

</style>
