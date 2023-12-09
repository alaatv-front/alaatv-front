<template>
  <div class="text-widget-container"
       :style="localOptions.style"
       :class="[localOptions.className, localOptions.activeTheme, responsiveShow]">
    <span class="text"
          v-html="localOptions.text" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TextWidget',
  mixins: [mixinWidget],
  data () {
    return {
      defaultOptions: {
        text: '',
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        responsiveShow: {
          xl: true,
          lg: true,
          md: true,
          sm: true,
          xs: true
        },
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null,
          letterSpacing: null
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
        hasTheme: null,
        activeTheme: 'default',
        themes: {
          theme1: {
            borderColor: null,
            borderSize: null,
            borderWidth: null,
            borderHeight: null,
            top: null,
            left: null,
            bottom: null,
            right: null
          }
        }
      }
    }
  },
  computed: {
    responsiveShow () {
      let responsiveShow = ''
      Object.keys(this.localOptions.responsiveShow).forEach(key => {
        if (this.localOptions.responsiveShow[key] === false) {
          responsiveShow += key + '-hide '
        }
      })

      return ' ' + responsiveShow
    }
  }
}
</script>

<style scoped lang="scss">
@import "quasar-ui-q-page-builder/src/components/Component.scss";
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

.text-widget-container {
  @include media-query-spacings($responsiveSpacing, $sizes);

  &.theme1 {
    &::before {
      content: "";
      position: absolute;
      width: v-bind('localOptions.themes.theme1.borderWidth');
      height: v-bind('localOptions.themes.theme1.borderHeight');
      inset: v-bind('localOptions.themes.theme1.top') v-bind('localOptions.themes.theme1.right') v-bind('localOptions.themes.theme1.bottom') v-bind('localOptions.themes.theme1.left');
      border-top: v-bind('localOptions.themes.theme1.borderSize') solid v-bind('localOptions.themes.theme1.borderColor');
    }
  }

  @media screen and (width <= 599px) {
    //display: flex;
    //width: 100%;
  }
}

.text {
  line-height: v-bind('localOptions.xl.lineHeight');
  color: v-bind('localOptions.color');
  font-size: v-bind('localOptions.xl.fontSize');
  font-weight: v-bind('localOptions.xl.fontWeight');
  font-family: v-bind('localOptions.fontFamily');
  font-style: v-bind('localOptions.xl.fontStyle');
  letter-spacing: v-bind('localOptions.xl.letterSpacing');

  @include media-max-width('xl') {
    font-size: v-bind('localOptions.lg.fontSize');
    font-weight: v-bind('localOptions.lg.fontWeight');
    font-style: v-bind('localOptions.lg.fontStyle');
    line-height: v-bind('localOptions.lg.lineHeight');
    letter-spacing: v-bind('localOptions.lg.letterSpacing');
  }

  @include media-max-width('lg') {
    font-size: v-bind('localOptions.md.fontSize');
    font-weight: v-bind('localOptions.md.fontWeight');
    font-style: v-bind('localOptions.md.fontStyle');
    line-height: v-bind('localOptions.md.lineHeight');
    letter-spacing: v-bind('localOptions.md.letterSpacing');
  }

  @include media-max-width('md')  {
    font-size: v-bind('localOptions.sm.fontSize');
    font-weight: v-bind('localOptions.sm.fontWeight');
    font-style: v-bind('localOptions.sm.fontStyle');
    line-height: v-bind('localOptions.sm.lineHeight');
    letter-spacing: v-bind('localOptions.sm.letterSpacing');
  }

  @include media-max-width('sm')  {
    font-size: v-bind('localOptions.xs.fontSize');
    font-weight: v-bind('localOptions.xs.fontWeight');
    font-style: v-bind('localOptions.xs.fontStyle');
    line-height: v-bind('localOptions.xs.lineHeight');
    letter-spacing: v-bind('localOptions.xs.letterSpacing');
  }
}
</style>
