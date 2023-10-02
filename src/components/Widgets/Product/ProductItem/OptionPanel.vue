<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row ض-زخم-لعففثق">
          <div class="col-md-6 q-mt-md">
            <div>تم محصول</div>
            <q-select v-model="localOptions.theme"
                      :options="themeOptions"
                      emit-value
                      map-options
                      option-label="title"
                      option-value="value"
                      label="theme" />
          </div>
          <div class="col-md-6 q-mt-md">
            <div>تم محصول در حالت موبایل</div>
            <q-select v-model="localOptions.mobileTheme"
                      :options="mobileThemeOptions"
                      emit-value
                      map-options
                      option-label="title"
                      option-value="value"
                      label="theme" />
          </div>
          <div class="col-md-6 q-mt-md">
            <div>روش نشان دادن محصول</div>
            <q-select v-model="localOptions.productViewType"
                      :options="productViewTypeOptions"
                      emit-value
                      map-options
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
      productViewTypeOptions: [{ title: 'صفحه محصول', value: 'productPage' }, { title: 'دیالوگ', value: 'bottomSheet' }],
      defaultOptions: {
        theme: 'ThemeDefault',
        mobileTheme: 'vertical',
        productViewType: 'productPage',
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
        },
        responsiveSpacing: {
          xs: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: '10px',
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          sm: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: '10px',
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          md: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: '10px',
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          lg: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: '10px',
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
          },
          xl: {
            marginTop: null,
            marginLeft: null,
            marginRight: null,
            marginBottom: '10px',
            paddingTop: null,
            paddingLeft: null,
            paddingRight: null,
            paddingBottom: null
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
