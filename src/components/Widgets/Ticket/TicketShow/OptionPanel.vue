<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="row q-col-gutter-md q-my-md">
        <div class="col-12">
          <q-checkbox v-model="localOptions.asAdmin"
                      label="asAdmin" />
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      defaultOptions: {
        asAdmin: false
      }
    }
  }
})
</script>
