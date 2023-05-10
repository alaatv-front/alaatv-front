<template>
  <option-panel-tabs v-model:options="localOptions">
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
              <div class="outsideLabel">dense</div>
              <q-checkbox v-model="localOptions.dense" />
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

export default defineComponent({
  name: 'OptionPanel',
  components: { Editor, OptionPanelTabs },
  mixins: [PageBuilderOptionPanel],
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
      themeOptions: ['theme1', 'theme2'],
      defaultOptions: {
        expansionList: [],
        expandIconClass: null,
        theme: null,
        dense: false,
        marginBottom: '100px'
      }
    }
  },
  methods: {
    addItem () {
      this.localOptions.expansionList.push({
        label: '',
        caption: '',
        text: '',
        expanded: false
      })
    },
    removeItem (itemIndex) {
      this.localOptions.expansionList.splice(itemIndex, 1)
    }
  }
})
</script>
