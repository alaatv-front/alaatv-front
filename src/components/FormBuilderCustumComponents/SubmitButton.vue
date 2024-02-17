<template>
  <q-btn :label="label"
         :icon="icon"
         :color="color"
         :flat="flat"
         :outline="outlined"
         :disable="disable"
         :loading="loading"
         :class="customClass"
         class="submit-button"
         @click="onClick" />
</template>

<script>
import inputMixin from 'quasar-form-builder/src/mixins/inputMixin.js'
export default {
  name: 'SubmitButton',
  mixins: [inputMixin],
  props: {
    value: {
      default: () => []
    },
    color: {
      default: 'primary',
      type: String
    },
    outline: {
      default: false,
      type: Boolean
    },
    label: {
      default: undefined,
      type: String
    },
    icon: {
      default: undefined,
      type: String
    },
    disable: {
      default: false,
      type: Boolean
    },
    loading: {
      default: false,
      type: Boolean
    },
    customClass: {
      default: '',
      type: String
    },
    atClick: {
      type: Function,
      default: () => {}
    }
  },
  emits: ['onClick'],
  methods: {
    onClick (event) {
      this.atClick()
      this.$emit('onClick', event)
    }
  }
}
</script>

<style scoped lang="scss">
.submit-button {
  margin-top: $space-7;
}
</style>
