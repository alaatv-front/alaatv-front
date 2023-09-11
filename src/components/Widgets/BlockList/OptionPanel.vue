<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-pt-lg">
        <div class="row q-col-gutter-md">
          <div class="col-md-4">
            <div>
              نوع:
            </div>
            <q-select v-model="localOptions.apiName"
                      :options="apiOptions" />
          </div>
          <div class="col-md-4">
            <div>
              از:
            </div>
            <q-input v-model="localOptions.to" />
          </div>
          <div class="col-md-4">
            <div>
              تا:
            </div>
            <q-input v-model="localOptions.from" />
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
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        from: 0,
        to: -1
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
