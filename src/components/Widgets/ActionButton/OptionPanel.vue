<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-gutter-md">
          <div class="input-container">
            <div class="outsideLabel">label</div>
            <q-input v-model="value.label"
                     label="label" />
          </div>
          <div class="input-container">
            <div class="outsideLabel">icon name</div>
            <q-input v-model="value.icon"
                     label="icon name" />
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
  data () {
    return {}
  },
  computed: {
    value: {
      get() {
        return this.localOptions
      },
      set(value) {
        this.localOptions = value
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
  },
  methods: {}
})
</script>
