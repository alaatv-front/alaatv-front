<template>
  <div v-if="localOptions.options.layout === 'GridRow'">
    <grid-row-option-panel v-model:options="localOptions"
                           :layout="layout" />
  </div>
  <div v-else>
    <scroll-row-option-panel v-model:options="localOptions"
                             :layout="layout" />
  </div>
</template>

<script>
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import GridRowOptionPanel from 'src/components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/GridRowOptionPanel.vue'
import ScrollRowOptionPanel from 'src/components/Widgets/Product/ProductsTabPanel/ProductListOptionPanel/ScrollRowOptionPanel.vue'

export default {
  name: 'ProductListOptionPanel',
  components: {
    GridRowOptionPanel,
    ScrollRowOptionPanel
  },
  props: {
    options: {
      type: Object,
      default: () => {
      }
    },
    layout: {
      type: String,
      default: ''
    }
  },
  // mixins: [PageBuilderOptionPanel],
  computed: {
    localOptions: {
      get () {
        return this.options
      },
      set (newValue) {
        this.$emit('update:options', newValue)
      }
    }
  }
}
</script>
