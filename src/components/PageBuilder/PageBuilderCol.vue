<template>
  <div :class="[(options.col) ? options.col : 'col']">
    <page-builder-widget v-for="(widget, widgetIndex) in widgets"
                         :key="widgetIndex"
                         :widget="widget"
    />
  </div>
</template>

<script>
import PageBuilderWidget from './PageBuilderWidget.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderCol',
  // components,
  mixins: [mixinWidget],
  components: {
    PageBuilderWidget
  },
  props: {
    widgets: {
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
