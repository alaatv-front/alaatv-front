<template>
  {{text}}
</template>

<script>
export default {
  name: 'TextComponent',
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
