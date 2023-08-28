<template>
  <div ref="bm"
       v-intersection="onIntersection"
       :style="responsiveBodymovin.style"
       @click="onClickElement"
       @mouseleave="onMouseLeave"
       @mouseenter="onHoverElement" />
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
      isAllowedToPlay: true,
      defaultOptions: {
        loop: true,
        animate: 'autoPlay',
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
    },
    'localOptions.animate': function (value) {
      this.animation.autoplay = value === 'autoPlay'
      this.animation.stop()
      if (value === 'autoPlay') {
        this.animation.play()
      }
    },
    'localOptions.loop': function (value) {
      this.animation.loop = value
      this.animation.stop()
      this.animation.play()
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
    onIntersection (entry) {
      if (this.localOptions.animate === 'onInterSection' && entry.isIntersecting) {
        this.animation.stop()
        this.animation.play()
      }
      if (this.localOptions.animate === 'onInterSectionOnce' && entry.isIntersecting && this.isAllowedToPlay) {
        this.animation.stop()
        this.animation.play()
        this.isAllowedToPlay = false
      }
    },
    onClickElement() {
      if (this.localOptions.animate === 'onClick') {
        this.animation.stop()
        this.animation.play()
      }
    },
    onHoverElement() {
      if (this.localOptions.animate === 'onHover') {
        this.animation.loop = true
        this.animation.stop()
        this.animation.play()
      }
    },
    onMouseLeave () {
      if (this.localOptions.animate === 'onHover' && !this.localOptions.loop) {
        this.animation.loop = false
      }
    },
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
          autoplay: this.localOptions.animate === 'autoPlay',
          path: this.responsiveBodymovin.directory
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
