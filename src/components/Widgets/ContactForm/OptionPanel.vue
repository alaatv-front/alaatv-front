<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <q-list>
          <q-expansion-item expand-separator
                            icon="settings"
                            label="اطلاعات ایونت"
                            caption="Event Setting">
            <q-input v-model="localOptions.eventId"
                     type="text"
                     label="Event ID" />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="info"
                            label="آيکون"
                            caption="Icon">
            <div class="row q-col-gutter-sm">
              <div class="col-6">
                <q-input v-model="localOptions.iconName"
                         type="text"
                         label="نام آیکون" />
              </div>
              <div class="col-6">
                <q-input v-model="localOptions.iconColor"
                         filled
                         class="my-input">
                  <template v-slot:append>
                    <q-icon name="colorize"
                            class="cursor-pointer">
                      <q-popup-proxy cover
                                     transition-show="scale"
                                     transition-hide="scale">
                        <q-color v-model="localOptions.iconColor" />
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>
              <div class="col-4">
                <q-input v-model="localOptions.iconSize.xl"
                         type="text"
                         label="اندازه xl" />
              </div>
              <div class="col-4">
                <q-input v-model="localOptions.iconSize.lg"
                         type="text"
                         label="اندازه lg" />
              </div>
              <div class="col-4">
                <q-input v-model="localOptions.iconSize.md"
                         type="text"
                         label="اندازه md" />
              </div>
              <div class="col-4">
                <q-input v-model="localOptions.iconSize.sm"
                         type="text"
                         label="اندازه sm" />
              </div>
              <div class="col-4">
                <q-input v-model="localOptions.iconSize.xs"
                         type="text"
                         label="اندازه xs" />
              </div>
            </div>

          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="title"
                            label="عنوان"
                            caption="Title">
            <text-widget-option-panel v-model:options="localOptions.titleOption" />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="subtitles"
                            label="توضیحات"
                            caption="Description">
            <text-widget-option-panel v-model:options="localOptions.subtitleOption" />
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="dynamic_form"
                            label="فیلد های فرم"
                            caption="Form Fields">
            <q-form ref="fieldForm"
                    class="q-gutter-md"
                    @submit="addField">
              <div class="row q-col-gutter-sm">
                <div class="col-4">
                  <q-select v-model="inputForm.type"
                            :options="typeOptions"
                            option-label="label"
                            option-value="value"
                            emit-value
                            map-options
                            label="نوع" />
                </div>
                <div class="col-4">
                  <q-select v-model="inputForm.inputType"
                            :options="inputTypeOptions"
                            option-label="label"
                            option-value="value"
                            emit-value
                            map-options
                            label="inputType" />
                </div>
                <div class="col-4">
                  <q-input v-model="inputForm.name"
                           type="text"
                           label="نام" />
                </div>
                <div class="col-4">
                  <q-input v-model="inputForm.label"
                           type="text"
                           label="label" />
                </div>
                <div class="col-4">
                  <q-input v-model="inputForm.placeholder"
                           type="text"
                           label="placeholder" />
                </div>
                <div class="col-4">
                  <q-input v-model="inputForm.col"
                           type="text"
                           label="col" />
                </div>
                <div class="col-4">
                  <q-checkbox v-model="inputForm.outlined"
                              label="outlined" />
                </div>
                <div class="col-4">
                  <q-btn color="primary"
                         label="ذخیره"
                         type="submit" />
                </div>
                <div class="col-4">
                  <q-input v-model="localOptions.fieldBackground"
                           type="text"
                           label="fieldBackground" />
                </div>
              </div>
              <div v-if="inputFormType === 'select'"
                   class="row q-col-gutter-sm">
                <div class="col-4">
                  <q-input v-model="optionFormObject.title"
                           type="text"
                           label="title" />
                </div>
                <div class="col-4">
                  <q-input v-model="optionFormObject.id"
                           type="text"
                           label="id" />
                </div>
                <div class="col-4">
                  <q-btn color="primary"
                         label="ذخیره گزینه"
                         @click="addOption(null)" />
                </div>
                <div v-if="selectOptions.length > 0"
                     class="col-12">
                  <q-expansion-item v-for="(option, index) in selectOptions"
                                    :key="index"
                                    expand-separator
                                    :label="option.title">
                    <div class="row q-col-gutter-sm">
                      <div class="col-4">
                        <q-input v-model="option.title"
                                 type="text"
                                 label="title" />
                      </div>
                      <div class="col-4">
                        <q-input v-model="option.id"
                                 type="text"
                                 label="id" />
                      </div>
                      <div class="col-4">
                        <q-btn color="primary"
                               icon="ph:trash"
                               @click="deleteOption(index)" />
                      </div>
                    </div>
                  </q-expansion-item>
                </div>
              </div>
            </q-form>
            <q-list v-if="localOptions.inputs.length > 0"
                    separator
                    class="q-ma-sm">
              <q-expansion-item v-for="(item, index) in localOptions.inputs"
                                :key="index"
                                expand-separator
                                :label="item.label || item.name">
                <template v-slot:header>
                  <q-item-section avatar>
                    {{ index+1 }}.
                  </q-item-section>

                  <q-item-section>
                    {{ item.label || item.name }}
                  </q-item-section>

                  <q-item-section side>
                    <div class="row items-center">
                      <q-btn color="negative"
                             flat
                             icon="delete"
                             @click="deleteField(index)" />
                      <q-btn color="primary"
                             flat
                             icon="content_copy"
                             @click="duplicate(index)" />
                    </div>
                  </q-item-section>
                </template>
                <div class="row q-col-gutter-sm">
                  <div class="col-4">
                    <q-select v-model="localOptions.inputs[index].type"
                              :options="typeOptions"
                              option-label="label"
                              option-value="value"
                              emit-value
                              map-options
                              label="نوع" />
                  </div>
                  <div class="col-4">
                    <q-select v-model="localOptions.inputs[index].inputType"
                              :options="inputTypeOptions"
                              option-label="label"
                              option-value="value"
                              emit-value
                              map-options
                              label="inputType" />
                  </div>
                  <div class="col-4">
                    <q-input v-model="localOptions.inputs[index].name"
                             type="text"
                             label="نام" />
                  </div>
                  <div class="col-4">
                    <q-input v-model="localOptions.inputs[index].label"
                             type="text"
                             label="label" />
                  </div>
                  <div class="col-4">
                    <q-input v-model="localOptions.inputs[index].placeholder"
                             type="text"
                             label="placeholder" />
                  </div>
                  <div class="col-4">
                    <q-input v-model="localOptions.inputs[index].col"
                             type="text"
                             label="col" />
                  </div>
                  <div class="col-4">
                    <q-checkbox v-model="localOptions.inputs[index].outlined"
                                label="outlined" />
                  </div>
                </div>
                <div v-if="item.type === 'select'"
                     class="row q-col-gutter-sm">
                  <div class="col-4">
                    <q-input v-model="optionFormObject.title"
                             type="text"
                             label="title" />
                  </div>
                  <div class="col-4">
                    <q-input v-model="optionFormObject.id"
                             type="text"
                             label="id" />
                  </div>
                  <div class="col-4">
                    <q-btn color="primary"
                           label="ذخیره گزینه"
                           @click="addOption(index)" />
                  </div>
                  <div v-if="item.options.length > 0"
                       class="col-12">
                    <q-expansion-item v-for="(itemOption, optionIndex) in item.options"
                                      :key="optionIndex"
                                      expand-separator
                                      :label="itemOption.title">
                      <div class="row q-col-gutter-sm">
                        <div class="col-4">
                          <q-input v-model="itemOption.title"
                                   type="text"
                                   label="title" />
                        </div>
                        <div class="col-4">
                          <q-input v-model="itemOption.id"
                                   type="text"
                                   label="id" />
                        </div>
                        <div class="col-4">
                          <q-btn color="primary"
                                 icon="ph:trash"
                                 @click="deleteOption(optionIndex, index)" />
                        </div>
                      </div>
                    </q-expansion-item>
                  </div>
                </div>
              </q-expansion-item>
            </q-list>
          </q-expansion-item>
          <q-expansion-item expand-separator
                            icon="mouse"
                            label="دکمه فرم"
                            caption="ActionButton">
            <action-button-option-panel v-model:options="localOptions.actionButtonOptions" />
          </q-expansion-item>
        </q-list>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import TextWidgetOptionPanel from 'src/components/Widgets/TextWidget/OptionPanel.vue'
