<template>
  <div class="timer-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <component-wrapper :class="topComponentClass"
                       class="top-component"
                       :options="localOptions.topComponentOptions" />
    <component-wrapper :class="rightComponentClass"
                       class="left-component"
                       :options="localOptions.rightComponentOptions" />
    <timer-base-black-friday v-if="localOptions.theme === 'blackFriday'"
                             class="timer-wrapper"
                             :time="localOptions.time"
                             :theme="localOptions.theme"
                             :counters="localOptions.counters"
                             :timerStyle="localOptions.timerStyle" />
    <timer-base v-else
                class="timer-wrapper"
                :time="localOptions.time"
                :theme="localOptions.theme"
                :counters="localOptions.counters"
                :timerStyle="localOptions.timerStyle" />
    <component-wrapper :class="leftComponentClass"
                       class="right-component"
                       :options="localOptions.leftComponentOptions" />
    <component-wrapper :class="bottomComponentClass"
                       class="bottom-component"
                       :options="localOptions.bottomComponentOptions" />

  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinWidget } from 'src/mixin/Mixins.js'
import ComponentWrapper from 'src/components/Widgets/ComponentWrapper/ComponentWrapper.vue'
import TimerBase from 'src/components/Widgets/Timer/TimerBase.vue'
import TimerBaseBlackFriday from 'src/components/Widgets/Timer/TimerBaseBlackFriday.vue'
import moment from 'moment-jalaali'

export default defineComponent({
  name: 'Timer',
  components: {
    ComponentWrapper,
    TimerBase,
    TimerBaseBlackFriday
  },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        time: '1402-06-01 00:00',
        counters: {
          seconds: true,
          minutes: true,
          hours: true,
          days: true
        },
        hasTop: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        hasLeft: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        hasRight: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        hasBottom: {
          xs: false,
          sm: false,
          md: false,
          lg: false,
          xl: false
        },
        timerStyle: {
          timerColor: null,
          timerBackground: null,
          timerSize: null,
          timerLabelColor: null,
          timerLabelBackground: null,
          timerLabelSize: null,
          secondsBackground: null,
          counterWidth: null,
          counterHeight: null,
          counterMargin: null,
          counterPadding: null,
          counterBorderRadius: null
        },
        theme: 'default',
        topComponentOptions: {},
        leftComponentOptions: {},
        rightComponentOptions: {},
        bottomComponentOptions: {},
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        },
        boxShadows: [],
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
    topComponentClass() {
      return this.getDisplayClasses(this.localOptions.hasTop)
    },
    leftComponentClass() {
      return this.getDisplayClasses(this.localOptions.hasLeft)
    },
    rightComponentClass() {
      return this.getDisplayClasses(this.localOptions.hasRight)
    },
    bottomComponentClass() {
      return this.getDisplayClasses(this.localOptions.hasBottom)
    },
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
  beforeMount() {
    moment.loadPersian()
  },
  methods: {
    getDisplayClasses(responsiveObject) {
      let className = ''
      for (const [key, value] of Object.entries(responsiveObject)) {
        if (value) {
          className = className.concat(` screen-${key}`)
        }
      }
      return className
    }
  }
})
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component";

$breakpoint-xs: 599px ;
$breakpoint-sm: 1023px ;
$breakpoint-md: 1439px ;
$breakpoint-lg: 1919px;
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
        margintop: v-bind('defaultOptions.responsiveSpacing.xs.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.xs.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.xs.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.xs.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.xs.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.xs.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.xs.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.xs.paddingBottom'),
    ),
    sm: (
        margintop: v-bind('defaultOptions.responsiveSpacing.sm.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.sm.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.sm.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.sm.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.sm.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.sm.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.sm.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.sm.paddingBottom'),
    ),
    md: (
        margintop: v-bind('defaultOptions.responsiveSpacing.md.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.md.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.md.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.md.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.md.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.md.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.md.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.md.paddingBottom'),
    ),
    lg: (
        margintop: v-bind('defaultOptions.responsiveSpacing.lg.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.lg.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.lg.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.lg.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.lg.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.lg.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.lg.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.lg.paddingBottom'),
    ),
    xl: (
        margintop: v-bind('defaultOptions.responsiveSpacing.xl.marginTop'),
        marginleft: v-bind('defaultOptions.responsiveSpacing.xl.marginLeft'),
        marginright: v-bind('defaultOptions.responsiveSpacing.xl.marginRight'),
        marginbottom: v-bind('defaultOptions.responsiveSpacing.xl.marginBottom'),
        paddingtop: v-bind('defaultOptions.responsiveSpacing.xl.paddingTop'),
        paddingleft: v-bind('defaultOptions.responsiveSpacing.xl.paddingLeft'),
        paddingright: v-bind('defaultOptions.responsiveSpacing.xl.paddingRight'),
        paddingbottom: v-bind('defaultOptions.responsiveSpacing.xl.paddingBottom'),
    )
);

