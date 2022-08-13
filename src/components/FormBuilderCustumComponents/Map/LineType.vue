<template>
  <div>
    <div v-if="label">
      {{ label }}
    </div>
    <q-option-group
      class="flex"
      v-model="LineType"
      :options="LineTypeOptions"
      color="primary"
      type="radio"
      dense
      inline
    />
  </div>
  <div
    v-show="LineType !=='fixed'">
    <div>
      <q-badge color="secondary">
        سرعت حرکت : از {{ standard.min }} تا {{ standard.max }} ({{ min }} تا {{ max }})
      </q-badge>
      <q-range
        v-model="standard"
        :min="0"
        :max="100"
        :disable="disable"
        @input="change($event)"
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
      LineType: 'fixed',
      standard: {
        min: 0,
        max: 17
      },
      LineTypeOptions: [
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
  watch: {
    standard: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setLineFlow()
      }
    },
    LineType: {
      handler (newValue) {
        if (!newValue) {
          return
        }
        this.setLineFlow()
      }
    }
  },
  mixins: [inputMixin],
  methods: {
    setLineFlow() {
      if (this.LineType === 'fixed') {
        this.inputData = {
          dir: this.LineType,
          style: {}
        }
      }
      this.inputData = {
        options: {
          flowing: {
            dir: this.LineType,
            style: {
              'animation-duration': this.standard.max - this.standard.min
            }
          }
        }
      }
      this.change(this.inputData)
    }

  }
}
</script>

<style scoped>

</style>
