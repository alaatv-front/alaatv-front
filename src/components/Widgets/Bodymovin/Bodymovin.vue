<template>
  <div v-intersection="onIntersection"
       class="animation-wrapper"
       :class="{'cursor-pointer': localOptions.action.hasAction}"
       :style="responsiveBodymovin.style"
       @click="onClickElement">
    <div ref="firstBm"
         class="animation1"
         @mouseleave="onMouseLeave"
         @mouseenter="onHoverElement" />
    <div ref="secondBm"
         class="animation2"
         @mouseenter="onHoverElement2" />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'Bodymovin',
  mixins: [mixinWidget],
  data() {
    return {
      animation1: true,
      animation2: false,
      animationData1: null,
      animationData2: null,
      windowWidth: 0,
      isAllowedToPlay: true,
      defaultOptions: {
        loop: true,
        animate: 'autoPlay',
        autoplay: true,
        xs: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        sm: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        md: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        lg: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        xl: {
          directory: '',
          directory2: '',
          style: {
            width: null,
            height: null
          }
        },
        action: {
          hasAction: false,
          actionName: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  computed: {
    responsiveBodymovin() {
      let result = {}
      if (this.windowWidth >= 1920) {
        result = this.localOptions.xl.directory !== '' ? this.localOptions.xl : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.sm.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        result = this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.xl
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        result = this.localOptions.md.directory !== '' ? this.localOptions.md : this.localOptions.sm.directory !== '' ? this.localOptions.sm : this.localOptions.xs.directory !== '' ? this.localOptions.xs : this.localOptions.lg.directory !== '' ? this.localOptions.lg : this.localOptions.xl
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
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
      this.animationData1.autoplay = value === 'autoPlay'
      this.animationData1.stop()
      if (value === 'autoPlay') {
        this.animationData1.play()
      }
    },
    'localOptions.loop': function (value) {
      this.animationData1.loop = value
      this.animationData1.stop()
      this.animationData1.play()
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    this.reInitBodyMovin()
    window.addEventListener('resize', this.onResize)
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    onIntersection (entry) {
      if (this.localOptions.animate === 'onInterSection' && entry.isIntersecting) {
        this.animationData1.stop()
        this.animationData1.play()
      }
      if (this.localOptions.animate === 'onInterSectionOnce' && entry.isIntersecting && this.isAllowedToPlay) {
        this.animationData1.stop()
        this.animationData1.play()
        this.isAllowedToPlay = false
      }
    },
    onClickElement() {
      this.takeAction()
      if (this.localOptions.animate === 'onClick') {
        this.animationData1.stop()
        this.animationData1.play()
      }
    },
    onHoverElement() {
      if (this.localOptions.animate === 'onHover') {
        this.animationData1.loop = true
        this.animationData1.stop()
        this.animationData1.play()
      } else if (this.localOptions.animate === 'in & out') {
        this.$refs.secondBm.style.display = 'none'
        this.$refs.firstBm.style.display = 'block'
        this.animationData1.stop()
        this.animationData1.play()
      }
    },
    onMouseLeave() {
      if (this.localOptions.animate === 'onHover' && !this.localOptions.loop) {
        this.animationData1.loop = false
      } else if (this.localOptions.animate === 'in & out') {
        this.$refs.firstBm.style.display = 'none'
        this.$refs.secondBm.style.display = 'block'
        this.animationData2.stop()
        this.animationData2.play()
      }
    },
    onHoverElement2() {
      this.$refs.secondBm.style.display = 'none'
      this.$refs.firstBm.style.display = 'block'
      this.animationData1.stop()
      this.animationData1.play()
    },
    reInitBodyMovin() {
      if (this.animationData1) {
        this.animationData1.destroy()
      }
      if (this.animationData2) {
        this.animationData2.destroy()
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
      this.animationData1 = lottie.loadAnimation({
        wrapper: this.$refs.firstBm,
        animType: 'svg',
        loop: this.localOptions.loop,
        autoplay: this.localOptions.animate === 'autoPlay',
        path: this.responsiveBodymovin.directory
      })
      this.animationData2 = lottie.loadAnimation({
        wrapper: this.$refs.secondBm,
        animType: 'svg',
        loop: this.localOptions.loop,
        autoplay: this.localOptions.animate === 'autoPlay',
        path: this.responsiveBodymovin.directory2
      })
    }
  }
}
</script>

<style scoped lang="scss">
.animation-wrapper{
  .animation1 {
    display: block;
  }

  .animation2 {
    display: none;
  }
}
</style>
