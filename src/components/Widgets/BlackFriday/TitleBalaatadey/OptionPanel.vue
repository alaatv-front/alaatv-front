<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <q-expansion-item label="image"
                        icon="ph:image">
        <image-widget-option-panel v-model:options="localOptions.imageWidgetOptions" />
      </q-expansion-item>
      <q-expansion-item label="title"
                        icon="ph:pencil">
        <text-option-panel v-model:options="localOptions.titleOptions" />
      </q-expansion-item>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import textOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    textOptionPanel,
    ImageWidgetOptionPanel
  },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
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
        }
      }
    }
  },
  mounted() {
    console.log(this.localOptions)
  }
})
</script>

<style scoped>

</style>
