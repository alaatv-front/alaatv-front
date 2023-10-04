<template>
  <div class="expansion-container"
       :style="localOptions.style"
       :class="localOptions.className">
    <q-expansion-item v-for="(item, index) in localOptions.expansionList"
                      :key="index"
                      v-model="item.expanded"
                      :expand-separator="localOptions.expandSeparator"
                      :icon="item.icon"
                      :label="item.label"
                      :caption="item.caption"
                      :expand-icon-class="localOptions.expandIconClass"
                      :hide-expand-icon="localOptions.theme === 'theme2'"
                      header-class="expand-header"
                      @update:model-value="toggleExpand(index)">
      <template v-if="localOptions.theme === 'theme2'"
                v-slot:header="{ expanded }">
        <q-item clickable
                class="expand-header theme-2"
                @click="headerClick($event)">
          <q-item-section>
            <div class="row">
              <div class="col-12">
                <q-item-label>{{ item.label }}</q-item-label>
                <q-item-label caption>{{ item.caption }}</q-item-label>
              </div>
              <div class="col-9" />
              <div class="col-3">
                <q-btn v-if="!expanded"
                       class="open-btn"
                       color="primary"
                       flat
                       label="اطلاعات بیشتر"
                       @click="openExpand(index)" />
              </div>
            </div>
          </q-item-section>
        </q-item>
      </template>
      <q-separator v-if="localOptions.hasContentSeparator"
                   class="content-separator"
                   :size="localOptions.contentSeparator.size"
                   :color="localOptions.contentSeparator.color" />
      <span class="text"
            v-html="item.text" />
      <div v-if="localOptions.theme === 'theme2'"
           class="theme-action-btn">
        <q-btn color="primary"
               class="close-btn"
               flat
               label="بستن"
               @click="closeExpand(index)" />
      </div>
    </q-expansion-item>
  </div>
</template>

<script>
import { mixinWidget } from 'src/mixin/Mixins.js'

export default {
  name: 'ExpansionPanel',
  mixins: [mixinWidget],
  data() {
    return {
      defaultOptions: {
        expansionList: [],
        expandIconClass: null,
        theme: null,
        dense: false,
        expandSeparator: true,
        expandItemBackground: 'transparent',
        expandItemMargin: 0,
        expandItemRadius: 0,
        expandItemContentPadding: 0,
        marginBottom: '100px',
        headerPadding: '15px',
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        hasContentSeparator: false,
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
        },
        contentSeparator: {
          marginTop: 0,
          marginBottom: 0,
          color: '#424242',
          size: '1px'
        },
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
      }
    }
  },
  computed: {
    computedMargin() {
      return this.localOptions.dense ? '5px' : this.localOptions.marginBottom
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
    }
  },
  methods: {
    toggleExpand(ItemIndex) {
      if (this.localOptions.toggle) {
        this.localOptions.expansionList.filter((item, index) => index !== ItemIndex).map(item => {
          item.expanded = false
          return item
        })
      }
    },
    closeExpand(ItemIndex) {
      this.localOptions.expansionList.filter((item, index) => index === ItemIndex).map(item => {
        item.expanded = false
        return item
      })
    },
    openExpand(ItemIndex) {
      this.localOptions.expansionList
        .filter((item, index) => index === ItemIndex).map(item => {
          item.expanded = true
          return item
        })
      this.toggleExpand(ItemIndex)
    },
    headerClick(event) {
      event.stopPropagation()
    }
  }
}
</script>

<style lang="scss" scoped>
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

.expansion-container {
  &:deep(.q-expansion-item) {
    background: v-bind('localOptions.expandItemBackground');
    margin-bottom: v-bind('localOptions.expandItemMargin');

    box-shadow: $shadows;
    -webkit-box-shadow: $shadows;
    -moz-box-shadow: $shadows;
    -webkit-border-radius: $borderRadius;
    -moz-border-radius: $borderRadius;
    border: $border;
    border-radius:  v-bind('localOptions.expandItemRadius');
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
  }
  &:deep(.q-expansion-item__content) {
    padding:  v-bind('localOptions.expandItemContentPadding');
  }
  &:deep(.q-item__label) {
    font-size: 16px
  }

  &:deep(.q-item .q-focus-helper) {
    display: none;
  }

  &:deep(.q-item) {
    padding: v-bind('localOptions.headerPadding');
  }
  .expand-header {
    width:100%;

    &.theme-2 {

      @media screen and (max-width: 600px) {
        display: flex;
        flex-direction: column;
      }
    }
  }

  .content-separator {
    margin-top: v-bind('localOptions.contentSeparator.marginTop');
    margin-bottom: v-bind('localOptions.contentSeparator.marginBottom');
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
  .theme-action-btn {
    display: flex;
    justify-content: flex-end;

    :deep(.q-btn.close-btn .q-focus-helper) {
      display: none;
    }

    .open-btn {
      margin-top: v-bind('computedMargin');

      @media screen and (max-width: 600px) {
        margin-top: 10px;
      }
    }

    .close-btn {
      padding: 0 50px;
    }
  }
}
</style>
