<template>
  <div>
    <option-panel-tabs v-model:options="localOptions">
      <template #main-tab>
        <div class="option-panel-container q-my-xs">
          <q-expansion-item expand-separator
                            icon="ph:cube"
                            label="Widget Lists">
            <div class="row items-center text-center q-my-sm">
              <div class="col-12">
                <q-tabs v-model="size">
                  <q-tab v-for="(sizeItem, index) in sizeOptions"
                         :key="index"
                         :name="sizeItem"
                         :label="sizeItem" />
                </q-tabs>
              </div>
              <div class="col-12">
                <q-tab-panels v-model="size"
                              animated>
                  <q-tab-panel v-for="(sizeItem, index) in sizeOptions"
                               :key="index"
                               :name="sizeItem.value">
                    <div class="row q-col-gutter-md">
                      <div class="col-12 col-md-6">
                        <q-input v-model="localOptions.breakpoints[size].itemsToShow"
                                 type="number"
                                 :label="`itemsToShow-${sizeItem.label}`" />
                      </div>
                      <div class="col-12 col-md-6">
                        <q-select v-model="localOptions.breakpoints[size].snapAlign"
                                  :options="snapAlignOptions"
                                  :label="`snapAlign-${sizeItem.label}`" />
                      </div>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
              <div class="col-12">
                <q-tab-panels v-model="size"
                              animated>
                  <q-tab-panel v-for="(sizeItem, index) in sizeOptions"
                               :key="index"
                               :name="sizeItem">
                    <div class="row q-col-gutter-md">
                      <div class="col-12">
                        <q-expansion-item :label="'rightWidgets'">
                          <template v-if="localOptions[size].rightSectionWidgets.length > 0">
                            <q-expansion-item v-for="(widget, index) in localOptions[size].rightSectionWidgets"
                                              :key="index"
                                              :label=widget.name
                                              icon="build"
                                              class="q-my-xs">
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
                                         square
                                         icon="delete"
                                         @click="deleteWidget('rightSectionWidgets', index)" />
                                </q-item-section>
                              </template>
                              <component :is="widget.name.concat('OptionPanel')"
                                         v-model:options="widget.options" />
                            </q-expansion-item>
                          </template>
                          <div class="row q-my-sm q-col-gutter-md">
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="text"
                                     @click="addTextWidget('rightSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="image"
                                     @click="addImageWidget('rightSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="action button"
                                     @click="addActionButtonWidget('rightSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="timer"
                                     @click="addTimerWidget('rightSectionWidgets')" />
                            </div>
                          </div>
                        </q-expansion-item>
                        <q-expansion-item :label="'centerWidgets'">
                          <template v-if="localOptions[size].centerSectionWidgets.length > 0">
                            <q-expansion-item v-for="(widget, index) in localOptions[size].centerSectionWidgets"
                                              :key="index"
                                              :label=widget.name
                                              icon="build"
                                              class="q-my-xs">
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
                                         @click="deleteWidget('centerSectionWidgets', index)" />
                                </q-item-section>
                              </template>
                              <q-card>
                                <q-card-section>
                                  <component :is="widget.name.concat('OptionPanel')"
                                             v-model:options="widget.options" />
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                          </template>
                          <div class="row q-my-sm q-col-gutter-md">
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="text"
                                     @click="addTextWidget('centerSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="image"
                                     @click="addImageWidget('centerSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="action button"
                                     @click="addActionButtonWidget('centerSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="timer"
                                     @click="addTimerWidget('centerSectionWidgets')" />
                            </div>
                          </div>
                        </q-expansion-item>
                        <q-expansion-item :label="'leftWidgets'">
                          <template v-if="localOptions[size].leftSectionWidgets.length > 0">
                            <q-expansion-item v-for="(widget, index) in localOptions[size].leftSectionWidgets"
                                              :key="index"
                                              :label=widget.name
                                              icon="build"
                                              class="q-my-xs">
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
                                         @click="deleteWidget('leftSectionWidgets', index)" />
                                </q-item-section>
                              </template>
                              <q-card>
                                <q-card-section>
                                  <component :is="widget.name.concat('OptionPanel')"
                                             v-model:options="widget.options" />
                                </q-card-section>
                              </q-card>
                            </q-expansion-item>
                          </template>
                          <div class="row q-my-sm q-col-gutter-md">
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="text"
                                     @click="addTextWidget('leftSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="image"
                                     @click="addImageWidget('leftSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="action button"
                                     @click="addActionButtonWidget('leftSectionWidgets')" />
                            </div>
                            <div class="col-3">
                              <q-btn icon="isax:add"
                                     class="full-width"
                                     color="positive"
                                     label="timer"
                                     @click="addTimerWidget('leftSectionWidgets')" />
                            </div>
                          </div>
                        </q-expansion-item>
                      </div>
                    </div>
                  </q-tab-panel>
                </q-tab-panels>
              </div>
            </div>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:image-square"
                            label="backgrounds">
            <responsive-back-ground v-model:options="localOptions.backgrounds" />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:align-top-simple"
                            label="Sticky Settings">
            <div class="row q-my-md">
              <div class="col-2">
                <q-checkbox v-model="localOptions.sticky"
                            label="sticky" />
              </div>
              <div class="col-10">
                <q-input v-model="localOptions.stickyClass"
                         label="کلاس المان مورد نظر" />
              </div>
            </div>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:app-store-logo"
                            label="Logo Settings">
            <div class="input-container q-py-md">
              <q-input v-model="localOptions.logoImage"
                       label="لینک لوگو" />
            </div>
            <div class="input-container q-py-md">
              <q-input v-model="localOptions.logoSlogan"
                       label="logoSlogan" />
            </div>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="ph:mouse"
                            label="Action Settings">
            <div class="row q-col-gutter-md">
              <div class="input-container col-md-2">
                <q-checkbox v-model="localOptions.hasAction"
                            label="hasAction" />
              </div>
              <div v-if="localOptions.hasAction"
                   class="col-md-10">
                <div class="row q-col-gutter-md">
                  <div class="input-container col-md-3 q-py-md">
                    <q-select v-model="localOptions.actionObject.type"
                              label="type"
                              :options="actionObjectTypeOptions" />
                  </div>
                  <div class="input-container col-md-3 q-py-md">
                    <q-input v-model="localOptions.actionObject.buttonLabel"
                             label="buttonLabel" />
                  </div>
                  <div v-if="localOptions.actionObject.type === 'scroll'"
                       class="input-container col-md-3 q-py-md">
                    <q-input v-model="localOptions.actionObject.scrollTo"
                             label="scrollTo" />
                  </div>
                  <div v-if="localOptions.actionObject.type === 'link'"
                       class="input-container col-md-3 q-py-md">
                    <q-input v-model="localOptions.actionObject.route"
                             label="route" />
                  </div>
                  <div v-if="localOptions.actionObject.type === 'event'"
                       class="input-container col-md-3 q-py-md">
                    <q-input v-model="localOptions.actionObject.eventName"
                             label="eventName" />
                  </div>
                  <div v-if="localOptions.actionObject.type === 'event'"
                       class="input-container col-md-3 q-py-md">
                    <q-input v-model="localOptions.actionObject.eventArgs"
                             label="eventArgs" />
                  </div>
                </div>
              </div>
            </div>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="perm_identity"
                            label="Menu Items">
            <template v-if="localOptions.menuLink.length > 0">
              <q-expansion-item v-for="(item, index) in localOptions.menuLink"
                                :key="index"
                                expand-separator>
                <template v-slot:header>
                  <div class="row full-width">
                    <div class="col-1 ">
                      <q-btn color="negative"
                             icon="close"
                             square
                             class=" size-md q-mr-sm"
                             @click="removeItem(index)">
                        <q-tooltip>
                          حذف لینک
                        </q-tooltip>
                      </q-btn>
                    </div>
                    <div class="col-10">
                      <q-input v-model="item.label"
                               label="عنوان" />
                    </div>
                  </div>
                </template>
                <div class="text">
                  <div class="input-container q-py-md">
                    <div>نوع آیتم انتخاب کنید:</div>
                    <q-radio v-model="item.type"
                             val="link"
                             class="q-mr-md"
                             label="لینک" />
                    <q-radio v-model="item.type"
                             val="scroll"
                             class="q-mr-md"
                             label="اسکرول به بخش های دیگر همین صفحه" />
                  </div>
                </div>
                <div v-if="item.type && item.type === 'link'">
                  <div class="outsideLabel">لینک صفحه</div>
                  <q-input v-model="item.route" />
                </div>
                <div v-if="item.type && item.type === 'scroll'">
                  <div class="outsideLabel">کلاس المان مربوطه</div>
                  <q-input v-model="item.className" />
                </div>
              </q-expansion-item>
            </template>
            <div class="row q-mt-md q-gutter-xs justify-center">
              <q-btn color="positive"
                     class="full-width"
                     label="add Item"
                     @click="addItem" />
            </div>
          </q-expansion-item>
        </div>
      </template>
    </option-panel-tabs>
    <!--    <q-dialog v-model="optionPanel">-->
    <!--      <q-card>-->
    <!--        <q-card-section>-->
    <!--          <component :is="selectedOptionPanel"-->
    <!--                     v-model:options="localOptions[selectedSectionName][selectedWidgetIndex].options" />-->
    <!--        </q-card-section>-->
    <!--      </q-card>-->
    <!--    </q-dialog>-->
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'components/Widgets/ImageWidget/OptionPanel.vue'
import ActionButtonOptionPanel from 'components/Widgets/ActionButton/OptionPanel.vue'
import TimerOptionPanel from 'components/Widgets/Timer/OptionPanel.vue'
import ResponsiveBackGround from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/ResponsiveBackGround/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel,
    ActionButtonOptionPanel,
    TimerOptionPanel,
    ResponsiveBackGround
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
      optionPanel: false,
      selectedOptionPanel: '',
      selectedSectionName: '',
      selectedWidgetIndex: null,
      size: 'xs',
      sizeOptions: ['xs', 'sm', 'md', 'lg', 'xl'],
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
          eventName: null,
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
          }
        }
      },
      defaultTimerWidget: {
        name: 'Timer',
        options: {
          time: '1402-06-01 00:00',
          counters: {
            seconds: true,
            minutes: true,
            hours: true,
            days: true
          },
          hasTop: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false
          },
          hasLeft: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false
          },
          hasRight: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false
          },
          hasBottom: {
            xs: false,
            sm: false,
            md: false,
            lg: false,
            xl: false
          },
          timerStyle: {
            timerColor: null,
            timerBackground: null,
            timerSize: null,
            timerLabelColor: null,
            timerLabelBackground: null,
            timerLabelSize: null,
            secondsBackground: null,
            counterWidth: null,
            counterHeight: null,
            counterMargin: null,
            counterPadding: null,
            counterBorderRadius: null
          },
          topComponentOptions: {
            direction: 'top'
          },
          leftComponentOptions: {
            direction: 'left'
          },
          rightComponentOptions: {
            direction: 'right'
          },
          bottomComponentOptions: {
            direction: 'bottom'
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
      },
      actionObjectTypeOptions: ['link', 'event', 'scroll'],
      defaultOptions: {
        xs: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        sm: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        md: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        lg: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        xl: {
          rightSectionWidgets: [],
          centerSectionWidgets: [],
          leftSectionWidgets: []
        },
        sticky: false,
        stickyClass: '',
        salam: '',
        style: {},
        className: '',
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
        menuLink: [],
        logoImage: null,
        logoSlogan: null,
        hasAction: false,
        actionObject: {
          buttonLabel: null,
          type: null,
          scrollTo: null,
          route: null,
          eventName: null,
          eventArgs: null
        }
      }
    }
  },
  methods: {
    deleteWidget (sectionName, index) {
      this.localOptions[this.size][sectionName].splice(index, 1)
    },
    addTextWidget (sectionName) {
      this.localOptions[this.size][sectionName].push(this.defaultTextWidget)
    },
    addImageWidget (sectionName) {
      this.localOptions[this.size][sectionName].push(this.defaultImageWidget)
    },
    addActionButtonWidget (sectionName) {
      this.localOptions[this.size][sectionName].push(this.defaultActionButtonWidget)
    },
    addTimerWidget (sectionName) {
      this.localOptions[this.size][sectionName].push(this.defaultTimerWidget)
    },
    openOptionPanelDialog (widget, widgetIndex, sectionName) {
      this.selectedOptionPanel = widget.name.concat('OptionPanel')
      this.selectedWidgetIndex = widgetIndex
      this.selectedSectionName = sectionName
      this.optionPanel = true
    },
    addItem () {
      this.localOptions.menuLink.push([])
    },
    removeItem (itemIndex) {
      this.localOptions.menuLink.splice(itemIndex, 1)
    }
  }
})
</script>
