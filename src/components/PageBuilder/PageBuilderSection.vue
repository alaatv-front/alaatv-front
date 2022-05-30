<template>
  <div class="page-builder-section">
    <page-builder-row  v-for="(row, rowIndex) in data.rows"
                       :key="rowIndex"
                       :row="row"
    />
  </div>
</template>

<script>
import PageBuilderRow from './PageBuilderRow.vue'

export default {
  name: 'PageBuilderSection',
  components: {
    PageBuilderRow
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
  },
  data () {
    return {

    }
  }
}
</script>

<style scoped>

</style>
