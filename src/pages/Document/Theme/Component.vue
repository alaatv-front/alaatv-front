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
  <div class="tabs">
    tabs
    <example-tabs />
  </div>
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
import ExampleTabs from 'components/Theme/Tabs/ExampleTabs.vue'
import ExampleShadow from 'components/Theme/Controls/Shadow/Shadow.vue'
export default {
  name: 'Component',
  components: { ExampleShadow, ExampleTabs, ExampleBottomSheet, ExampleDialog }
}
</script>
