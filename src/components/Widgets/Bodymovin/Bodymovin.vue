<template>
  <div ref="bm"
       :style="responsiveBodymovin.style" />
</template>

<script>
import lottie from 'lottie-web'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Bodymovin',
  mixins: [mixinWidget],
  data() {
    return {
      animation: null,
      windowWidth: 0,
      defaultOptions: {
        loop: true,
        autoplay: true,
        xs: {
          directory: '',
          style: {
            width: null,
            height: null
          }
        },
        sm: {
          directory: '',
          style: {
            width: null,
            height: null
          }
        },
        md: {
          directory: '',
          style: {
            width: null,
            height: null
          }
        },
        lg: {
          directory: '',
          style: {
            width: null,
            height: null
          }
        },
        xl: {
          directory: '',
          style: {
            width: null,
            height: null
          }
        }
      }
    }
  },
  computed: {
    responsiveBodymovin() {
      let result = {}
      if (this.windowWidth >= 1920) {
        result = this.localOptions.xl.directory !== '' ? this.localOptions.xl : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.sm.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        result = this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        result = this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        result = this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.xl
      } else if (this.windowWidth <= 599) {
        result = this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.xl
      }
      return result
    }
  },
  watch: {
    'localOptions.xl.directory': function () {
      this.reInitBodyMovin()
    },
    'localOptions.lg.directory': function () {
      this.reInitBodyMovin()
    },
    'localOptions.md.directory': function () {
      this.reInitBodyMovin()
    },
    'localOptions.sm.directory': function () {
      this.reInitBodyMovin()
    },
    'localOptions.xs.directory': function () {
      this.reInitBodyMovin()
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    this.loadBodyMovin()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    reInitBodyMovin() {
      if (this.animation) {
        this.animation.destroy()
      }
      this.loadBodyMovin()
    },
    onResize() {
      if (typeof window === 'undefined') {
        return
      }
      this.windowWidth = window.innerWidth
      this.reInitBodyMovin()
    },
    loadBodyMovin() {
      if (this.responsiveBodymovin.directory) {
        this.animation = lottie.loadAnimation({
          wrapper: this.$refs.bm,
          animType: 'svg',
          loop: this.localOptions.loop,
          autoplay: this.localOptions.autoplay,
          path: this.responsiveBodymovin.directory
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
