<template>
  <div v-for="item in data"
       :key="item">
    {{item}}
  </div>
</template>

<script>
export default {
  name: 'productListScrollOptionPanel',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>

</style>
