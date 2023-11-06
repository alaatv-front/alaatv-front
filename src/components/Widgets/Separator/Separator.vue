<template>
  <div v-if="localOptions.image"
       class="separator-image-wrapper"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-img :src="localOptions.image"
           class="separator-image"
           alt="separator"
           :height="getSeparatorHeight()"
           :width="getSeparatorWidth()"
           :class="localOptions.ImageClassName" />
  </div>
  <q-separator v-else
               class="separator"
               :style="[localOptions.style, {width: getSeparatorWidth(), height: getSeparatorHeight()}]"
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
      windowWidth: 0,
      defaultOptions: {
        spaced: false,
        dark: false,
        inset: false,
        vertical: false,
        image: null,
        ImageStyle: null,
        ImageClassName: null,
        height: {
          xl: '',
          lg: '',
          md: '',
          sm: '',
          xs: ''
        },
        width: {
          xl: '',
          lg: '',
          md: '',
          sm: '',
          xs: ''
        },
        style: {},
        className: ''
      }
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onResize() {
      this.windowWidth = window.innerWidth
    },
    getSeparatorWidth () {
      if (this.windowWidth >= 1920) {
        return this.localOptions.width.xl ? this.localOptions.width.xl : this.localOptions.width.lg ? this.localOptions.width.lg : this.localOptions.width.md ? this.localOptions.width.md : this.localOptions.width.sm ? this.localOptions.width.sm : this.localOptions.width.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return this.localOptions.width.lg ? this.localOptions.width.lg : this.localOptions.width.md ? this.localOptions.width.md : this.localOptions.width.sm ? this.localOptions.width.sm : this.localOptions.width.xs ? this.localOptions.width.xs : this.localOptions.width.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return this.localOptions.width.md ? this.localOptions.width.md : this.localOptions.width.sm ? this.localOptions.width.sm : this.localOptions.width.xs ? this.localOptions.width.xs : this.localOptions.width.xl ? this.localOptions.width.xl : this.localOptions.width.lg
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
        return this.localOptions.width.sm ? this.localOptions.width.sm : this.localOptions.width.xs ? this.localOptions.width.xs : this.localOptions.width.xl ? this.localOptions.width.xl : this.localOptions.width.lg ? this.localOptions.width.lg : this.localOptions.width.md
      } else if (this.windowWidth <= 599) {
        return this.localOptions.width.xs ? this.localOptions.width.xs : this.localOptions.width.xl ? this.localOptions.width.xl : this.localOptions.width.lg ? this.localOptions.width.lg : this.localOptions.width.md ? this.localOptions.width.md : this.localOptions.width.sm
      } else {
        return ''
      }
    },
    getSeparatorHeight () {
      if (this.windowWidth >= 1920) {
        return this.localOptions.height.xl ? this.localOptions.height.xl : this.localOptions.height.lg ? this.localOptions.height.lg : this.localOptions.height.md ? this.localOptions.height.md : this.localOptions.height.sm ? this.localOptions.height.sm : this.localOptions.height.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return this.localOptions.height.lg ? this.localOptions.height.lg : this.localOptions.height.md ? this.localOptions.height.md : this.localOptions.height.sm ? this.localOptions.height.sm : this.localOptions.height.xs ? this.localOptions.height.xs : this.localOptions.height.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return this.localOptions.height.md ? this.localOptions.height.md : this.localOptions.height.sm ? this.localOptions.height.sm : this.localOptions.height.xs ? this.localOptions.height.xs : this.localOptions.height.xl ? this.localOptions.height.xl : this.localOptions.height.lg
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
        return this.localOptions.height.sm ? this.localOptions.height.sm : this.localOptions.height.xs ? this.localOptions.height.xs : this.localOptions.height.xl ? this.localOptions.height.xl : this.localOptions.height.lg ? this.localOptions.height.lg : this.localOptions.height.md
      } else if (this.windowWidth <= 599) {
        return this.localOptions.height.xs ? this.localOptions.height.xs : this.localOptions.height.xl ? this.localOptions.height.xl : this.localOptions.height.lg ? this.localOptions.height.lg : this.localOptions.height.md ? this.localOptions.height.md : this.localOptions.height.sm
      } else {
        return ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.separator {
  align-self: center;
}
.separator-image-wrapper {
  //width: 100%;

  .separator-image {
    width: 100%;
  }
}
</style>
