<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <q-card class="custom-card">
          <div class="row q-col-gutter-md">
            <div class="col-md-3">
              <div class="outsideLabel">تم</div>
              <q-select v-model="localOptions.theme"
                        :options="themeOptions" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">فاصله از پایین</div>
              <q-input v-model="localOptions.marginBottom" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">فاصله بین آیتم ها</div>
              <q-input v-model="localOptions.expandItemMargin" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">پس زمینه آیتم ها</div>
              <q-input v-model="localOptions.expandItemBackground" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">فاصله داخلی محتوای آیتم</div>
              <q-input v-model="localOptions.expandItemContentPadding" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">فاصله داخلی محتوای هدر</div>
              <q-input v-model="localOptions.headerPadding" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">expandItemRadius</div>
              <q-input v-model="localOptions.expandItemRadius" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">dense</div>
              <q-checkbox v-model="localOptions.dense" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">expandSeparator</div>
              <q-checkbox v-model="localOptions.expandSeparator" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">contentSeparator</div>
              <q-checkbox v-model="localOptions.hasContentSeparator" />
            </div>
          </div>
          <div v-if="localOptions.hasContentSeparator"
               class="row q-col-gutter-md q-mb-md">
            <div class="col-md-3">
              <div class="outsideLabel">CS size</div>
              <q-input v-model="localOptions.contentSeparator.size" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">CS color</div>
              <q-input v-model="localOptions.contentSeparator.color" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">CS top margin</div>
              <q-input v-model="localOptions.contentSeparator.marginTop" />
            </div>
            <div class="col-md-3">
              <div class="outsideLabel">CSS bottom margin</div>
              <q-input v-model="localOptions.contentSeparator.marginBottom" />
            </div>
          </div>
          <q-card-section>
            <q-expansion-item v-for="(item, index) in localOptions.expansionList"
                              :key="index"
                              expand-separator>
              <template v-slot:header>
                <q-btn color="negative"
                       icon="close"
                       size="14px"
                       class="q-mr-sm"
                       @click="removeItem(index)" />
                <q-input v-model="item.label"
                         class="full-width"
                         label="label" />
              </template>
              <div v-if="localOptions.theme === 'theme2'"
                   class="caption col-md-10 q-my-md q-mx-xl">
                <q-input v-model="item.caption"
                         label="caption" />
              </div>
              <div class="text">
                <editor v-model:value="item.text" />
              </div>
              <editor-options v-model:options="localOptions" />
            </q-expansion-item>
          </q-card-section>
          <div class="row q-gutter-xs justify-center">
            <q-btn color="positive"
                   class="full-width"
                   label="add Item"
                   @click="addItem" />
          </div>
        </q-card>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { PageBuilderOptionPanel } from 'src/mixin/Mixins.js'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import Editor from 'components/Utils/Editor.vue'
import EditorOptions from 'components/EditorOptions.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    Editor,
    OptionPanelTabs,
    EditorOptions
  },
  mixins: [PageBuilderOptionPanel],
  data() {
    return {
      themeOptions: ['theme1', 'theme2'],
      defaultOptions: {
        expansionList: [],
        expandIconClass: null,
        theme: null,
        dense: false,
        expandSeparator: true,
        expandItemBackground: null,
        expandItemMargin: 0,
        expandItemRadius: 0,
        expandItemContentPadding: 0,
        marginBottom: null,
        headerPadding: null,
        fontFamily: null,
        color: null,
        fontSize: null,
        fontWeight: null,
        fontStyle: null,
        hasContentSeparator: false,
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
        },
        contentSeparator: {
          marginTop: 0,
          marginBottom: 0,
          color: '#424242',
          size: '1px'
        },
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
    }
  },
  watch: {
    'localOptions.dense': function (value) {
      if (value) {
        this.localOptions.marginBottom = '5px'
      } else {
        this.localOptions.marginBottom = '100px'
      }
    }
  },
  methods: {
    addItem() {
      this.localOptions.expansionList.push({
        label: '',
        caption: '',
        text: '',
        expanded: false
      })
    },
    removeItem(itemIndex) {
      this.localOptions.expansionList.splice(itemIndex, 1)
    }
  }
})
</script>
