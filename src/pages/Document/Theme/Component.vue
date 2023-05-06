<template>
  <div class="dialog">
    dialog & BottomSheet
    <example-dialog />
    <example-bottom-sheet />
  </div>
  <div class="spacing">
    Spacing
    <spacing />
  </div>
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
import Spacing from 'components/Theme/Spacing/Spacing.vue'
export default {
  name: 'Component',
  components: { Spacing, ExampleBottomSheet, ExampleDialog }
}
</script>
