<template>
  <q-card class="feature-card"
          :class="localOptions.className">
    <q-card-section :class="{'feature-horizontal-section': localOptions.horizontal, 'feature-vertical-section': !localOptions.horizontal}"
                    :horizontal="localOptions.horizontal">
      <!--      <image-widget v-if="localOptions.image"-->
      <q-img v-if="localOptions.image"
             :src="localOptions.image"
             :width="localOptions.imageWidth"
             :height="localOptions.imageHeight" />
      <q-card-section>
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
  </q-card>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import textWidget from 'components/Widgets/TextWidget/TextWidget.vue'
// import imageWidget from 'components/Widgets/ImageWidget/ImageWidget.vue'

export default {
  name: 'FeatureBox',
  components: {
    textWidget
    // imageWidget
  },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        title: '',
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
        description: '',
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
        image: null,
        imageWidth: '100px',
        imageHeight: '100px',
        horizontal: true,
        theme: 'theme1',
        borderStyle: {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
$border: v-bind('localOptions.borderStyle.borderCssString');
$borderRadius: v-bind('localOptions.borderStyle.borderRadiusCssString');
.feature-card {
  width: 100%;
  max-width: 100%;
  box-shadow: none;
  -webkit-border-radius: $borderRadius;
  -moz-border-radius: $borderRadius;
  border: $border;
  .feature-horizontal-section {

    .feature-title {
      line-height: v-bind('localOptions.titleOptions.xl.lineHeight');
      color: v-bind('localOptions.titleOptions.color');
      font-size: v-bind('localOptions.titleOptions.xl.fontSize');
      font-weight: v-bind('localOptions.titleOptions.xl.fontWeight');
      font-family: v-bind('localOptions.titleOptions.fontFamily');
      font-style: v-bind('localOptions.titleOptions.xl.fontStyle');

      @media screen and (max-width: 1920px) {
        font-size: v-bind('localOptions.titleOptions.lg.fontSize');
        font-weight: v-bind('localOptions.titleOptions.lg.fontWeight');
        font-style: v-bind('localOptions.titleOptions.lg.fontStyle');
        line-height: v-bind('localOptions.titleOptions.lg.lineHeight');
      }

      @media screen and (max-width: 1440px) {
        font-size: v-bind('localOptions.titleOptions.md.fontSize');
        font-weight: v-bind('localOptions.titleOptions.md.fontWeight');
        font-style: v-bind('localOptions.titleOptions.md.fontStyle');
        line-height: v-bind('localOptions.titleOptions.md.lineHeight');
      }

      @media screen and (max-width: 1024px) {
        font-size: v-bind('localOptions.titleOptions.sm.fontSize');
        font-weight: v-bind('localOptions.titleOptions.sm.fontWeight');
        font-style: v-bind('localOptions.titleOptions.sm.fontStyle');
        line-height: v-bind('localOptions.titleOptions.sm.lineHeight');
      }

      @media screen and (max-width: 600px) {
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

      @media screen and (max-width: 1920px) {
        font-size: v-bind('localOptions.descriptionOptions.lg.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.lg.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.lg.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.lg.lineHeight');
      }

      @media screen and (max-width: 1440px) {
        font-size: v-bind('localOptions.descriptionOptions.md.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.md.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.md.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.md.lineHeight');
      }

      @media screen and (max-width: 1024px) {
        font-size: v-bind('localOptions.descriptionOptions.sm.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.sm.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.sm.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.sm.lineHeight');
      }

      @media screen and (max-width: 600px) {
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

      @media screen and (max-width: 1920px) {
        font-size: v-bind('localOptions.titleOptions.lg.fontSize');
        font-weight: v-bind('localOptions.titleOptions.lg.fontWeight');
        font-style: v-bind('localOptions.titleOptions.lg.fontStyle');
        line-height: v-bind('localOptions.titleOptions.lg.lineHeight');
      }

      @media screen and (max-width: 1440px) {
        font-size: v-bind('localOptions.titleOptions.md.fontSize');
        font-weight: v-bind('localOptions.titleOptions.md.fontWeight');
        font-style: v-bind('localOptions.titleOptions.md.fontStyle');
        line-height: v-bind('localOptions.titleOptions.md.lineHeight');
      }

      @media screen and (max-width: 1024px) {
        font-size: v-bind('localOptions.titleOptions.sm.fontSize');
        font-weight: v-bind('localOptions.titleOptions.sm.fontWeight');
        font-style: v-bind('localOptions.titleOptions.sm.fontStyle');
        line-height: v-bind('localOptions.titleOptions.sm.lineHeight');
      }

      @media screen and (max-width: 600px) {
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

      @media screen and (max-width: 1920px) {
        font-size: v-bind('localOptions.descriptionOptions.lg.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.lg.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.lg.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.lg.lineHeight');
      }

      @media screen and (max-width: 1440px) {
        font-size: v-bind('localOptions.descriptionOptions.md.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.md.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.md.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.md.lineHeight');
      }

      @media screen and (max-width: 1024px) {
        font-size: v-bind('localOptions.descriptionOptions.sm.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.sm.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.sm.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.sm.lineHeight');
      }

      @media screen and (max-width: 600px) {
        font-size: v-bind('localOptions.descriptionOptions.xs.fontSize');
        font-weight: v-bind('localOptions.descriptionOptions.xs.fontWeight');
        font-style: v-bind('localOptions.descriptionOptions.xs.fontStyle');
        line-height: v-bind('localOptions.descriptionOptions.xs.lineHeight');
      }
    }
  }

}
</style>
