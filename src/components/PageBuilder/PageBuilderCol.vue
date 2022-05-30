<template>
  <div :class="[(col.col) ? col.col : 'col']">
    <page-builder-widget v-for="(widget, widgetIndex) in col.widgets"
               :key="widgetIndex"
               :widget="widget"
    />
  </div>
</template>

<script>
import PageBuilderWidget from './PageBuilderWidget.vue'

export default {
  name: 'PageBuilderCol',
  // components,
  components: {
    PageBuilderWidget
  },
  props: {
    col: {
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
