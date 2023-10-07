<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-gutter-sm">
          <div class="input-container col-md-2">
            <div class="outsideLabel">label</div>
            <q-input v-model="localOptions.label"
                     label="label" />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">icon name</div>
            <q-input v-model="localOptions.icon"
                     label="icon name" />
          </div>
          <div v-if="!localOptions.flat"
               class="col-md-5 row">
            <div class="input-container col-md-6">
              <div class="outsideLabel">background color</div>
              <q-input v-model="localOptions.style.background"
                       icon="colorize"
                       label="background color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.background"
                               label="backgroundColor"
                               format-model="rgba" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="input-container col-md-5 q-mx-sm">
              <div class="outsideLabel">color</div>
              <q-input v-model="localOptions.style.color"
                       label="color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.color"
                               label="backgroundColor"
                               format-model="rgba" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div v-else
               class="col-md-4">
            <div class="input-container col-md-12">
              <div class="outsideLabel">color</div>
              <q-input v-model="localOptions.style.color"
                       label="color">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.style.color"
                               label="backgroundColor"
                               format-model="rgba" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">border radius</div>
            <q-input v-model="localOptions.borderRadius"
                     label="border radius" />
          </div>
          <div class="input-container col-md-1">
            <div class="outsideLabel">flat</div>
            <q-checkbox v-model="localOptions.flat"
                        left-label />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">fix</div>
            <q-checkbox v-model="localOptions.fixed"
                        left-label />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">hideInAuth</div>
            <q-checkbox v-model="localOptions.hideInAuth"
                        left-label />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">show separator</div>
            <q-checkbox v-model="localOptions.showSeparator"
                        left-label />
          </div>
          <div class="input-container col-md-2">
            <div class="outsideLabel">right icon</div>
            <q-checkbox v-model="localOptions.rightIcon" />
          </div>
          <div class="input-container col-md-4">
            <div class="outsideLabel">flat</div>
            <q-select v-model="localOptions.fixedPosition"
                      :options="positionOptions"
                      left-label />
          </div>
        </div>
        <div class="input-container q-my-md">
          <div class="outsideLabel">image source</div>
          <q-input v-model="localOptions.imageSource"
                   label="image source" />
        </div>
        <div v-if="localOptions.hasAction"
             class="row q-col-gutter-sm">
          <div class="input-container col-md-2">
            <div class="outsideLabel">action</div>
            <q-select v-model="localOptions.action"
                      :options="actionOptions" />
          </div>
          <div v-if="localOptions.action === 'scroll'"
               class="input-container col-md-10">
            <div class="outsideLabel">scrollTo</div>
            <q-input v-model="localOptions.scrollTo"
                     label="scrollTo" />
          </div>
          <div v-if="localOptions.action === 'link'"
               class="input-container col-md-10">
            <div class="outsideLabel">route</div>
            <q-input v-model="localOptions.route"
                     label="route" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventName</div>
            <q-input v-model="localOptions.eventName"
                     label="eventName" />
          </div>
          <div v-if="localOptions.action === 'event'"
               class="input-container col-md-5">
            <div class="outsideLabel">eventArgs</div>
            <q-input v-model="localOptions.eventArgs"
                     label="eventArgs" />
          </div>
          <div v-if="localOptions.action === 'hamburger_menu'"
               class="input-container col-md-12">
            <q-expansion-item label="topWidgets">
              <q-card>
                <q-card-section v-for="(widget, index) in localOptions.topSectionWidgets"
                                :key="index">
                  <q-expansion-item :label=widget.name
                                    icon="build">
                    <template v-slot:header>
                      <q-item-section avatar>
                        <q-icon name="build" />
                      </q-item-section>

                      <q-item-section>
                        {{ widget.name }}
                      </q-item-section>

                      <q-item-section side>
                        <q-btn color="negative"
                               flat
                               icon="delete"
                               @click="deleteWidget('topSectionWidgets', index)" />
                      </q-item-section>
                    </template>
                    <q-card>
                      <q-card-section>
                        <option-panel v-if="widget.name === 'ActionButton'"
                                      v-model:options="widget.options" />
                        <component :is="widget.name.concat('OptionPanel')"
                                   v-model:options="widget.options" />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-card-section>
                <q-card-section>
                  <div class="row q-col-gutter-md">
                    <div>
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="text"
                             @click="addTextWidget('topSectionWidgets')" />
                    </div>
                    <div>
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="image"
                             @click="addImageWidget('topSectionWidgets')" />
                    </div>
                    <div>
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="action button"
                             @click="addActionButtonWidget('topSectionWidgets')" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
            <q-expansion-item label="bottomWidgets">
              <q-card>
                <q-card-section v-for="(widget, index) in localOptions.bottomSectionWidgets"
                                :key="index">
                  <q-expansion-item :label=widget.name
                                    icon="build">
                    <template v-slot:header>
                      <q-item-section avatar>
                        <q-icon name="build" />
                      </q-item-section>

                      <q-item-section>
                        {{ widget.name }}
                      </q-item-section>

                      <q-item-section side>
                        <q-btn color="negative"
                               flat
                               icon="delete"
                               @click="deleteWidget('bottomSectionWidgets', index)" />
                      </q-item-section>
                    </template>
                    <q-card>
                      <q-card-section>
                        <component :is="widget.name.concat('OptionPanel')"
                                   v-model:options="widget.options" />
                      </q-card-section>
                    </q-card>
                  </q-expansion-item>
                </q-card-section>
                <q-card-section>
                  <div class="row q-col-gutter-md">
                    <div class="col-3">
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="text"
                             @click="addTextWidget('bottomSectionWidgets')" />
                    </div>
                    <div class="col-3">
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="image"
                             @click="addImageWidget('bottomSectionWidgets')" />
                    </div>
                    <div class="col-3">
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="action button"
                             @click="addActionButtonWidget('bottomSectionWidgets')" />
                    </div>
                    <div class="col-3">
                      <q-btn icon="isax:add"
                             class="full-width"
                             color="positive"
                             label="timer"
                             @click="addTimerWidget('bottomSectionWidgets')" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </q-expansion-item>
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

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel,
    TimerOptionPanel
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
