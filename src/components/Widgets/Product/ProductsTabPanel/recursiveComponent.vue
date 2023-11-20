<template>
  <div class="option-panel-container">
    <component :is="localOptions.type.concat('OptionPanel')"
               v-model:options="localOptions"
               :layout="layout" />
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue'
// import { PageBuilderOptionPanel } from 'src/mixin/Mixins'

export default {
  name: 'RecursiveComponent',
  components: {
    GroupListOptionPanel: defineAsyncComponent(() => import('./GroupListOptionPanel/GroupListOptionPanel.vue')),
    ProductListOptionPanel: defineAsyncComponent(() => import('./ProductListOptionPanel/ProductListOptionPanel.vue'))
  },
  // mixins: [PageBuilderOptionPanel],
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
  data () {
    return {
    }
  },
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

<style lang="scss" scoped>
:deep(.q-card.custom-card) {
:not([class^="col"]) {
  box-shadow: none;
}

.custom-card {
  //width: 150px;
}
}

</style>
