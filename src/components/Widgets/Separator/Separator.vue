<template>
  <div v-if="localOptions.image"
       class="separator-image-wrapper"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-img :src="localOptions.image"
           class="separator-image"
           alt="separator"
           :height="localOptions.height"
           :width="localOptions.width"
           :style="localOptions.ImageStyle"
           :class="localOptions.ImageClassName" /></div>
  <q-separator v-else
               :style="localOptions.style"
               :class="localOptions.className"
               :spaced="localOptions.spaced"
               :dark="localOptions.dark"
               :inset="localOptions.inset"
               :vertical="localOptions.vertical" />
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'Separator',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      defaultOptions: {
        spaced: false,
        dark: false,
        inset: false,
        vertical: false,
        image: null,
        ImageStyle: null,
        ImageClassName: null,
        height: null,
        width: null,
        style: {},
        className: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.separator-image-wrapper {
  width: 100%;

  .separator-image {
    width: 100%;
  }
}
</style>
