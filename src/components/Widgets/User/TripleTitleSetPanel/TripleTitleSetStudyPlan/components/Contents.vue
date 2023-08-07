<template>
  <div>
    <div>
      کد جلسات
    </div>
    <q-select v-model="localValue"
              filled
              use-input
              use-chips
              multiple
              hide-dropdown-icon
              input-debounce="0"
              new-value-mode="add" />
  </div>
</template>

<script>
export default {
  name: 'AddLink',
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    localValue: {
      get () {
        return this.value
      },
      set (newValue) {
        console.log('newValue', newValue)
        this.$emit('update:value', newValue)
      }
    }
  }
}
</script>
