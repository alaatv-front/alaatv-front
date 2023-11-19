<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-show="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container q-py-md">
        <div class="row q-gutter-sm">
          <div class="input-container col-12">
            <q-input v-model="newButton"
                     filled
                     label="نام کلید">

              <template v-slot:after>
                <q-btn color="primary"
                       flat
                       icon="add"
                       @click="addButton" />
              </template>
            </q-input>
          </div>
        </div>
        <div class="column q-mt-md">
          <q-expansion-item v-for="(btn, index) in localOptions.buttonList"
                            :key="index"
                            expand-separator>
            <template v-slot:header>
              <q-item-section avatar>
                {{ index + 1 }}
              </q-item-section>

              <q-item-section>
                {{ btn.name }}
              </q-item-section>

              <q-item-section side>
                <q-btn color="negative"
                       flat
                       icon="delete"
                       @click="deleteBtn(index)" />
              </q-item-section>
            </template>
            <action-button-option-panel v-model:options="btn.options" />
          </q-expansion-item>
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ActionButtonOptionPanel from 'src/components/Widgets/ActionButton/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: {
    OptionPanelTabs,
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
      defaultOptions: {
        buttonList: [],
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
      newButton: ''
    }
  },
  watch: {
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  },
  methods: {
    addButton () {
      const btn = {
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
          },
          responsiveShow: {
            xl: true,
            lg: true,
            md: true,
            sm: true,
            xs: true
          }
        },
        name: this.newButton
      }
      this.localOptions.buttonList.push(btn)
      this.newButton = ''
    },
    deleteBtn (index) {
      this.localOptions.buttonList.splice(index, 1)
    }
  }
})
</script>
