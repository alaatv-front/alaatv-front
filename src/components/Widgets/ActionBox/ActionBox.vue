<template>
  <div class="action-box-container row items-center"
       :class="localOptions.className"
       :style="localOptions.style">
    <div class="contents-container col-lg-9 col-sm-8 col-xs-12">
      <div class="contents row items-center no-wrap">
        <q-img :src="localOptions.src"
               :width="localOptions.imageWidth"
               :height="localOptions.imageHeight" />
        <span class="text q-ml-md"
              v-html="localOptions.text" />
      </div>
    </div>
    <div class="action-btn col-lg-3 col-sm-4 col-xs-12">
      <action-button v-model:options="localOptions.button" />
    </div>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'
import ActionButton from 'components/Widgets/ActionButton/ActionButton.vue'

export default {
  name: 'ActionBox',
  components: { ActionButton },
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        src: '',
        imageWidth: '50px',
        imageHeight: '50px',
        text: 'متن مورد نظر را وارد کنید ...',
        textOptions: {
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
          }
        },
        button: {
          style: {
            background: '',
            color: ''
          },
          color: null,
          icon: null,
          label: 'button',
          flat: false,
          callBack: null,
          imageSource: null,
          className: null,
          fixed: false,
          fixedPosition: null,
          action: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        },
        style: {
          borderRadius: '15px'
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
.action-box-container {
  padding: 15px 16px;

  .action-btn {
    text-align: right;

    @media screen and (width <= 599px) {
      margin-top: 26px;
      margin-bottom: 4px;
      text-align: center !important;
    }
  }

  .contents-container {
    .contents {
      @media screen and (width <= 599px) {
        place-content: center;
      }
    }

    @media screen and (width <= 599px) {
      margin-top: 26px;
      margin-bottom: 4px;
      text-align: center !important;
    }
  }

  .text {
    line-height: v-bind('localOptions.textOptions.xl.lineHeight');
    color: v-bind('localOptions.textOptions.color');
    font-size: v-bind('localOptions.textOptions.xl.fontSize');
    font-weight: v-bind('localOptions.textOptions.xl.fontWeight');
    font-family: v-bind('localOptions.textOptions.fontFamily');
    font-style: v-bind('localOptions.textOptions.xl.fontStyle');

    @media screen and (width <= 1920px) {
      font-size: v-bind('localOptions.textOptions.lg.fontSize');
      font-weight: v-bind('localOptions.textOptions.lg.fontWeight');
      font-style: v-bind('localOptions.textOptions.lg.fontStyle');
      line-height: v-bind('localOptions.textOptions.lg.lineHeight');
    }

    @media screen and (width <= 1440px) {
      font-size: v-bind('localOptions.textOptions.md.fontSize');
      font-weight: v-bind('localOptions.textOptions.md.fontWeight');
      font-style: v-bind('localOptions.textOptions.md.fontStyle');
      line-height: v-bind('localOptions.textOptions.md.lineHeight');
    }

    @media screen and (width <= 1024px) {
      font-size: v-bind('localOptions.textOptions.sm.fontSize');
      font-weight: v-bind('localOptions.textOptions.sm.fontWeight');
      font-style: v-bind('localOptions.textOptions.sm.fontStyle');
      line-height: v-bind('localOptions.textOptions.sm.lineHeight');
    }

    @media screen and (width <= 600px) {
      font-size: v-bind('localOptions.textOptions.xs.fontSize');
      font-weight: v-bind('localOptions.textOptions.xs.fontWeight');
      font-style: v-bind('localOptions.textOptions.xs.fontStyle');
      line-height: v-bind('localOptions.textOptions.xs.lineHeight');
    }
  }

}
</style>
