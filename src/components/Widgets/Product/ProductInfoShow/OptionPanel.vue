<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.production_year"
                        left-label
                        label="سال تولید" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.teacher"
                        left-label
                        label="مدرس" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.major"
                        left-label
                        label="رشته" />
          </div>
          <div class="col-md-4">
            <q-checkbox v-model="localOptions.shipping_method"
                        left-label
                        label="مدل دریافت" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel, OptionPanelTabs } from 'quasar-ui-q-page-builder'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  }
})
</script>
