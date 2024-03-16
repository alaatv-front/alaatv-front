<template>
  <div>
    <option-panel-tabs v-model:options="localOptions">
      <template #main-tab>
        <div class="option-panel-container">
          <div class="row q-col-gutter-sm q-my-sm">
            <div class="col-4">
              <q-input v-model="localOptions.eventName"
                       type="text"
                       label="Event Name" />
            </div>
            <div class="col-4">
              <q-input v-model="localOptions.headerIcon"
                       type="text"
                       label="header Icon" />
            </div>
            <div class="col-12 col-md-2">
              <q-checkbox v-model="localOptions.hasAction"
                          label="has Action" />
              <q-checkbox v-model="localOptions.hasBody"
                          label="has body" />
              <q-checkbox v-model="localOptions.persistent"
                          label="persistent" />
              <q-checkbox v-model="localOptions.once"
                          label="Once"
                          @update:model-value="refresh($event)" />
            </div>
            <div class="col-12 col-md-2">
              <q-checkbox v-model="localOptions.hasHeader"
                          label="has Header" />
              <q-checkbox v-model="localOptions.immediate"
                          label="immediate" />
              <q-checkbox v-model="localOptions.closeButton"
                          label="closeButton" />

            </div>
            <template v-if="localOptions.once">
              <div class="flex flex-wrap q-mb-sm" />
              <q-item>
                <q-item-section>
                  <q-item-label>
                    در صورت اعمال تغییرات و فعال بودن گزینه once، تغییرات جدید به کسانی که قبلا این پاپ آپ را دیده باشند نشان داده نخواهد شد. برای نشان دادن این اتغییرات برای همه لطفا دکمه رفرش را بزنید
                  </q-item-label>
                </q-item-section>
                <q-item-section side>
                  <q-btn color="primary"
                         icon="ph:arrow-clockwise"
                         square
                         @click="refresh(true)" />
                </q-item-section>
              </q-item>
            </template>

          </div>
          <q-expansion-item v-if="localOptions.hasHeader"
                            :label="'headerWidgets' ">
            <q-card>
              <q-card-section v-for="(widget, index) in localOptions.headerWidgets"
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
                             @click="deleteWidget('headerWidgets', index)" />
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
                           @click="addTextWidget('headerWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="image"
                           @click="addImageWidget('headerWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="action button"
                           @click="addActionButtonWidget('headerWidgets')" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item v-if="localOptions.hasBody"
                            :label="'bodyWidgets'">
            <q-card>
              <q-card-section v-for="(widget, index) in localOptions.bodyWidgets"
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
                             @click="deleteWidget('bodyWidgets', index)" />
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
                           @click="addTextWidget('bodyWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="image"
                           @click="addImageWidget('bodyWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="separator"
                           @click="addSeparator('bodyWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="action button"
                           @click="addActionButtonWidget('bodyWidgets')" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
          <q-expansion-item v-if="localOptions.hasAction"
                            :label="'actionWidgets'">
            <q-card>
              <q-card-section v-for="(widget, index) in localOptions.actionWidgets"
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
                             @click="deleteWidget('actionWidgets', index)" />
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
                           @click="addTextWidget('actionWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="image"
                           @click="addImageWidget('actionWidgets')" />
                  </div>
                  <div class="col-3">
                    <q-btn icon="isax:add"
                           class="full-width"
                           color="positive"
                           label="action button"
                           @click="addActionButtonWidget('actionWidgets')" />
                  </div>
                </div>
              </q-card-section>
            </q-card>
          </q-expansion-item>
        </div>
      </template>
    </option-panel-tabs>
  </div>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import TextWidgetOptionPanel from 'components/Widgets/TextWidget/OptionPanel.vue'
import ImageWidgetOptionPanel from 'components/Widgets/ImageWidget/OptionPanel.vue'
import SeparatorOptionPanel from 'src/components/Widgets/Separator/OptionPanel.vue'
import ActionButtonOptionPanel from 'components/Widgets/ActionButton/OptionPanel.vue'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    SeparatorOptionPanel,
    TextWidgetOptionPanel,
    ImageWidgetOptionPanel,
    ActionButtonOptionPanel
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
      defaultSeparatorWidget: {
        name: 'Separator',
        options: {
          spaced: false,
          dark: false,
          inset: false,
          vertical: false,
          image: null,
          ImageStyle: null,
          ImageClassName: null,
          height: {
            xl: '',
            lg: '',
            md: '',
            sm: '',
            xs: ''
          },
          width: {
            xl: '',
            lg: '',
            md: '',
            sm: '',
            xs: ''
          },
          style: {},
          className: ''
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
      actionObjectTypeOptions: ['link', 'event', 'scroll'],
      defaultOptions: {
        eventName: 'openPopup',
        refresh: null,
        once: true,
        persistent: false,
        closeButton: false,
        immediate: false,
        hasHeader: false,
        hasBody: false,
        hasAction: false,
        headerIcon: null,
        bodyWidgets: [],
        actionWidgets: [],
        headerWidgets: []
      }
    }
  },
  methods: {
    deleteWidget (sectionName, index) {
      this.localOptions[sectionName].splice(index, 1)
    },
    addTextWidget (sectionName) {
      this.localOptions[sectionName].push(JSON.parse(JSON.stringify(this.defaultTextWidget)))
    },
    addSeparator (sectionName) {
      this.localOptions[sectionName].push(JSON.parse(JSON.stringify(this.defaultSeparatorWidget)))
    },
    addImageWidget (sectionName) {
      this.localOptions[sectionName].push(JSON.parse(JSON.stringify(this.defaultImageWidget)))
    },
    addActionButtonWidget (sectionName) {
      this.localOptions[sectionName].push(JSON.parse(JSON.stringify(this.defaultActionButtonWidget)))
    },
    openOptionPanelDialog (widget, widgetIndex, sectionName) {
      this.selectedOptionPanel = widget.name.concat('OptionPanel')
      this.selectedWidgetIndex = widgetIndex
      this.selectedSectionName = sectionName
      this.optionPanel = true
    },
    refresh (once) {
      if (!once) {
        this.localOptions.refresh = null
        return
      }
      this.localOptions.refresh = Date.now()
      this.$q.notify({
        message: 'با موفقیت ثبت شد',
        color: 'secondary',
        position: 'top'
      })
    }
  }
})
</script>
