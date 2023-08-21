<template>
  <div class="text-widget-container"
       :style="localOptions.style"
       :class="[localOptions.className, {'theme__1': localOptions.activeTheme === 'theme1'}]">
    <span class="text"
          v-html="localOptions.text" />
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'TextWidget',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        text: '',
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        xs: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        sm: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        md: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        lg: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        xl: {
          fontSize: null,
          fontWeight: null,
          fontStyle: null,
          lineHeight: null
        },
        hasTheme: null,
        activeTheme: null,
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
  }
}
</script>

<style scoped lang="scss">
.text-widget-container {

  &.theme__1 {

    &::before {
      content: "";
      position: absolute;
      width: v-bind('localOptions.themes.theme1.borderWidth');
      height: v-bind('localOptions.themes.theme1.borderHeight');
      left: v-bind('localOptions.themes.theme1.left');
      top: v-bind('localOptions.themes.theme1.top');
      right: v-bind('localOptions.themes.theme1.right');
      bottom: v-bind('localOptions.themes.theme1.bottom');
      border-top: v-bind('localOptions.themes.theme1.borderSize') solid v-bind('localOptions.themes.theme1.borderColor');
    }
  }
  @media screen and(max-width: 599px) {
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

  @media screen and (max-width: 1920px) {
    font-size: v-bind('localOptions.lg.fontSize');
    font-weight: v-bind('localOptions.lg.fontWeight');
    font-style: v-bind('localOptions.lg.fontStyle');
    line-height: v-bind('localOptions.lg.lineHeight');
  }

  @media screen and (max-width: 1440px) {
    font-size: v-bind('localOptions.md.fontSize');
    font-weight: v-bind('localOptions.md.fontWeight');
    font-style: v-bind('localOptions.md.fontStyle');
    line-height: v-bind('localOptions.md.lineHeight');
  }

  @media screen and (max-width: 1024px) {
    font-size: v-bind('localOptions.sm.fontSize');
    font-weight: v-bind('localOptions.sm.fontWeight');
    font-style: v-bind('localOptions.sm.fontStyle');
    line-height: v-bind('localOptions.sm.lineHeight');
  }

  @media screen and (max-width: 600px) {
    font-size: v-bind('localOptions.xs.fontSize');
    font-weight: v-bind('localOptions.xs.fontWeight');
    font-style: v-bind('localOptions.xs.fontStyle');
    line-height: v-bind('localOptions.xs.lineHeight');
  }
}
</style>
