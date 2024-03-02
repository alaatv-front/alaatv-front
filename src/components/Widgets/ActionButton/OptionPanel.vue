<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-responsive-spacing="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-col-gutter-md">
          <div class="col-md-6">
            <q-input v-model="localOptions.label"
                     label="label" />
          </div>
          <div class="col-md-3">
            <q-input v-model="localOptions.icon"
                     label="icon name" />
            <a href="/document/phosphor-icons"
               target="_blank">
              view icons
            </a>
          </div>
          <div class="col-md-3">
            <q-input v-model="localOptions.borderRadius"
                     label="border radius" />
          </div>
          <div class="col-xs-12">
            <q-checkbox v-model="localOptions.flat"
                        label="flat" />
            <q-checkbox v-model="localOptions.outline"
                        label="outline" />
            <q-checkbox v-model="localOptions.rightIcon"
                        label="right icon" />
            <q-checkbox v-model="localOptions.profileMode"
                        label="profile mode" />
          </div>
          <div class="col-md-6">
            <div class="col-md-12">
              <q-input v-model="localOptions.style.color"
                       label="text color">
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
          <div v-if="!localOptions.flat"
               class="col-md-6">
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
          <div class="col-md-12">
            <image-upload-input v-model:value ="localOptions.imageSource"
                                label="background image" />
          </div>
          <div class="col-xs-12">
            <q-separator class="q-my-sm" />
            <q-checkbox v-model="localOptions.showSeparator"
                        label="show separator" />
            <div v-if="localOptions.showSeparator">
              <q-expansion-item label="separator"
                                icon="ph:wrench">
                <separator-option-panel v-model:options="localOptions.separator" />
              </q-expansion-item>
            </div>
          </div>
          <div class="col-xs-12">
            <q-separator class="q-my-sm" />
            <div class="row q-col-gutter-md">
              <div class="col-md-3">
                <q-checkbox v-model="localOptions.fixed"
                            label="fix" />
              </div>
              <div v-if="localOptions.fixed"
                   class="col-md-9">
                <q-select v-model="localOptions.fixedPosition"
                          :options="positionOptions"
                          label="fixed position" />
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <q-separator class="q-my-sm" />
            <div class="row q-col-gutter-md">
              <div class="col-md-3">
                <q-checkbox v-model="localOptions.displayAuth"
                            label="display Auth" />
              </div>
              <div v-if="localOptions.displayAuth"
                   class="col-md-9">
                <q-btn-toggle v-model="localOptions.showInAuth"
                              color="grey-4"
                              text-color="black"
                              toggle-color="primary"
                              rounded
                              unelevated
                              :options="displayAuthOptions"
                              left-label />
              </div>
            </div>
          </div>
          <div class="col-xs-12">
            <q-separator class="q-my-sm" />
            <div>
              <q-checkbox v-model="hasHamburgerMenu"
                          label="hasHamburgerMenu" />
            </div>
            <div v-if="localOptions.action === 'hamburger_menu'"
                 class="q-mt-md">
              <div class="row q-col-gutter-md">
                <div class="col-md-4">
                  <q-input v-model="localOptions.drawer.style.backgroundColor"
                           icon="colorize"
                           label="background color">
                    <template v-slot:append>
                      <q-icon name="colorize"
                              class="cursor-pointer">
                        <q-popup-proxy cover
                                       transition-show="scale"
                                       transition-hide="scale">
                          <q-color v-model="localOptions.drawer.style.backgroundColor"
                                   label="backgroundColor"
                                   format-model="rgba" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                <div class="col-md-4">
                  <q-input v-model="localOptions.drawer.width"
                           type="number"
                           label="width(px)" />
                </div>
                <div class="col-md-4">
                  <q-checkbox v-model="localOptions.drawer.bordered"
                              label="bordered" />
                  <br>
                  <q-checkbox v-model="localOptions.drawer.overlay"
                              label="overlay" />
                </div>
              </div>
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
                        <q-btn icon="ph:plus-circle"
                               class="full-width"
                               color="positive"
                               label="text"
                               @click="addTextWidget('topSectionWidgets')" />
                      </div>
                      <div>
                        <q-btn icon="ph:plus-circle"
                               class="full-width"
                               color="positive"
                               label="image"
                               @click="addImageWidget('topSectionWidgets')" />
                      </div>
                      <div>
                        <q-btn icon="ph:plus-circle"
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
            <action-options v-else
                            v-model:action="localOptions.action"
                            v-model:scroll-to="localOptions.scrollTo"
                            v-model:link="localOptions.route"
                            v-model:event-name="localOptions.eventName"
                            v-model:event-args="localOptions.eventArgs" />
          </div>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import ImageUploadInput from 'components/Utils/ImageUploadInput.vue'
import TimerOptionPanel from 'src/components/Widgets/Timer/OptionPanel.vue'
import SeparatorOptionPanel from 'src/components/Widgets/Separator/OptionPanel.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'src/components/Widgets/ImageWidget/OptionPanel.vue'
import ActionOptions from 'src/components/WidgetComponents/ActionOptions/ActionOptions.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    ImageUploadInput,
    ActionOptions,
    OptionPanelTabs,
    TimerOptionPanel,
    SeparatorOptionPanel,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel
  },
  mixins: [mixinOptionPanel],
  props: {
    options: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      hasHamburgerMenu: false,
      displayAuthOptions: [
        {
          label: 'نمایش در حالت لاگین',
          value: true
        },
        {
          label: 'عدم نمایش در حالت لاگین',
          value: false
        }
      ],
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
        showSeparator: false,
        displayAuth: false,
        outline: false,
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
        profileMode: false,
        drawer: {
          style: {},
          overlay: true,
          bordered: true,
          width: 200,
          breakpoint: 500
        },
        topSectionWidgets: [],
        bottomSectionWidgets: [],
        borderStyle: {
          borderCssString: '',
          borderRadiusCssString: ''
        }
      }
    }
  },
  computed: {
    localOptionsAction () {
      return this.localOptions.action
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
    localOptionsAction (newValue) {
      this.hasHamburgerMenu = (newValue === 'hamburger_menu')
    },
    hasHamburgerMenu (newValue) {
      if (!newValue) {
        this.localOptions.action = 'link'
        return
      }

      this.localOptions.action = 'hamburger_menu'
    },
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    deleteWidget (sectionName, index) {
      this.localOptions[sectionName].splice(index, 1)
    },
    addTextWidget (sectionName) {
      this.localOptions[sectionName].push(this.defaultTextWidget)
    },
    addImageWidget (sectionName) {
      this.localOptions[sectionName].push(this.defaultImageWidget)
    },
    addActionButtonWidget (sectionName) {
      this.localOptions[sectionName].push(this.defaultActionButtonWidget)
    },
    addTimerWidget (sectionName) {
      this.localOptions[sectionName].push(this.defaultTimerWidget)
    }
  }
})
</script>
