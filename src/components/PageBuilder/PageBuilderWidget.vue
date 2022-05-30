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

// https://dev.to/jakedohm_34/auto-registering-all-your-components-in-vue-3-with-vite-4884

// const ComponentContext = require.context('components/Widgets/', true, /\.vue$/i, 'lazy')

// const components = {}
// const ComponentContext = require.context(
//   'components/Widgets/',
//   true,
//   /^.*Widget\.vue$/,
//   'lazy'
// )

// async function load (components, name) {
//   components[name] = await import('components/Widgets/' + name + '.vue')
// }

// console.log('components1', components)
// ComponentContext.keys().forEach(item => {
//   const name = item.substr(2).replace('Widgets/', '').replace('.vue', '')
//   // console.log('name', name) // TestComponent1Widget
//   // console.log('item', item) // ./Widgets/TestComponent1Widget.vue
//   // components[name] = item
//   // components[name] = () => ComponentContext(item)
//   // components[name] = import(item)
//   // components[name] = await import('components/Widgets/' + name + '.vue')
//   components[name] = () => defineAsyncComponent(() => import('components/Widgets/' + name + '.vue'))
//   // load(components, name)
// })

// console.log('components2', components)

// const components = {}

// import TestComponent1widget from 'components/Widgets/TestComponent1Widget.vue'
// import TestComponent2widget from 'components/Widgets/TestComponent2Widget.vue'

export default {
  name: 'PageBuilderWidget',
  // components,
  components: {
    PageBuilderSection: defineAsyncComponent(() => import('./PageBuilderSection.vue')),
    TestComponent1Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent1Widget.vue')),
    TestComponent2Widget: defineAsyncComponent(() => import('components/Widgets/TestComponent2Widget.vue')),
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
