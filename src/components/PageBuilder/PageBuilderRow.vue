<template>
  <div
       class="row q-col-gutter-md"
  >
    <page-builder-col  v-for="(col, colIndex) in row.cols"
                       :key="colIndex"
                       :col="col"
    />
  </div>
</template>

<script>
import PageBuilderCol from './PageBuilderCol.vue'

export default {
  name: 'PageBuilderRow',
  // components,
  components: {
    PageBuilderCol
  },
  props: {
    row: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
