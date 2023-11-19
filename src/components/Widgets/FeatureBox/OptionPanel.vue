<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container row q-col-gutter-md">
        <div class="col-md-2">
          <q-select v-model="size"
                    :options="sizeOptions"
                    label="سایز" />
        </div>
        <div class="col-md-2">
          <q-checkbox v-model="localOptions.horizontal[size]"
                      label="افقی" />
        </div>
        <div class="col-md-2">
          <q-checkbox v-model="localOptions.horizontalTitle[size]"
                      label="عنوان افقی" />
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
                            label="backgrounds">
            <responsive-back-ground v-model:options="localOptions.backgrounds" />
          </q-expansion-item>
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
import ResponsiveBackGround from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/ResponsiveBackGround/ResponsiveBackGround.vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import textOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    textOptionPanel,
    ImageWidgetOptionPanel,
    ResponsiveBackGround
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
