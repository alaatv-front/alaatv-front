<template>
  <form-builder ref="formBuilder"
                v-model:value="data.inputs" />
</template>

<script>
import { FormBuilder, inputMixin } from 'quasar-form-builder'

export default {
  name: 'FormBuilder',
  mixins: [inputMixin],
  components: {
    FormBuilder
  },
  props: {
    data: {
      type: Object,
      default: {}
    },
    options: {
      type: Object,
      default: {}
    }
  }

}
</script>

<style scoped>

</style>
