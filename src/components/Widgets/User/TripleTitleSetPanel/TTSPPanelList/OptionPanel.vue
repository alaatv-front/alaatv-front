<template>
  <option-panel-tabs v-model:options="localOptions">
    <template #main-tab>
      <div class="option-panel-container q-pt-lg">
        <div class="row q-col-gutter-md">
          <div class="col-md-4">
            <div>
              نوع:
            </div>
            <q-select v-model="localOptions.apiName"
                      :options="apiOptions" />
          </div>
          <div class="col-md-4">
            <div>
              از:
            </div>
            <q-input v-model="localOptions.to" />
          </div>
          <div class="col-md-4">
            <div>
              تا:
            </div>
            <q-input v-model="localOptions.from" />
          </div>
        </div>

        <q-expansion-item expand-separator
                          label="تنظیمات محصول">
          <product-option-panel v-model:options="localOptions.productOptions" />
        </q-expansion-item>
      </div>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ProductOptionPanel from 'components/Widgets/Product/ProductItem/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { ProductOptionPanel, OptionPanelTabs },
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
      apiOptions: ['home', 'shop'],
      defaultOptions: {
        className: '',
        height: 'auto',
        boxed: false,
        boxedWidth: 1200,
        style: {},
        from: 0,
        to: -1,
        productOptions: {
          theme: 'ThemeDefault',
          className: '',
          height: 'auto',
          boxed: false,
          boxedWidth: 1200,
          style: {},
          borderStyle: {
            borderCssString: '',
            borderRadiusCssString: '20px'
          },
          boxShadows: [
            '-2px -4px 10px rgba(255, 255, 255, 0.6)',
            '2px 4px 10px rgba(46, 56, 112, 0.05)'
          ],
          cssHoverEffects: {
            boxShadows: [
              '-5px -6px 10px rgba(255, 255, 255, 0.6)',
              '5px 5px 20px rgba(0, 0, 0, 0.1)'
            ],
            borderStyle: {
              borderCssString: '',
              borderRadiusCssString: '20px'
            },
            transition: {
              time: 0.4
            },
            transform: {
              rotate: 0,
              scaleX: 1,
              scaleY: 1,
              skewX: 0,
              skewY: 0,
              translateX: 0,
              translateY: -10
            }
          }
        }
      }
    }
  },
  watch: {
    localOptions: {
      handler (newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
