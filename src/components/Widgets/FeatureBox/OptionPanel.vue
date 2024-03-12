<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container row q-col-gutter-md">

        <div class="col-12">
          <q-expansion-item expand-separator
                            icon="ph:align-center-horizontal"
                            label="responsive horizontal alignment">
            <responsive-size-tab-panel v-model:size="size">
              <template v-for="sizeItem in sizeOptions"
                        :key="sizeItem"
                        v-slot:[sizeItem]>
                <q-checkbox v-model="localOptions.horizontal[sizeItem]"
                            label="افقی" />
                <q-checkbox v-model="localOptions.horizontalTitle[sizeItem]"
                            label="عنوان افقی" />
              </template>
            </responsive-size-tab-panel>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:images"
                            label="responsive backgrounds">
            <responsive-back-ground v-model:options="localOptions.backgrounds" />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:image"
                            label="image settings">
            <div class="row q-my-md q-col-gutter-md">
              <div class="col-md-2">
                <q-checkbox v-model="localOptions.hasImage"
                            label="عکس" />
              </div>
              <div class="col-md-2">
                <q-checkbox v-model="localOptions.hoverImage"
                            label="hoverImage" />
              </div>
              <div class="col-12">
                <q-separator space />
              </div>
            </div>

            <image-widget-option-panel v-if="localOptions.hasImage"
                                       v-model:options="localOptions.imageWidgetOptions" />
          </q-expansion-item>
          <q-expansion-item icon="title"
                            label="title">
            <q-card>
              <q-card-section>
                <text-option-panel v-model:options="localOptions.titleOptions" />
              </q-card-section>
            </q-card>
          </q-expansion-item>
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
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import textOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ResponsiveSizeTabPanel from 'src/components/WidgetComponents/ResponsiveSizeTabPanel/ResponsiveSizeTabPanel.vue'
import ResponsiveBackGround from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/ResponsiveBackGround/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    textOptionPanel,
    ResponsiveBackGround,
    ImageWidgetOptionPanel,
    ResponsiveSizeTabPanel
  },
  mixins: [PageBuilderOptionPanel],
  data () {
    return {
      themeOptions: ['theme1', 'theme2'],
      size: 'xs',
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
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
  }
})
</script>
