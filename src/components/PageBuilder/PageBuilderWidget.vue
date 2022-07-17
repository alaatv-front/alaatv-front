<template>
  <component
    :is="widget.name"
    :data="widget.data"
    :options="widget.options"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderWidget',
  // components,
  components: {
    PageBuilderSection: defineAsyncComponent(() => import('./PageBuilderSection.vue')),
    AbrishamMap: defineAsyncComponent(() => import('components/Widgets/Map/Map.vue')),
    TestComponent1Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent1Widget.vue')),
    TestComponent2Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent2Widget.vue')),
    BlockComponent: defineAsyncComponent(() => import('components/Widgets/Block/Block.vue')),
    Slider: defineAsyncComponent(() => import('components/Widgets/Slider.vue')),
    Segment: defineAsyncComponent(() => import('components/Widgets/Segment/Segment.vue'))
  },
  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  mixins: [mixinWidget],
  created () {
  },
  data () {
    return {}
  }
}
</script>

<style scoped>

</style>
