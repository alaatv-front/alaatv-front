<template>
  <div>
    <example-dialog />
    <example-bottom-sheet />
  </div>
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
export default {
  name: 'DialogPage',
  components: { ExampleBottomSheet, ExampleDialog }
}
</script>

<style scoped>

</style>
