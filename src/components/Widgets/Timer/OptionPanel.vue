<template>
  <option-panel-tabs v-model:options="localOptions"
                     :show-hover-effects-tab="true"
                     :show-box-shadows-tab="true"
                     :show-responsive-spacing="true"
                     :show-border-style-tab="true">
    <template #main-tab>
      <q-list separator>
        <q-expansion-item expand-separator
                          icon="schedule"
                          label="تایمر"
                          caption="timer options">
          <div class="row">
            <div class="col-12">
              <q-input v-model="localOptions.time"
                       filled>
                <template v-slot:prepend>
                  <q-icon name="event"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-date v-model="localOptions.time"
                              mask="YYYY-MM-DD HH:mm">
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup
                                 label="تایید"
                                 color="primary"
                                 flat />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

                <template v-slot:append>
                  <q-icon name="access_time"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-time v-model="localOptions.time"
                              mask="YYYY-MM-DD HH:mm"
                              format24h>
                        <div class="row items-center justify-end">
                          <q-btn v-close-popup
                                 label="تایید"
                                 color="primary"
                                 flat />
                        </div>
                      </q-time>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
          <div class="row q-col-gutter-sm q-my-md">
            <div class="col-12 col-md-3">
              <q-select v-model="responsive"
                        :options="responsiveOpts"
                        label="responsive" />
            </div>
            <div class="col-12 col-md-9">
              <q-checkbox v-model="localOptions.hasTop[responsive]"
                          left-label
                          label="ویدجت بالا" />
              <q-checkbox v-model="localOptions.hasLeft[responsive]"
                          left-label
                          label="ویدجت چپ" />
              <q-checkbox v-model="localOptions.hasRight[responsive]"
                          left-label
                          label="ویدجت راست" />
              <q-checkbox v-model="localOptions.hasBottom[responsive]"
                          left-label
                          label="ویدجت پایین" />
            </div>
          </div>
          <div class="row q-col-gutter-sm q-my-md">
            <div class="col-12 col-md-1 flex flex-center">
              شمارنده ها :
            </div>
            <div class="col-12 col-md-9">
              <q-checkbox v-model="localOptions.counters.seconds"
                          left-label
                          label="ثانیه" />
              <q-checkbox v-model="localOptions.counters.minutes"
                          left-label
                          label="دقیقه" />
              <q-checkbox v-model="localOptions.counters.hours"
                          left-label
                          label="ساعت" />
              <q-checkbox v-model="localOptions.counters.days"
                          left-label
                          label="روز" />
            </div>
          </div>
          <div class="row q-col-gutter-sm">
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerColor"
                       filled
                       label="رنگ شمارنده">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.timerStyle.timerColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerBackground"
                       filled
                       label="رنگ پس زمینه شمارنده">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.timerStyle.timerBackground" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerSize"
                       type="text"
                       label="سایز شمارنده" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.secondsBackground"
                       filled
                       label="رنگ پس زمینه ثانیه">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.timerStyle.secondsBackground" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerLabelColor"
                       filled
                       label="رنگ عنوان شمارنده">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.timerStyle.timerLabelColor" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerLabelBackground"
                       filled
                       label="پس زمینه عنوان شمارنده"
                       class="my-input">
                <template v-slot:append>
                  <q-icon name="colorize"
                          class="cursor-pointer">
                    <q-popup-proxy cover
                                   transition-show="scale"
                                   transition-hide="scale">
                      <q-color v-model="localOptions.timerStyle.timerLabelBackground" />
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.timerLabelSize"
                       type="text"
                       label="سایز عنوان تایمر" />
            </div>
            <div class="col-3">
              <q-slider v-model="localOptions.timerStyle.counterBorderRadius"
                        :min="0"
                        :max="100"
                        label
                        :label-value="localOptions.timerStyle.counterBorderRadius + 'px'"
                        label-always
                        color="primary" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.counterWidth"
                       type="text"
                       label="عرض شمارنده" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.counterHeight"
                       type="text"
                       label="ارتفاع شمارنده" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.counterMargin"
                       type="text"
                       label="فاصله خارجی شمارنده" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.counterPadding"
                       type="text"
                       label="فاصله داخلی شمارنده" />
            </div>
            <div class="col-3">
              <q-input v-model="localOptions.timerStyle.fontFamily"
                       type="text"
                       label="font family" />
            </div>
            <div class="col-3">
              <q-select v-model="localOptions.theme"
                        :options="themeOptions"
                        type="text"
                        label="theme" />
            </div>
          </div>
        </q-expansion-item>
        <q-expansion-item v-if="localOptions.hasTop[responsive]"
                          expand-separator
                          icon="widgets"
                          label="ویدجت بالا"
                          caption="ActionButton">
          <component-wrapper-option-panel v-model:options="localOptions.topComponentOptions" />
        </q-expansion-item>
        <q-expansion-item v-if="localOptions.hasLeft[responsive]"
                          expand-separator
                          icon="widgets"
                          label="ویدجت چپ"
                          caption="ActionButton">
          <component-wrapper-option-panel v-model:options="localOptions.leftComponentOptions" />
        </q-expansion-item>
        <q-expansion-item v-if="localOptions.hasRight[responsive]"
                          expand-separator
                          icon="widgets"
                          label="ویدجت راست"
                          caption="ActionButton">
          <component-wrapper-option-panel v-model:options="localOptions.rightComponentOptions" />
        </q-expansion-item>
        <q-expansion-item v-if="localOptions.hasBottom[responsive]"
                          expand-separator
                          icon="widgets"
                          label="ویدجت پایین"
                          caption="ActionButton">
          <component-wrapper-option-panel v-model:options="localOptions.bottomComponentOptions" />
        </q-expansion-item>
      </q-list>
    </template>
  </option-panel-tabs>
</template>

<script>
import { defineComponent } from 'vue'
import { mixinOptionPanel } from 'quasar-ui-q-page-builder'
import OptionPanelTabs from 'quasar-ui-q-page-builder/src/components/OptionPanelComponents/OptionPanelTabs.vue'
import ComponentWrapperOptionPanel from 'src/components/Widgets/ComponentWrapper/OptionPanel.vue'

export default defineComponent({
  name: 'OptionPanel',
  components: { OptionPanelTabs, ComponentWrapperOptionPanel },
  mixins: [mixinOptionPanel],
  data () {
    return {
      defaultOptions: {
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
        theme: 'default',
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
      themeOptions: ['default', 'theme1', 'blackFriday'],
      responsiveOpts: ['xs', 'sm', 'md', 'lg', 'xl'],
      responsive: 'xs'
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
