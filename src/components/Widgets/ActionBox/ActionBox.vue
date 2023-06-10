<template>
  <div class="action-box-container row justify-between items-center"
       :class="localOptions.className"
       :style="localOptions.style">
    <div class="col-lg-1 col-md-6 col-xs-2">
      <q-icon :name="localOptions.icon"
              :size="localOptions.iconSize"
              :style="localOptions.iconStyle" />
    </div>
    <div class="text-left col-lg-8 col-xs-10">
      <span class="text"
            v-html="localOptions.text" />
    </div>
    <div class="action-btn col-lg-3 col-xs-12 text-center">
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
        icon: '',
        iconSize: null,
        iconStyle: {
          color: ''
        },
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
  @media screen and (max-width: 1440px) {
    padding: 12px 15px;
  }
  @media screen and (max-width: 1024px) {
    padding: 12px 16px;
  }
  @media screen and (max-width: 600px) {
    .action-btn {
      margin-top: 26px;
      margin-bottom: 4px;
    }
    padding: 12px 12px;
  }
  @media screen and (max-width: 350px) {
    padding: 26px 26px;
  }
  .text {
    line-height: v-bind('localOptions.textOptions.xl.lineHeight');
    color: v-bind('localOptions.textOptions.color');
    font-size: v-bind('localOptions.textOptions.xl.fontSize');
    font-weight: v-bind('localOptions.textOptions.xl.fontWeight');
    font-family: v-bind('localOptions.textOptions.fontFamily');
    font-style: v-bind('localOptions.textOptions.xl.fontStyle');

    @media screen and (max-width: 1920px) {
      font-size: v-bind('localOptions.textOptions.lg.fontSize');
      font-weight: v-bind('localOptions.textOptions.lg.fontWeight');
      font-style: v-bind('localOptions.textOptions.lg.fontStyle');
      line-height: v-bind('localOptions.textOptions.lg.lineHeight');
    }

    @media screen and (max-width: 1440px) {
      font-size: v-bind('localOptions.textOptions.md.fontSize');
      font-weight: v-bind('localOptions.textOptions.md.fontWeight');
      font-style: v-bind('localOptions.textOptions.md.fontStyle');
      line-height: v-bind('localOptions.textOptions.md.lineHeight');
    }

    @media screen and (max-width: 1024px) {
      font-size: v-bind('localOptions.textOptions.sm.fontSize');
      font-weight: v-bind('localOptions.textOptions.sm.fontWeight');
      font-style: v-bind('localOptions.textOptions.sm.fontStyle');
      line-height: v-bind('localOptions.textOptions.sm.lineHeight');
    }

    @media screen and (max-width: 600px) {
      font-size: v-bind('localOptions.textOptions.xs.fontSize');
      font-weight: v-bind('localOptions.textOptions.xs.fontWeight');
      font-style: v-bind('localOptions.textOptions.xs.fontStyle');
      line-height: v-bind('localOptions.textOptions.xs.lineHeight');
    }
  }

}
</style>
