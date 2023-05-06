<template>
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
</template>

<script>
import ExampleDialog from 'components/Theme/Dialog/ExampleDialog.vue'
import ExampleBottomSheet from 'components/Theme/Dialog/ExampleBottomSheet.vue'
import ExampleTabs from 'components/Theme/Tabs/ExampleTabs.vue'
import ExampleTable from 'components/Theme/Table/Table.vue'
export default {
  name: 'Component',
  components: { ExampleTable, ExampleTabs, ExampleBottomSheet, ExampleDialog }
}
</script>
