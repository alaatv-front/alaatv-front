<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-5">
            <q-select v-model="localOptions.apiName"
                      :options="apiOptions"
                      label="api" />
          </div>
          <div v-if="localOptions.to"
               class="col-md-5 offset-1">
            <q-input v-model="localOptions.to"
                     label="to: " />
          </div>
          <div v-else-if="localOptions.from"
               class="col-md-5 offset-1">
            <q-input v-model="localOptions.from"
                     label="from: " />
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
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      apiOptions: ['home', 'shop'],
      listSlice: 'to',
      sliceOptions: ['to', 'from'],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {}
      }
    }
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