.timer-container {
  @include media-query-spacings($responsiveSpacing, $sizes);

  display: grid;
  grid-template-columns: auto 1fr auto;
  grid-template-rows: auto 1fr auto;
  grid-gap: 0;
  box-shadow: $shadows;
  border-radius: $borderRadius;
  border: $border;

  &:hover {
    transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
    transition: all calc(#{$transitionTime} * 1s);
    box-shadow: $hoverShadows;
    border-radius: $hoverBorderRadius;
    border: $hoverBorder;
  }

  .top-component {
    display: none;
    grid-area: 1 / 1 / 2 / 4;

    &.screen-xs {
      @media only screen and (max-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-sm {
      @media only screen and (max-width: $breakpoint-sm) and (min-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-md {
      @media only screen and (max-width: $breakpoint-md) and (min-width: $breakpoint-sm) {
        display: initial;
      }
    }

    &.screen-lg {
      @media only screen and (max-width: $breakpoint-lg) and (min-width: $breakpoint-md) {
        display: initial;
      }
    }

    &.screen-xl {
      @media only screen and (min-width: $breakpoint-lg) {
        display: initial;
      }
    }
  }

  .left-component {
    display: none;
    grid-area: 1 / 1 / 4 / 2;

    &.screen-xs {
      @media only screen and (max-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-sm {
      @media only screen and (max-width: $breakpoint-sm) and (min-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-md {
      @media only screen and (max-width: $breakpoint-md) and (min-width: $breakpoint-sm) {
        display: initial;
      }
    }

    &.screen-lg {
      @media only screen and (max-width: $breakpoint-lg) and (min-width: $breakpoint-md) {
        display: initial;
      }
    }

    &.screen-xl {
      @media only screen and (min-width: $breakpoint-lg) {
        display: initial;
      }
    }
  }

  .timer-wrapper {
    grid-area: 2 / 2 / 3 / 3;

    &.screen-xs {
      @media only screen and (max-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-sm {
      @media only screen and (max-width: $breakpoint-sm) and (min-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-md {
      @media only screen and (max-width: $breakpoint-md) and (min-width: $breakpoint-sm) {
        display: initial;
      }
    }

    &.screen-lg {
      @media only screen and (max-width: $breakpoint-lg) and (min-width: $breakpoint-md) {
        display: initial;
      }
    }

    &.screen-xl {
      @media only screen and (min-width: $breakpoint-lg) {
        display: initial;
      }
    }
  }

  .right-component {
    display: none;
    grid-area: 1 / 3 / 4 / 4;

    &.screen-xs {
      @media only screen and (max-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-sm {
      @media only screen and (max-width: $breakpoint-sm) and (min-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-md {
      @media only screen and (max-width: $breakpoint-md) and (min-width: $breakpoint-sm) {
        display: initial;
      }
    }

    &.screen-lg {
      @media only screen and (max-width: $breakpoint-lg) and (min-width: $breakpoint-md) {
        display: initial;
      }
    }

    &.screen-xl {
      @media only screen and (min-width: $breakpoint-lg) {
        display: initial;
      }
    }
  }

  .bottom-component {
    display: none;
    grid-area: 3 / 1 / 4 / 4;

    &.screen-xs {
      @media only screen and (max-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-sm {
      @media only screen and (max-width: $breakpoint-sm) and (min-width: $breakpoint-xs) {
        display: initial;
      }
    }

    &.screen-md {
      @media only screen and (max-width: $breakpoint-md) and (min-width: $breakpoint-sm) {
        display: initial;
      }
    }

    &.screen-lg {
      @media only screen and (max-width: $breakpoint-lg) and (min-width: $breakpoint-md) {
        display: initial;
      }
    }

    &.screen-xl {
      @media only screen and (min-width: $breakpoint-lg) {
        display: initial;
      }
    }
  }
}
</style>
