<template>
  <div class="FormBuilderCustomComponentHint">
    {{ label }}
  </div>
</template>

<script>
export default {
  name: 'FormBuilderCustomComponentHint',
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss" scoped>
div {
  color: #9E9E9E;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  letter-spacing: -0.24px;
}
</style>
