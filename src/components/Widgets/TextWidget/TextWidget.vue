<template>
  <div class="text-widget-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <span class="text"
          v-html="localOptions.text" />
  </div>
</template>

<script>
import { mixinWidget, mixinPrefetchServerData } from 'src/mixin/Mixins.js'

export default {
  name: 'TextWidget',
  mixins: [mixinPrefetchServerData, mixinWidget],
  data() {
    return {
      defaultOptions: {
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        lgFontSize: null,
        lgFontWeight: null,
        lgFontStyle: null,
        mdFontSize: null,
        mdFontWeight: null,
        mdFontStyle: null,
        smFontSize: null,
        smFontWeight: null,
        smFontStyle: null,
        xsFontSize: null,
        xsFontWeight: null,
        xsFontStyle: null
      }
    }
  }
}
</script>

<style scoped lang="scss">
.text-widget-container {
  @media screen and(max-width: 599px) {
    //display: flex;
    //width: 100%;
  }
}

.text {
  color: v-bind('localOptions.color');
  font-size: v-bind('localOptions.fontSize');
  font-weight: v-bind('localOptions.fontWeight');
  font-family: v-bind('localOptions.fontFamily');
  font-style: v-bind('localOptions.fontStyle');

  @media screen and (max-width: 1920px) {
    font-size: v-bind('localOptions.lgFontSize');
    font-weight: v-bind('localOptions.lgFontWeight');
    font-style: v-bind('localOptions.lgFontStyle');
  }

  @media screen and (max-width: 1440px) {
    font-size: v-bind('localOptions.lgFontSize');
    font-weight: v-bind('localOptions.lgFontWeight');
    font-style: v-bind('localOptions.lgFontStyle');
  }

  @media screen and (max-width: 1024px) {
    font-size: v-bind('localOptions.smFontSize');
    font-weight: v-bind('localOptions.smFontWeight');
    font-style: v-bind('localOptions.smFontStyle');
  }

  @media screen and (max-width: 600px) {
    font-size: v-bind('localOptions.xsFontSize');
    font-weight: v-bind('localOptions.xsFontWeight');
    font-style: v-bind('localOptions.xsFontStyle');
  }
}
</style>
