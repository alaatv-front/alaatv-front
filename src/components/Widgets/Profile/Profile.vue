<template>
  <div>data from json page :{{ data.test }}</div>
  <div>options from json page: {{ options.test }}</div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins'
export default {
  name: 'Profile.vue',
  mixins: [mixinWidget],
  data() {
    return {}
  }
}
</script>

<style scoped></style>
