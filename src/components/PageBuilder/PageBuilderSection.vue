<template>
  <div class="page-builder-section">
    <page-builder-row  v-for="(row, rowIndex) in rows"
                       :key="rowIndex"
                       :cols="row.cols"
                       :options="row.options"
    />
  </div>
</template>

<script>
import PageBuilderRow from './PageBuilderRow.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderSection',
  mixins: [mixinWidget],
  components: {
    PageBuilderRow
  },
  props: {
    rows: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      defaultOptions: {
        segmentPadding: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        segmentMargin: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        segmentPosition: {
          type: String
        },
        height: {
          type: [String]
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
