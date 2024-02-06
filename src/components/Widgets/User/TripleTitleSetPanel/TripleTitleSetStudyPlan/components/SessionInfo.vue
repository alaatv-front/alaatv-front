<template>
  <div v-for="(info, index) in data"
       :key="index"
       class="row">
    <div class="col-1">
      <q-icon name="isax:play-circle" />
    </div>
    <div class="col-10">
      {{info.code}} - {{info.text}}
    </div>
    <div class="col-1">
      <q-icon name="isax:trash" />
    </div>
  </div>
</template>

<script>
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'
export default {
  name: 'SessionInfo',
  mixins: [inputMixin],
  props: {
    value: {
      default: () => [],
      type: [Array, Object, String, Number, Boolean]
    },
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['onInputClick']
}
</script>
