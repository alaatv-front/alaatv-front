<template>
  <div :class="[
    (options.col) ? options.col : 'col',
    (options.alignmentSelf) ? options.alignmentSelf : '',
  ]">
    <template v-for="(widget, widgetIndex) in widgets"
              :key="widgetIndex">
      <q-intersection v-if="widget.options && widget.options.intersection"
                      :transition="widget.options.intersection.transition ? widget.options.intersection.transition : 'flip-right'"
      >
        <page-builder-widget
          :widget="widget"
          :size="size"
        />
      </q-intersection>
      <page-builder-widget v-else
                           :widget="widget"
                           :size="size"
      />
    </template>
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
    },
    size: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
