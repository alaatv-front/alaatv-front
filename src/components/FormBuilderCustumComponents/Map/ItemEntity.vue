<template>
  <q-option-group
    class="flex"
    :options="options"
    type="radio"
    v-model="group"
    color="primary"
    dense
    inline
  />
</template>

<script>
import { inputMixin } from 'quasar-form-builder'
export default {
  name: 'ItemEntity',
  data() {
    return {
      group: [],
      options: [
        {
          label: 'هیچکدام',
          value: 0
        },
        {
          label: 'محصول',
          value: 1
        },
        {
          label: 'دسته محتوا',
          value: 2
        },
        {
          label: ' محتوا',
          value: 3
        }]
    }
  },
  mixins: [inputMixin]

}
</script>

<style scoped>

</style>
