<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container row q-col-gutter-md">
        <div class="col-md-3">
          <q-input v-model="localOptions.width"
                   filled
                   label="عرض" />
        </div>
        <div class="col-md-3">
          <q-input v-model="localOptions.height"
                   filled
                   label="ارتفاع" />
        </div>
        <div class="col-md-2">
          <q-checkbox v-model="localOptions.horizontal"
                      label="افقی" />
        </div>
        <div class="col-md-2">
          <q-checkbox v-model="localOptions.hasImage"
                      label="عکس" />
        </div>
        <div class="col-md-2">
          <q-checkbox v-model="localOptions.hoverImage"
                      label="hoverImage" />
        </div>
        <div class="col-12">
          <q-expansion-item expand-separator
                            icon="image"
                            label="image settings">
            <image-widget-option-panel v-model:options="localOptions.imageWidgetOptions" />
          </q-expansion-item>
        </div>
        <div class="input-container col-md-12">
          <q-expansion-item icon="title"
                            label="title">
            <q-card>
              <q-card-section>
                <text-option-panel v-model:options="localOptions.titleOptions" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
        <div class="input-container col-md-12">
          <q-expansion-item icon="description"
                            label="description">
            <q-card>
              <q-card-section>
                <text-option-panel v-model:options="localOptions.descriptionOptions" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </div>
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
      themeOptions: ['theme1', 'theme2'],
      defaultOptions: {
        width: '100%',
        height: '100%',
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
        horizontal: true,
        theme: 'theme1',
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
})
</script>
