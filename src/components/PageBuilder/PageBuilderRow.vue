<template>
  <div class="row q-col-gutter-md">
    <page-builder-col v-for="(col, colIndex) in cols"
                      :key="colIndex"
                      :widgets="col.widgets"
                      :options="col.options"
    />
  </div>
</template>

<script>
import PageBuilderCol from './PageBuilderCol.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderRow',
  mixins: [mixinWidget],
  components: {
    PageBuilderCol
  },
  props: {
    cols: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
