<template>
  <div class="Shadow">
    Shadow
    <example-shadow />
  </div>
  <div class="dialog">
    dialog & BottomSheet
    <example-dialog />
    <example-bottom-sheet />
  </div>
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
import ExampleShadow from 'components/Theme/Controls/Shadow/Shadow.vue'
export default {
  name: 'Component',
  components: { ExampleShadow, ExampleBottomSheet, ExampleDialog }
}
</script>
