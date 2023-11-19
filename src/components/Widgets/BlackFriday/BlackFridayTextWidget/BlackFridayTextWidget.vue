<template>
  <div class="text-widget-container"
       :style="localOptions.style"
       :class="[localOptions.className, localOptions.activeTheme, responsiveShow]">
    <div class="blackFriday-image-wrapper">
      <lazy-img v-if="localOptions.activeTheme === 'blackFriday'"
                :src="'https://nodes.alaatv.com/upload/alaaPages/2023-11/star1699446511.png'"
                :alt="'star'"
                class="img-blackFriday" />
    </div>
    <span class="text"
          v-html="localOptions.text" />
    <div class="blackFriday-image-wrapper">
      <lazy-img v-if="localOptions.activeTheme === 'blackFriday'"
                :src="'https://nodes.alaatv.com/upload/alaaPages/2023-11/star1699446511.png'"
                :alt="'star'"
                class="img-blackFriday" />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import LazyImg from 'src/components/lazyImg.vue'

export default {
  name: 'BlackFridayTextWidget',
  components: {
    LazyImg
  },
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
@import "quasar-ui-q-page-builder/src/components/Component";

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

  &.blackFriday {
    display: flex;
    justify-content: center;
    align-items: center;

    .blackFriday-image-wrapper {
      display: flex;
      width: 28px;
      height: 28px;
      margin: 0 8px;

      .img-blackFriday {
        width: 100%;
        height: 100%;
      }
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

  @media screen and (width <= 1920px) {
    font-size: v-bind('localOptions.lg.fontSize');
    font-weight: v-bind('localOptions.lg.fontWeight');
    font-style: v-bind('localOptions.lg.fontStyle');
    line-height: v-bind('localOptions.lg.lineHeight');
    letter-spacing: v-bind('localOptions.lg.letterSpacing');
  }

  @media screen and (width <= 1440px) {
    font-size: v-bind('localOptions.md.fontSize');
    font-weight: v-bind('localOptions.md.fontWeight');
    font-style: v-bind('localOptions.md.fontStyle');
    line-height: v-bind('localOptions.md.lineHeight');
    letter-spacing: v-bind('localOptions.md.letterSpacing');
  }

  @media screen and (width <= 1024px) {
    font-size: v-bind('localOptions.sm.fontSize');
    font-weight: v-bind('localOptions.sm.fontWeight');
    font-style: v-bind('localOptions.sm.fontStyle');
    line-height: v-bind('localOptions.sm.lineHeight');
    letter-spacing: v-bind('localOptions.sm.letterSpacing');
  }

  @media screen and (width <= 600px) {
    font-size: v-bind('localOptions.xs.fontSize');
    font-weight: v-bind('localOptions.xs.fontWeight');
    font-style: v-bind('localOptions.xs.fontStyle');
    line-height: v-bind('localOptions.xs.lineHeight');
    letter-spacing: v-bind('localOptions.xs.letterSpacing');
  }
}
</style>
