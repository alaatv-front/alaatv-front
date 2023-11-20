<template>
  <button @click="$emit('toggleDialog')">set</button>
</template>

<script>
export default {
  name: 'SetButton',
  emits: ['toggleDialog'],
  methods: {
    emitEvent () {
      this.$emit('toggleDialog')
    }
  }
}
</script>
