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
  <div class="table">
    table
    <example-table />
  </div>
  <div class="tabs">
    tabs
    <example-tabs />
  </div>
  <div class="spacing">
    Spacing
    <spacing />
  </div>
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
import ExampleTabs from 'components/Theme/Tabs/ExampleTabs.vue'
import ExampleShadow from 'components/Theme/Controls/Shadow/Shadow.vue'
import ExampleTable from 'components/Theme/Table/Table.vue'
import Spacing from 'components/Theme/Spacing/Spacing.vue'
export default {
  name: 'Component',
  components: { ExampleShadow, Spacing, ExampleTabs, ExampleTable, ExampleBottomSheet, ExampleDialog }
}
</script>
