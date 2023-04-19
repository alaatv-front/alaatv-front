<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-3">
            <q-checkbox v-model="localOptions.spaced"
                        label="spaced"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.dark"
                        label="dark"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.inset"
                        label="inset"
                        left-label />
          </div>
          <div class="col-3">
            <q-checkbox v-model="localOptions.vertical"
                        label="vertical"
                        left-label />
          </div>
          <div class="col-md-12">
            <div class="outSideLabel">
              image
            </div>
            <q-input v-model="localOptions.image"
                     label="image" />
          </div>
          <div class="col-md-6">
            <div class="outSideLabel">
              height
            </div>
            <q-input v-model="localOptions.height"
                     label="height" />
          </div>
          <div class="col-md-6">
            <div class="outSideLabel">
              width
            </div>
            <q-input v-model="localOptions.width"
                     label="width" />
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
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        className: '',
        style: {},
        services: []
      }
    }
  }
})
</script>

<style scoped>

</style>
