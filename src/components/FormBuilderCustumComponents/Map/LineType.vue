<template>
  <div>
    <div v-if="label">
      {{ label }}
    </div>

    <q-option-group v-model="inputData.dir"
                    :options="lineTypeOptions"
                    color="primary"
                    type="radio"
                    dense
                    inline
                    @update:model-value="onChangeLineType" />
  </div>
  <div v-show="inputData.dir !=='fixed'">
    <div v-if="inputData.style">
      <q-badge color="secondary">
        سرعت حرکت : از 0 تا 100 ( {{inputData.style['animation-duration'] }} )
      </q-badge>
      <q-slider v-model="inputData.style['animation-duration']"
                :min="0"
                :max="100"
                :disable="disable"
                @input="onChangeDuration" />
    </div>
  </div>
</template>

<script>
import { inputMixin } from 'quasar-form-builder'

export default {
  name: 'LineType',
  mixins: [inputMixin],
  props: {
    value: {
      default: []
    },
    label: {
      default: '',
      type: String
    }
  },
  data () {
    return {
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
  created () {
  },
  methods: {
    onChangeDuration () {
      // this.setLineFlow()
    },
    onChangeLineType () {
      const data = { dir: this.inputData.dir, style: { 'animation-duration': 17 } }
      this.change(data)
      // this.setLineFlow()
    }
    // prepareDefaultInputData () {
    //   if (this.inputData && this.inputData.style && typeof this.inputData.style['animation-duration'] !== 'undefined') {
    //     return
    //   }
    //   this.inputData.style = {}
    //   this.inputData.style['animation-duration'] = 17
    //   console.log(this.inputData)
    // },

    // setLineFlow() {
    //   this.prepareDefaultInputData()
    //   this.change(this.inputData)
    // }
  }
}
</script>

<style scoped>

</style>
