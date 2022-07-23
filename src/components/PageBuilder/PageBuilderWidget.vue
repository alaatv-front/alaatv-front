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
// let componentsData = [
//   {
//     componentName: "",
//     componentCategories: [],
//     componentDepth: 1
//   }
// ]
// let componentNames = requireContext.keys().map((file) => {
let componentsData = requireContext.keys().map((file) => {
  let path = file;
  let crush = file.split("/")
  // first element is always a dot so remove it.
  crush.shift()
  path = path.replace(".", "")
  path = path.replace(crush[crush.length - 1], "")
  crush[crush.length - 1] = crush[crush.length - 1].replace(/(^.\/)|(\.vue$)/g, '')
  //first one is widget name and second is folder name
  // if(crush[crush.length - 1] != crush[crush.length - 2]){
  //   throw new Error(`Name of the widget and folder are not the same.\n file name: ${crush[crush.length - 1] } \n folder name: ${crush[crush.length - 2]}`)
  // }
  return { name: crush[crush.length - 1], path }
})
let components = {}
//TODO: Removing name of folders in components, perhaps using regex.
componentsData.forEach((component) => {
  console.log(component.path)
  components[component.name] = defineAsyncComponent(() => {
    return import('components/Widgets' + component.path + component.name + '.vue')
    }
  )
})
components.PageBuilderSection = defineAsyncComponent(() => import('./PageBuilderSection.vue')),
console.log(components)
export default {
  name: 'PageBuilderWidget',
  components,
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
