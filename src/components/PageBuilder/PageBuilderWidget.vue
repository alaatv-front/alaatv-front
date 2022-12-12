<template>
  <component
    :is="widget.name"
    :data="widget.data"
    :options="widget.options"
    :containerFullHeight="containerFullHeight"
    :get-data="getData"
  />
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins'

// generating define async imports
const components = {}
const componentsData = {}

components.PageBuilderSection = defineAsyncComponent(() =>
  import('./PageBuilderSection.vue')
)
export default {
  name: 'PageBuilderWidget',

  components,
  mixins: [mixinWidget],

  props: {
    widget: {
      type: Object,
      default: () => {
        return {}
      }
    },
    getData: {
      type: Function,
      default: () => {}
    }
  },
  setup() {
    componentsData.forEach((component) => {
      components[component.name] = defineAsyncComponent(() => {
        return import(
          'components/Widgets' + component.path + component.name + '.vue'
        )
      })
    })
    return {}
  },
  created() {}
}
</script>

<style scoped></style>
