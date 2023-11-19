<template>
  <div class="IframeWidget"
       :style="localOptions.style"
       v-html="localOptions.code" />
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'IframeWidget',
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        code: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.IframeWidget {
}
</style>
