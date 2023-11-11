<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <div class="option-panel-container">
        <div class="row q-col-gutter-md">
          <div class="col-12 q-mt-md">
            <q-expansion-item expand-separator
                              icon="image"
                              label="backgrounds">
              <responsive-back-ground v-model:options="localOptions.backgrounds" />
            </q-expansion-item>
          </div>
          <div class="col-12 q-mt-md">
            <q-expansion-item expand-separator
                              icon="ph:text-t"
                              label="Typography">
              <div class="row q-col-gutter-md">
                <div v-for="(value, key, index) in localOptions.typography"
                     :key="index"
                     class="col-12 col-md-4">
                  <q-select v-if="key === 'fontFamily'"
                            v-model="localOptions.typography.fontFamily"
                            :options="fontFamilyOptions"
                            label="FontFamily" />
                  <q-input v-else
                           v-model="localOptions.typography[key]"
                           :label="key">
                    <template v-slot:append>
                      <q-icon name="colorize"
                              class="cursor-pointer">
                        <q-popup-proxy cover
                                       transition-show="scale"
                                       transition-hide="scale">
                          <q-color v-model="localOptions.typography[key]"
                                   label="backgroundColor"
                                   :default-value="value"
                                   format-model="rgba" />
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </q-expansion-item>
          </div>
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
import ResponsiveBackGround from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/ResponsiveBackGround/ResponsiveBackGround.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ResponsiveBackGround },
  mixins: [mixinOptionPanel],
  data() {
    return {
      themeOptions: [{ title: 'بدون دکمه ثبت نام', value: 'ThemeDefault' }, { title: 'با دکمه ثبت نام', value: 'ThemeProduct1' }, { title: 'قدیمی', value: 'ThemeProduct2' }],
      mobileThemeOptions: [{ title: 'عمودی', value: 'vertical' }, { title: 'افقی', value: 'horizontal' }],
      productViewTypeOptions: [{ title: 'صفحه محصول', value: 'productPage' }, { title: 'دیالوگ', value: 'bottomSheet' }],
      fontFamilyOptions: ['iranyekan', 'IRANSans', 'IRANSansXFaNum', 'IRANSansDN', 'Doran FaNum', 'ModamFaNumWeb', 'Panchang', 'Plasma-Lozenge-Dots'],
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
        },
        backgrounds: {
          xs: {
            size: null,
            color: 'rgba(255,255,255, 1)',
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          sm: {
            size: null,
            color: 'rgba(255,255,255, 1)',
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          md: {
            size: null,
            color: 'rgba(255,255,255, 1)',
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          lg: {
            size: null,
            color: 'rgba(255,255,255, 1)',
            image: null,
            repeat: null,
            position: null,
            attachment: null
          },
          xl: {
            size: null,
            color: 'rgba(255,255,255, 1)',
            image: null,
            repeat: null,
            position: null,
            attachment: null
          }
        },
        typography: {
          fontFamily: 'iranyekan',
          titleColor: '#D1D1D1',
          priceColor: '#9E9E9E',
          finalColor: '#009688',
          simpleTextColor: '#757575',
          separatorColor: '#EEEEEE',
          actionColor: '#9e9e9e',
          actionHoverColor: '#26A69A',
          installmentColor: '#FF8518',
          installmentBadgeBackground: 'linear-gradient(-90deg, #2CB2C5 0.01%, #31B470 99.99%)'
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
