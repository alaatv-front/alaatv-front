<template>
  <form-builder ref="formBuilder"
                v-model:value="localOptions.inputs" />
</template>

<script>
import { FormBuilder, inputMixin } from 'quasar-form-builder'

export default {
  name: 'FormBuilder',
  components: { FormBuilder },
  mixins: [inputMixin],
  props: {
    options: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  computed: {
    localOptions: {
      get () {
        return this.options
      },
      set (newValue) {
        this.$emit('update:options', newValue)
      }
    }
  }
}
</script>
