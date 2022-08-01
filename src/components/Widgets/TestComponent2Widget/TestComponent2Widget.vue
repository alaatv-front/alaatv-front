<template>
  <div>
    Test-component-2
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'Test-component-2widget',
  mixins: [mixinWidget]
}
</script>

<style scoped>
div {
  border: solid 1px red;
}
</style>
