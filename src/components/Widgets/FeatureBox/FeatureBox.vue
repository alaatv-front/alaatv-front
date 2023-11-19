<template>
  <q-card class="feature-card"
          :class="[localOptions.className, {'hover-image': localOptions.hoverImage }]"
          :style="localOptions.style">
    <q-card-section v-if="!loading"
                    :class="{'feature-horizontal-section': isHorizontal, 'feature-vertical-section': !isHorizontal}"
                    :horizontal="isHorizontal">
      <q-card-section v-if="localOptions.hasImage"
                      class="feature-section image">
        <image-widget :options="localOptions.imageWidgetOptions" />
      </q-card-section>
      <q-card-section class="feature-section"
                      :class="{'horizontal-title-section': isHorizontalTitle, 'vertical-title-section': !isHorizontalTitle}"
                      :horizontal="isHorizontalTitle">
        <text-widget v-if="localOptions.titleOptions.text"
                     :options="localOptions.titleOptions" />
        <div v-else
             class="feature-title ellipsis">{{ localOptions.title }}</div>
        <text-widget v-if="localOptions.descriptionOptions.text"
                     :options="localOptions.descriptionOptions" />
        <div v-else
             class="feature-description">
          {{ localOptions.description }}
        </div>
      </q-card-section>
    </q-card-section>
    <q-card-section v-else
                    class="feature-section">
      <q-spinner color="primary"
                 size="3em"
                 :thickness="2" />
    </q-card-section>
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import textWidget from 'components/Widgets/TextWidget/TextWidget.vue'
import imageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'