import ActionButtonOptionPanel from 'src/components/Widgets/ActionButton/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
    TextWidgetOptionPanel,
    ActionButtonOptionPanel
  },
  mixins: [mixinOptionPanel],
  data() {
    return {
      defaultOptions: {
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
        },
        titleOption: {
          text: '',
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
        },
        subtitleOption: {
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
        },
        actionButtonOptions: {
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
          hasAction: false,
          action: null,
          scrollTo: null,
          route: null,
          eventName: null
        },
        inputs: [],
        iconColor: null,
        iconName: '',
        iconSize: {
          xs: '',
          sm: '',
          md: '',
          lg: '',
          xl: ''
        },
        fieldBackground: '#F4F5F6',
        eventId: null
      },
      inputForm: { type: '', inputType: '', name: '', outlined: false, label: '', placeholder: '', col: '' },
      typeOptions: [
        {
          label: 'متن',
          value: 'input'
        },
        {
          label: 'گزینه ای',
          value: 'select'
        },
        {
          label: 'تاریخ',
          value: 'date'
        }
      ],
      inputTypeOptions: [
        {
          label: 'متن',
          value: 'input'
        },
        {
          label: 'متن بلند',
          value: 'textarea'
        }
      ],
      selectInputOptions: {
        optionLabel: 'title',
        optionValue: 'id',
        options: []
      },
      selectOptions: [],
      optionFormObject: {
        id: '',
        title: ''
      }
    }
  },
  computed: {
    inputFormType() {
      return this.inputForm.type
    }
  },
  watch: {
    inputFormType(newVal) {
      if (newVal === 'select') {
        this.inputForm = { ...this.inputForm, ...this.selectInputOptions }
      }
    }
  },
  methods: {
    addOption(index) {
      if (!index) {
        this.selectOptions.push(this.optionFormObject)
      } else {
        this.localOptions.inputs[index].options.push(this.optionFormObject)
      }
      this.optionFormObject = {
        id: '',
        label: ''
      }
    },
    deleteOption(optionIndex, inputIndex) {
      if (!inputIndex) {
        this.selectOptions.splice(optionIndex, 1)
      } else {
        this.localOptions.inputs[inputIndex].options.splice(optionIndex, 1)
      }
    },
    addField() {
      if (this.inputFormType === 'select') {
        this.inputForm.options = this.selectOptions
      }
      this.localOptions.inputs.push(this.inputForm)
      this.inputForm = { type: '', name: '', outlined: false, label: '', placeholder: '', col: '' }
    },
    deleteField(index) {
      this.localOptions.inputs.splice(index, 1)
    },
    duplicate(index) {
      const item = JSON.parse(JSON.stringify(this.localOptions.inputs[index]))
      this.localOptions.inputs.splice(index, 0, item)
    }
  }
})
</script>
