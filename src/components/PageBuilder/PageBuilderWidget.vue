<template>
  <div>
    <component
      :is="widget.name"
      :data="widget.data"
      :options="widget.options"
      :containerFullHeight="containerFullHeight"
    />
  </div>
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
    Segment: defineAsyncComponent(() => import('components/Widgets/Segment/Segment.vue')),
    ContentShowInfo: defineAsyncComponent(() => import('components/Widgets/Content/Show.vue')),
    productDemos: defineAsyncComponent(() => import('components/Widgets/Product/productDemos')),
    productReview: defineAsyncComponent(() => import('components/Widgets/Product/productReview')),
    productIntroduction: defineAsyncComponent(() => import('components/Widgets/Product/productIntroduction')),
    SetShow: defineAsyncComponent(() => import('components/Widgets/Set/Show.vue')),
    Banner: defineAsyncComponent(() => import('components/Widgets/Banner.vue')),
    CheckoutReviewWidget: defineAsyncComponent(() => import('components/Widgets/CheckoutReview/Show')),
    blockList: defineAsyncComponent(() => import('components/Widgets/BlockList/BlockList')),
    services: defineAsyncComponent(() => import('components/Widgets/Services/Services'))
  },
  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    containerFullHeight: {}
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
