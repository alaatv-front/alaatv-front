<template>
  <component :is="parentComponent"
             :to="localOptions.action.route"
             :class="options.className"
             :href="localOptions.action.route"
             class="ImageWidget"
             @click="onClickLink">
    <q-img :ref="imageRef"
           :src="getImageSource(options)"
           :ratio="options.ratio"
           spinner-color="primary"
           :width="getImageWidth(options)"
           :height="getImageHeight(options)"
           :style="options.style"
           :class="{'cursor-pointer': localOptions.hasAction}"
           @click="takeAction(options.action)" />
  </component>
</template>

<script>
import { AEE } from 'src/assets/js/AEE/AnalyticsEnhancedEcommerce.js'
import { mixinPrefetchServerData, mixinWidget } from 'src/mixin/Mixins.js'

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
        useAEEEvent: false,
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
        },
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: null,
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          }
        },
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        boxShadows: [],
        cssHoverEffects: {
          boxShadows: [],
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: ''
          },
          transition: {
            time: 0
          },
          transform: {
            rotate: 0,
            scaleX: 1,
            scaleY: 1,
            skewX: 0,
            skewY: 0,
            translateX: 0,
            translateY: 0
          }
        }
      }
    }
  },
  computed: {
    shadows () {
      const shadows = []
      this.localOptions.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    hoverShadows () {
      const shadows = []
      if (!Array.isArray(this.localOptions.cssHoverEffects?.boxShadows)) {
        return ''
      }
      this.localOptions.cssHoverEffects.boxShadows.forEach(shadow => {
        shadows.push(shadow.cssString)
      })

      return shadows.join(', ')
    },
    cssHoverEffectsBorderStyle () {
      const borderCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderCssString : ''
      const borderRadiusCssString = this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString ? this.localOptions.cssHoverEffects?.borderStyle?.borderRadiusCssString : ''

      return {
        borderCssString,
        borderRadiusCssString
      }
    },
    parentComponent() {
      if (this.localOptions.action.route) {
        if (this.isExternal(this.localOptions.action.route)) {
          return 'a'
        } else {
          return 'router-link'
        }
      }
      return 'div'
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
    onClickLink (event) {
      event.preventDefault()
      event.stopPropagation()
      if (this.parentComponent === 'a') {
        window.location.href = this.localOptions.action.route
      } else if (this.parentComponent === 'router-link') {
        this.$router.push(this.localOptions.action.route)
      }
    },
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
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return options.lg.src ? options.lg.src : options.md?.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs?.src : options.xl?.src
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return options.md.src ? options.md.src : options.sm?.src ? options.sm.src : options.xs?.src ? options.xs.src : options.lg?.src ? options.lg.src : options.xl?.src
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
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
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return options.lg?.height ? options.lg.height : options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.xl?.height
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return options.md?.height ? options.md.height : options.sm?.height ? options.sm.height : options.xs?.height ? options.xs.height : options.lg?.height ? options.lg.height : options.xl?.height
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
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
      } else if (this.windowWidth <= 1919 && this.windowWidth >= 1440) {
        return options.lg?.width ? options.lg.width : options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.xl?.width
      } else if (this.windowWidth <= 1439 && this.windowWidth >= 1024) {
        return options.md?.width ? options.md.width : options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 1023 && this.windowWidth >= 600) {
        return options.sm?.width ? options.sm.width : options.xs?.width ? options.xs.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else if (this.windowWidth <= 599) {
        return options.xs?.width ? options.xs.width : options.sm?.width ? options.sm.width : options.md?.width ? options.md.width : options.lg?.width ? options.lg.width : options.xl?.width
      } else {
        return ''
      }
    },
    checkDomain(url) {
      if (url.indexOf('//') === 0) {
        url = window.location.protocol + url
      }
      return url.toLowerCase().replace(/([a-z])?:\/\//, '$1').split('/')[0]
    },
    isExternal(url) {
      if (typeof window === 'undefined') {
        return true
      }
      // return ((url.indexOf(':') > -1 || url.indexOf('//') > -1) && this.checkDomain(window.location.href) !== this.checkDomain(url))
      // return ((url.indexOf('http://') > -1 || url.indexOf('https://') > -1) && this.checkDomain(window.location.href) !== this.checkDomain(url))
      return (url.indexOf('http://') > -1 || url.indexOf('https://') > -1)
    },
    takeAction(action) {
      if (!this.localOptions.hasAction) {
        return
      }
      if (this.localOptions.useAEEEvent) {
        this.pushClickedEvent()
      }
      if (this.callBack) {
        this.callBack()
      } else if (action.name === 'scroll') {
        this.scrollToElement(action.scrollTo)
      } else if (action.name === 'event') {
        this.$bus.emit(action.eventName, action.eventArgs)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component.scss";

$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$hoverBorder: v-bind('cssHoverEffectsBorderStyle.borderCssString');
$hoverBorderRadius: v-bind('cssHoverEffectsBorderStyle.borderRadiusCssString');
$skewX: v-bind('localOptions.cssHoverEffects.transform.skewX');
$skewY: v-bind('localOptions.cssHoverEffects.transform.skewY');
$rotate: v-bind('localOptions.cssHoverEffects.transform.rotate');
$scaleX: v-bind('localOptions.cssHoverEffects.transform.scaleX');
$scaleY: v-bind('localOptions.cssHoverEffects.transform.scaleY');
$translateX: v-bind('localOptions.cssHoverEffects.transform.translateX');
$translateY: v-bind('localOptions.cssHoverEffects.transform.translateY');
$transitionTime: v-bind('localOptions.cssHoverEffects.transition.time');

$responsiveSpacing: (
    xs: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
    ),
    sm: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
    ),
    md: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
    ),
    lg: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
    ),
    xl: (
        marginTop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
        marginLeft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
        marginRight: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
        marginBottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
        paddingTop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
        paddingLeft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
        paddingRight: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
        paddingBottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
    )
);

.ImageWidget {
  .q-img {
    @include media-query-spacings($responsiveSpacing, $sizes);

    box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    -moz-box-shadow: $shadows;
    -webkit-border-radius: $borderRadius;
    -moz-border-radius: $borderRadius;
    border: $border;
  }
  &:hover .q-img {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    -webkit-box-shadow: $hoverShadows;
    -moz-box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    -webkit-border-radius: $hoverBorderRadius;
    -moz-border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }
  .cursor-pointer {
    cursor: pointer;
  }
}
</style>
