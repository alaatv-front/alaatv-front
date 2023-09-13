<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row">
          <div class="col-md-6 q-mt-md">
            <div>تم محصول</div>
            <q-select v-model="localOptions.theme"
                      :options="themeOptions"
                      option-label="title"
                      option-value="value"
                      label="theme" />
          </div>
          <div class="col-md-6 q-mt-md">
            <div>تم محصول در حالت موبایل</div>
            <q-select v-model="localOptions.mobileTheme"
                      :options="mobileThemeOptions"
                      option-label="title"
                      option-value="value"
                      label="theme" />
          </div>
          <!-- <div class="col-md-6">
            <q-input v-model="localOptions.productId"
                     label="productId" />
          </div>
          <div class="col-md-6">
            <q-input v-model="localOptions.urlParam"
                     label="urlParam" />
          </div> -->
        </div>
      </div>
    </template>
  </option-panel-tabs>
</template>
<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs },
  mixins: [mixinOptionPanel],
  data() {
    return {
      themeOptions: [{ title: 'بدون دکمه ثبت نام', value: 'ThemeDefault' }, { title: 'با دکمه ثبت نام', value: 'ThemeProduct1' }, { title: 'قدیمی', value: 'ThemeProduct2' }],
      mobileThemeOptions: [{ title: 'عمودی', value: 'vertical' }, { title: 'افقی', value: 'horizontal' }],
      defaultOptions: {
        theme: 'ThemeDefault',
        mobileTheme: 'vertical',
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
  },
  watch: {
    localOptions: {
      handler(newVal) {
        this.$emit('update:options', newVal)
      },
      deep: true
    }
  }
})
</script>
