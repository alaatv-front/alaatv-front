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
const requireContext = require.context("components/Widgets/", true, /\.vue$/i, "lazy")
let componentNames = requireContext.keys().map((file) => {
  const crush = file.split("/")
  console.log(crush)
  return file.replace(/(^.\/)|(\.vue$)/g, '')
})

let components2 = {}
//TODO: Removing name of folders in components, perhaps using regex.
componentNames.forEach((component) => {
  components2[component] = defineAsyncComponent(() =>
    import("components/Widgets/" + component + ".vue")
  )
})
components2.PageBuilderSection = defineAsyncComponent(() => import('./PageBuilderSection.vue')),
console.log(components2)
export default {
  name: 'PageBuilderWidget',
  components: components2,
  // components: {
  //   PageBuilderSection: defineAsyncComponent(() => import('./PageBuilderSection.vue')),
  //   AbrishamMap: defineAsyncComponent(() => import('components/Widgets/Map/Map.vue')),
  //   TestComponent1Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent1Widget.vue')),
  //   TestComponent2Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent2Widget.vue')),
  //   BlockComponent: defineAsyncComponent(() => import('components/Widgets/Block/Block.vue')),
  //   Slider: defineAsyncComponent(() => import('components/Widgets/Slider.vue')),
  //   Segment: defineAsyncComponent(() => import('components/Widgets/Segment/Segment.vue')),
  //   ContentShowInfo: defineAsyncComponent(() => import('components/Widgets/Content/Show.vue')),
  //   productDemos: defineAsyncComponent(() => import('components/Widgets/Product/productDemos')),
  //   productReview: defineAsyncComponent(() => import('components/Widgets/Product/productReview')),
  //   productIntroduction: defineAsyncComponent(() => import('components/Widgets/Product/productIntroduction')),
  //   blockList: defineAsyncComponent(() => import('components/Widgets/BlockList/BlockList'))
  // },
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
