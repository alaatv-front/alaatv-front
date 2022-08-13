<template>
  <div>
    <div v-if="label">
      {{ label }}
    </div>

    <q-option-group
      v-model="inputData.dir"
      :options="lineTypeOptions"
      @update:model-value="onChangeLineType"
      color="primary"
      type="radio"
      dense
      inline
    />
  </div>
  <div
    v-show="inputData.dir !=='fixed'">
    <div v-if="inputData.style">
      <q-badge color="secondary">
        سرعت حرکت : از 0 تا 100 ( {{inputData.style['animation-duration'] }} )
      </q-badge>
      <q-slider
        v-model="inputData.style['animation-duration']"
        :min="0"
        :max="100"
        :disable="disable"
        @input="onChangeStandard"
      />
    </div>
  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'

export default {
  name: 'LineType',
  data () {
    return {
      lineType: 'flowing',
      standard: {
        min: 0,
        max: 17
      },
      lineTypeOptions: [
        {
          id: 0,
          label: 'بدون حرکت',
          value: 'fixed'
        }, {
          id: 1,
          label: 'متحرک',
          value: 'flowing'
        }, {
          id: 2,
          label: ' حرکت معکوس',
          value: 'reverse'
        }
      ]
    }
  },
  props: {
    value: {
      default: []
    },
    label: {
      default: '',
      type: String
    }
  },
  mixins: [inputMixin],
  created () {
  },
  methods: {
    onChangeStandard () {
      this.setLineFlow()
    },
    onChangeLineType () {
      this.setLineFlow()
    },
    prepareDefaultInputData () {
      if (this.inputData && this.inputData.style && typeof this.inputData.style['animation-duration'] !== 'undefined') {
        return
      }
      this.inputData.style = {}
      this.inputData.style['animation-duration'] = 0
    },
    setLineFlow() {
      this.prepareDefaultInputData()
      this.change(this.inputData)
    }
  }
}
</script>

<style scoped>

</style>
