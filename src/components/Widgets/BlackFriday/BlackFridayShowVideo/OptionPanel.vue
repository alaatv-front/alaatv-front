<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-col-gutter-sm">
          <div class="input-container col-md-10">
            <q-input v-model="localOptions.scrollTo"
                     label="scrollTo" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'components/Widgets/ImageWidget/OptionPanel.vue'
import TimerOptionPanel from 'components/Widgets/Timer/OptionPanel.vue'
import SeparatorOptionPanel from 'components/Widgets/Separator/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel,
    TimerOptionPanel,
    SeparatorOptionPanel
  },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data () {
    return {
      actionOptions: ['scroll', 'link', 'event', 'hamburger_menu'],
      positionOptions: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      defaultTextWidget: {
        name: 'TextWidget',
        options: {
          text: 'text',
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
        }
      },
      defaultImageWidget: {
        name: 'imageWidget',
        options: {
          imageSource: '',
          ratio: null,
          hasAction: false,
          useAEEEvent: false,
          AEEEventBody: {
            id: '-',
            name: '-',
            creative: null,
            position: null
          },
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
            src: ''
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
            src: ''
          },
          borderStyle: {},
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
      },
      defaultActionButtonWidget: {
        name: 'ActionButton',
        options: {
          color: null,
          icon: null,
          label: null,
          flat: false,
          callBack: null,
          imageSource: null,
          className: null,
          fixed: false,
          fixedPosition: null,
          eventArgs: null,
          hasAction: true,
          action: null,
          scrollTo: null,
          route: null,
          eventName: null
        }
      },
      defaultOptions: {
        color: null,
        icon: null,
        rightIcon: false,
        label: null,
        flat: false,
        callBack: null,
        imageSource: null,
        className: null,
        fixed: false,
        fixedPosition: null,
        eventArgs: null,
        boxShadows: [],
        hasAction: true,
        action: null,
        scrollTo: null,
        route: null,
        eventName: null,
        topSectionWidgets: [],
        bottomSectionWidgets: []
      }
    }
  },
  watch: {
    'localOptions.flat': function (val) {
      if (val) {
        this.localOptions.style.background = ''
      }
    },
    'localOptions.fixed': function (val) {
      if (!val) {
        this.localOptions.fixedPosition = null
      }
    },
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    deleteWidget(sectionName, index) {
      this.localOptions[sectionName].splice(index, 1)
    },
    addTextWidget(sectionName) {
      this.localOptions[sectionName].push(this.defaultTextWidget)
    },
    addImageWidget(sectionName) {
      this.localOptions[sectionName].push(this.defaultImageWidget)
    },
    addActionButtonWidget(sectionName) {
      this.localOptions[sectionName].push(this.defaultActionButtonWidget)
    },
    addTimerWidget(sectionName) {
      this.localOptions[sectionName].push(this.defaultTimerWidget)
    }
  }
})
</script>
