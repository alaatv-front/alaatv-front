<template>
  <q-img :ref="imageRef"
         :src="getImageSource(localOptions)"
         :ratio="localOptions.ratio"
         spinner-color="primary"
         :width="getImageWidth(localOptions)"
         :height="getImageHeight(localOptions)"
         :style="localOptions.style"
         :class="localOptions.className"
         @click="takeAction(localOptions.action)" />
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'
import { AEE } from 'assets/js/AEE/AnalyticsEnhancedEcommerce.js'

export default {
  name: 'ImageWidget',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      imageRef: 'img' + Date.now(),
      windowWidth: 0,
      defaultOptions: {
        imageSource: null,
        ratio: null,
        hasAction: false,
        action: {
          name: null,
          route: null,
          scrollTo: null,
          eventName: null,
          eventArgs: null
        },
        xs: {
          height: null,
          width: null,
          src: null
        },
        sm: {
          height: null,
          width: null,
          src: null
        },
        md: {
          height: null,
          width: null,
          src: null
        },
        lg: {
          height: null,
          width: null,
          src: null
        },
        xl: {
          height: null,
          width: null,
          src: null
        }
      }
    }
  },
  mounted() {
    this.windowWidth = window.innerWidth
    window.addEventListener('resize', this.onResize)
    this.$nextTick(() => {
      this.setAEEEvent()
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    setProductIntersectionObserver () {
      const elements = [this.$refs[this.imageRef].$el]
      const observer = new IntersectionObserver(this.handleIntersection)

      elements.forEach(obs => {
        observer.observe(obs)
      })
    },
    handleIntersection(entries, observer) {
      entries.forEach(entry => {
        if (entry.intersectionRatio > 0) {
          this.ImageIsViewed()
          observer.unobserve(entry.target)
        }
      })
    },
    getAEEKey() {
      let AEEKey
      Object.values(this.localOptions.AEEEventBody).forEach(item => {
        AEEKey += item
      })
      return AEEKey
    },
    ImageIsViewed () {
      AEE.promotionView([this.localOptions.AEEEventBody], {
        TTl: 1000,
        key: this.getAEEKey()
      })
    },
    pushClickedEvent () {
      AEE.promotionClick([this.localOptions.AEEEventBody], {
        TTl: 1000,
        key: this.getAEEKey()
      })
    },
    setAEEEvent () {
      if (!this.localOptions.useAEEEvent) {
        return
      }
      this.setProductIntersectionObserver()
    },
    onResize() {
      this.windowWidth = window.innerWidth
    },
    getImageSource (options) {
      if (options.imageSource) {
        return options.imageSource
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.src ? options.xl.src : options.lg?.src ? options.lg.src : options.sm?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg.src ? options.lg.src : options.md?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs?.src : options.xl?.src
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm.src ? options.sm.src : options.xs?.src ? options.xs.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 599) {
        return options.xs?.src ? options.xs.src : options.sm?.src ? options.sm.src : options.md?.src ? options.md.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else {
        return ''
      }
    },
    getImageHeight (options) {
      if (options.height) {
        return options.height
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.height ? options.xl.height : options.lg?.height ? options.lg.height : options.sm?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.height ? options.lg.height : options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.xl?.height
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 599) {
        return options.xs?.height ? options.xs.height : options.sm?.height ? options.sm.height : options.md?.height ? options.md.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else {
        return ''
      }
    },
    getImageWidth (options) {
      if (options.width) {
        return options.width
      }
      if (this.windowWidth >= 1920) {
        return options.xl?.width ? options.xl.width : options.lg?.width ? options.lg.width : options.sm?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width
      } else if (this.windowWidth <= 1919 && this.windowWidth > 1440) {
        return options.lg?.width ? options.lg.width : options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.xl?.width
      } else if (this.windowWidth <= 1439 && this.windowWidth > 1024) {
        return options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 1023 && this.windowWidth > 600) {
        return options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 599) {
        return options.xs?.width ? options.xs.width : options.sm?.width ? options.sm.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else {
        return ''
      }
    },
    takeAction(action) {
      if (!this.localOptions.hasAction) {
        return
      }
      this.pushClickedEvent()
      if (this.callBack) {
        this.callBack()
      } else if (action.name === 'scroll') {
        this.scrollToElement(action.scrollTo)
      } else if (action.name === 'link') {
        this.router.push(action.route)
      } else if (action.name === 'event') {
        this.$bus.emit(action.eventName, action.eventArgs)
      }
    }
  }
}
</script>