export default {
  name: 'FeatureBox',
  components: {
    textWidget,
    imageWidget
  },
  mixins: [mixinWidget],
  data () {
    return {
      loading: true,
      defaultOptions: {
        titleOptions: {
          text: null,
          color: null,
          fontFamily: null,
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
          }
        },
        descriptionOptions: {
          text: null,
          fontFamily: null,
          color: null,
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
          }
        },
        hasImage: true,
        hoverImage: false,
        imageWidgetOptions: {
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
        },
        horizontal: {
          xl: false,
          lg: false,
          md: false,
          sm: false,
          xs: false
        },
        horizontalTitle: {
          xl: false,
          lg: false,
          md: false,
          sm: false,
          xs: false
        },
        theme: 'theme1',
        backgrounds: {
          xs: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          sm: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          md: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          lg: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          xl: {
            size: null,
            color: null,
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
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
    isHorizontal () {
      return typeof this.localOptions.horizontal === 'boolean' ? this.localOptions.horizontal : this.localOptions.horizontal[this.$q.screen.name]
    },
    isHorizontalTitle () {
      return this.localOptions.horizontalTitle[this.$q.screen.name]
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
    parentComponent () {
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
  mounted () {
    this.loading = false
  }
}
</script>

<style lang="scss" scoped>
@import "quasar-ui-q-page-builder/src/components/Component";

$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
$shadows: v-bind('shadows');
$hoverShadows: v-bind('hoverShadows');
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
$backgrounds: (
    xs: (
        size: v-bind('defaultOptions.backgrounds.xs.size'),
        color: v-bind('defaultOptions.backgrounds.xs.color'),
        image: v-bind('defaultOptions.backgrounds.xs.image'),
        repeat: v-bind('defaultOptions.backgrounds.xs.repeat'),
        position: v-bind('defaultOptions.backgrounds.xs.position'),
        attachment: v-bind('defaultOptions.backgrounds.xs.attachment')
    ),
    sm: (
        size: v-bind('defaultOptions.backgrounds.sm.size'),
        color: v-bind('defaultOptions.backgrounds.sm.color'),
        image: v-bind('defaultOptions.backgrounds.sm.image'),
        repeat: v-bind('defaultOptions.backgrounds.sm.repeat'),
        position: v-bind('defaultOptions.backgrounds.sm.position'),
        attachment: v-bind('defaultOptions.backgrounds.sm.attachment')
    ),
    md: (
        size: v-bind('defaultOptions.backgrounds.md.size'),
        color: v-bind('defaultOptions.backgrounds.md.color'),
        image: v-bind('defaultOptions.backgrounds.md.image'),
        repeat: v-bind('defaultOptions.backgrounds.md.repeat'),
        position: v-bind('defaultOptions.backgrounds.md.position'),
        attachment: v-bind('defaultOptions.backgrounds.md.attachment')
    ),
    lg: (
        size: v-bind('defaultOptions.backgrounds.lg.size'),
        color: v-bind('defaultOptions.backgrounds.lg.color'),
        image: v-bind('defaultOptions.backgrounds.lg.image'),
        repeat: v-bind('defaultOptions.backgrounds.lg.repeat'),
        position: v-bind('defaultOptions.backgrounds.lg.position'),
        attachment: v-bind('defaultOptions.backgrounds.lg.attachment')
    ),
    xl: (
        size: v-bind('defaultOptions.backgrounds.xl.size'),
        color: v-bind('defaultOptions.backgrounds.xl.color'),
        image: v-bind('defaultOptions.backgrounds.xl.image'),
        repeat: v-bind('defaultOptions.backgrounds.xl.repeat'),
        position: v-bind('defaultOptions.backgrounds.xl.position'),
        attachment: v-bind('defaultOptions.backgrounds.xl.attachment')
    )
);
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

.feature-card {
  @include media-query-backgrounds($backgrounds, $sizes);
  @include media-query-spacings($responsiveSpacing, $sizes);

  box-shadow: $shadows;
  border-radius: $borderRadius;
  border: $border;

  &:hover {
    &.hover-image {
      .image{
        transform: rotate(calc(#{$rotate} * 1deg)) translate(calc(#{$translateX} * 1px), calc(#{$translateY} * 1px)) scale($scaleX, $scaleY) skew(calc(#{$skewX} * 1deg), calc(#{$skewY} * 1deg));
        transition: all calc(#{$transitionTime} * 1s);
        box-shadow: $hoverShadows;
        border-radius: $hoverBorderRadius;
        border: $hoverBorder;
      }
    }
  }

  .feature-section {
    padding: 0;

    &.horizontal-title-section {
      justify-content: center;
    }

    &.image{
      transition: all calc(#{$transitionTime} * 1s);
    }
  }

  .feature-horizontal-section {
    .feature-title {
      line-height: v-bind('localOptions.titleOptions.xl.lineHeight');
      color: v-bind('localOptions.titleOptions.color');
      font-size: v-bind('localOptions.titleOptions.xl.fontSize');
      font-weight: v-bind('localOptions.titleOptions.xl.fontWeight');
      font-family: v-bind('localOptions.titleOptions.fontFamily');
      font-style: v-bind('localOptions.titleOptions.xl.fontStyle');

      @media screen and (width <= 1920px) {
        font-size: v-bind('localOptions.titleOptions.lg.fontSize');
        font-weight: v-bind('localOptions.titleOptions.lg.fontWeight');
        font-style: v-bind('localOptions.titleOptions.lg.fontStyle');
        line-height: v-bind('localOptions.titleOptions.lg.lineHeight');
      }

      @media screen and (width <= 1440px) {
        font-size: v-bind('localOptions.titleOptions.md.fontSize');
        font-weight: v-bind('localOptions.titleOptions.md.fontWeight');
        font-style: v-bind('localOptions.titleOptions.md.fontStyle');
        line-height: v-bind('localOptions.titleOptions.md.lineHeight');
      }

      @media screen and (width <= 1024px) {
        font-size: v-bind('localOptions.titleOptions.sm.fontSize');
        font-weight: v-bind('localOptions.titleOptions.sm.fontWeight');
        font-style: v-bind('localOptions.titleOptions.sm.fontStyle');
        line-height: v-bind('localOptions.titleOptions.sm.lineHeight');
      }

      @media screen and (width <= 600px) {
        font-size: v-bind('localOptions.titleOptions.xs.fontSize');
        font-weight: v-bind('localOptions.titleOptions.xs.fontWeight');
        font-style: v-bind('localOptions.titleOptions.xs.fontStyle');
        line-height: v-bind('localOptions.titleOptions.xs.lineHeight');
      }
    }

    .feature-description {
      max-width: 300px;
      line-height: v-bind('localOptions.descriptionOptions.xl.lineHeight');
      color: v-bind('localOptions.descriptionOptions.color');
      font-size: v-bind('localOptions.descriptionOptions.xl.fontSize');
      font-weight: v-bind('localOptions.descriptionOptions.xl.fontWeight');
      font-family: v-bind('localOptions.descriptionOptions.fontFamily');
      font-style: v-bind('localOptions.descriptionOptions.xl.fontStyle');

      @media screen and (width <= 1920px) {
        font-size: v-bind('localOptions.descriptionOptions.lg.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.lg.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.lg.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.lg.lineHeight');
      }

      @media screen and (width <= 1440px) {
        font-size: v-bind('localOptions.descriptionOptions.md.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.md.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.md.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.md.lineHeight');
      }

      @media screen and (width <= 1024px) {
        font-size: v-bind('localOptions.descriptionOptions.sm.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.sm.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.sm.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.sm.lineHeight');
      }

      @media screen and (width <= 600px) {
        font-size: v-bind('localOptions.descriptionOptions.xs.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.xs.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.xs.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.xs.lineHeight');
      }
    }
  }

  .feature-vertical-section {
    text-align-last: center;

    .feature-title {
      text-align: center;
      line-height: v-bind('localOptions.titleOptions.xl.lineHeight');
      color: v-bind('localOptions.titleOptions.color');
      font-size: v-bind('localOptions.titleOptions.xl.fontSize');
      font-weight: v-bind('localOptions.titleOptions.xl.fontWeight');
      font-family: v-bind('localOptions.titleOptions.fontFamily');
      font-style: v-bind('localOptions.titleOptions.xl.fontStyle');

      @media screen and (width <= 1920px) {
        font-size: v-bind('localOptions.titleOptions.lg.fontSize');
        font-weight: v-bind('localOptions.titleOptions.lg.fontWeight');
        font-style: v-bind('localOptions.titleOptions.lg.fontStyle');
        line-height: v-bind('localOptions.titleOptions.lg.lineHeight');
      }

      @media screen and (width <= 1440px) {
        font-size: v-bind('localOptions.titleOptions.md.fontSize');
        font-weight: v-bind('localOptions.titleOptions.md.fontWeight');
        font-style: v-bind('localOptions.titleOptions.md.fontStyle');
        line-height: v-bind('localOptions.titleOptions.md.lineHeight');
      }

      @media screen and (width <= 1024px) {
        font-size: v-bind('localOptions.titleOptions.sm.fontSize');
        font-weight: v-bind('localOptions.titleOptions.sm.fontWeight');
        font-style: v-bind('localOptions.titleOptions.sm.fontStyle');
        line-height: v-bind('localOptions.titleOptions.sm.lineHeight');
      }

      @media screen and (width <= 600px) {
        font-size: v-bind('localOptions.titleOptions.xs.fontSize');
        font-weight: v-bind('localOptions.titleOptions.xs.fontWeight');
        font-style: v-bind('localOptions.titleOptions.xs.fontStyle');
        line-height: v-bind('localOptions.titleOptions.xs.lineHeight');
      }
    }

    .feature-description {
      text-align: center;
      line-height: v-bind('localOptions.descriptionOptions.xl.lineHeight');
      color: v-bind('localOptions.descriptionOptions.color');
      font-size: v-bind('localOptions.descriptionOptions.xl.fontSize');
      font-weight: v-bind('localOptions.descriptionOptions.xl.fontWeight');
      font-family: v-bind('localOptions.descriptionOptions.fontFamily');
      font-style: v-bind('localOptions.descriptionOptions.xl.fontStyle');

      @media screen and (width <= 1920px) {
        font-size: v-bind('localOptions.descriptionOptions.lg.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.lg.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.lg.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.lg.lineHeight');
      }

      @media screen and (width <= 1440px) {
        font-size: v-bind('localOptions.descriptionOptions.md.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.md.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.md.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.md.lineHeight');
      }

      @media screen and (width <= 1024px) {
        font-size: v-bind('localOptions.descriptionOptions.sm.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.sm.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.sm.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.sm.lineHeight');
      }

      @media screen and (width <= 600px) {
        font-size: v-bind('localOptions.descriptionOptions.xs.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.xs.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.xs.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.xs.lineHeight');
      }
    }
  }

}
</style>
