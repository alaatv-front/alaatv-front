<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="q-mt-md">
        <q-input v-model="localOptions.RAYCHAT_TOKEN"
                 label="RAYCHAT_TOKEN" />
        <div class="q-pt-md">
          bottom:
          <q-slider v-model="localOptions.bottom"
                    label-always
                    :min="0"
                    :max="500"
                    color="green" />
        </div>
        <div class="q-pt-md">
          left:
          <q-slider v-model="localOptions.left"
                    label-always
                    :min="0"
                    :max="500"
                    color="green" />
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
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
        bottom: null,
        left: null,
        RAYCHAT_TOKEN: null
      }
    }
  }
})
</script>
