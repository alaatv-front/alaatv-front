<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-col-gutter-sm">
          <div class="input-container col-md-10">
            <q-input v-model="localOptions.eventName"
                     label="Event Name" />
          </div>
          <div class="input-container col-md-10">
            <q-input v-model="localOptions.departmentId"
                     label="Department Id" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs
  },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      defaultOptions: {
        eventName: null,
        departmentId: null
      }
    }
  }
})
</script>
