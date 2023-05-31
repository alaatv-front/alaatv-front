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
        marginBottom: '100px',
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
  mounted() {
    console.log(JSON.stringify([
      {
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'FloatingCart',
                options: { style: {} }
              }, {
                name: 'ActionButton',
                options: {
                  color: 'primary',
                  icon: null,
                  label: 'نیاز به راهنمایی داری ؟',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: null,
                  fixed: true,
                  fixedPosition: 'bottom-left',
                  eventArgs: null,
                  action: 'event',
                  scrollTo: null,
                  route: null,
                  eventName: 'newsletter',
                  style: {
                    background: '#F5CB78',
                    marginBottom: '20px',
                    marginRight: '20px'
                  }
                }
              }, {
                name: 'Newsletter',
                options: {
                  eventName: 'newsletter',
                  verification: true,
                  eventId: '18',
                  userInputs: {
                    first_name: true,
                    last_name: true,
                    major: true,
                    grade: true
                  },
                  style: {}
                }
              }],
              options: {
                colNumber: 'col-12',
                style: {}
              }
            }],
            options: {
              boxed: false,
              boxedWidth: 1362
            }
          }]
        },
        options: {
          fullHeight: false,
          backgrounds: {
            xs: {
              size: null,
              color: null,
              image: 'https://nodes.alaatv.com/upload/landing/Arash/back/5.jpg',
              repeat: null,
              position: null,
              attachment: null
            },
            sm: {
              size: null,
              color: null,
              image: 'https://nodes.alaatv.com/upload/landing/Arash/back/4.jpg',
              repeat: null,
              position: null,
              attachment: null
            },
            md: {
              size: null,
              color: null,
              image: 'https://nodes.alaatv.com/upload/landing/Arash/back/3.jpg',
              repeat: null,
              position: null,
              attachment: null
            },
            lg: {
              size: null,
              color: null,
              image: 'https://nodes.alaatv.com/upload/landing/Arash/back/3.jpg',
              repeat: null,
              position: null,
              attachment: null
            },
            xl: {
              size: null,
              color: null,
              image: 'https://nodes.alaatv.com/upload/landing/Arash/back/1.jpg',
              repeat: null,
              position: null,
              attachment: null
            }
          },
          verticalAlign: 'center',
          style: { minHeight: 'auto' }
        }
      },
      {
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'HeaderMenu',
                options: {
                  style: { color: 'rgba(250,250,250,0.72)' },
                  className: '',
                  menuLink: [{
                    label: 'صفحه اصلی',
                    type: 'link',
                    route: '/'
                  }, {
                    label: 'دوره ها',
                    type: 'scroll',
                    className: 'courses'
                  }, {
                    label: 'سوالات متداول',
                    type: 'scroll',
                    className: 'faq-row'
                  }],
                  logoImage: 'https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png',
                  logoSlogan: 'مدرسه آنلاین آلا',
                  hasAction: true,
                  actionObject: {
                    buttonLabel: 'ثبت نام',
                    type: 'scroll',
                    scrollTo: 'courses',
                    route: '',
                    eventName: null,
                    eventArgs: null
                  },
                  action: true,
                  actionButtonLabel: 'ثبت نام'
                }
              }],
              options: { colNumber: 'col-12' }
            }],
            options: {
              height: 'auto',
              boxed: true,
              boxedWidth: '1200',
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'top',
              style: {
                maxWidth: '1200px',
                width: '1200px'
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#ffffff',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '22px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '22px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '25px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '32px',
                    fontWeight: '800',
                    fontStyle: 'inherit'
                  },
                  xl: {
                    fontSize: '32px',
                    fontWeight: '800',
                    fontStyle: 'normal'
                  },
                  className: '',
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '100px 0 16px 10px',
                    paddingBottom: '0',
                    marginBottom: '',
                    marginTop: '95px',
                    paddingTop: '0',
                    paddingLeft: '0',
                    paddingRight: '0'
                  },
                  text: '<div style="text-align: center;">تسلط به تمام فوت و فن های حل</div><div style="text-align: center;"><font color="#ffe100">۱۰۰٪</font> تست ها توی <font color="#ffe100">۳ روز</font> با آرش آلاء</div>',
                  customClass: 'text-center'
                }
              }, {
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#ffffff',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '16px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '16px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '18px',
                    fontWeight: '800',
                    fontStyle: 'inherit'
                  },
                  xl: {
                    fontSize: '18px',
                    fontWeight: '800',
                    fontStyle: 'normal'
                  },
                  className: '',
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '100px 0 16px 10px',
                    paddingBottom: '0',
                    marginBottom: '',
                    marginTop: '50px',
                    paddingTop: '0',
                    paddingLeft: '0',
                    paddingRight: '0'
                  },
                  text: '<div style="text-align: center;">در <font color="#ffe100">همایش آنلاین آرش</font> آلاء، بسیار سریع و ضربتی</div><div style="text-align: center;">توی <font color="#ffe100">3 روز</font>، یک جمع بندی نکته و تست محور با <font color="#ffe100">پوشش ۱۰۰٪ مباحث کنکور</font> و</div><div style="text-align: center;">تحلیل حرفه ای تیپ تست ها رو تجربه کن</div>',
                  customClass: 'text-center'
                }
              }],
              options: {
                colNumber: 'col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12',
                style: {},
                className: 'flex column'
              }
            }, {
              widgets: [{
                name: 'VideoPlayerWidget',
                options: {
                  src: '',
                  url: 'https://nodes.alaatv.com/media/Arash/arash_output_compress_1440p.mp4',
                  poster: 'https://nodes.alaatv.com/upload/introVideos/thumbnails/ArashLanding-Thumbnail.jpg',
                  srcType: 'singleQuality',
                  style: {
                    marginTop: '50px',
                    paddingTop: '50px'
                  }
                }
              }],
              options: {}
            }],
            options: {
              className: '',
              height: 'auto',
              boxed: true,
              boxedWidth: 1362,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              style: {
                maxWidth: '1362px',
                width: '1362px'
              },
              fullHeight: true
            }
          }, {
            cols: [],
            options: {
              boxed: true,
              boxedWidth: '100%',
              absolute: 'bottom',
              style: {
                maxWidth: '100%px',
                width: '100%px'
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'primary',
                  icon: null,
                  label: 'ثبت نام ',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'block',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: 'scroll',
                  scrollTo: 'courses',
                  route: 'https://danaapp.ir/browse?group=67',
                  eventName: null,
                  style: {
                    background: '#F5CB78',
                    paddingLeft: '50px',
                    paddingRight: '50px',
                    marginRight: 'auto',
                    marginTop: '50px',
                    paddingTop: '0',
                    paddingBottom: '0',
                    marginLeft: 'auto'
                  }
                }
              }]
            }],
            options: {}
          }]
        },
        options: {
          fullHeight: true,
          backgrounds: {
            xs: {
              size: 'cover',
              color: null,
              image: 'url("https://nodes.alaatv.com/upload/landing/Arash/back/5.jpg")',
              repeat: 'no-repeat',
              position: 'center center',
              attachment: null
            },
            sm: {
              size: 'cover',
              color: null,
              image: 'url("https://nodes.alaatv.com/upload/landing/Arash/back/4.jpg")',
              repeat: 'no-repeat',
              position: 'center center',
              attachment: null
            },
            md: {
              size: 'cover',
              color: null,
              image: 'url("https://nodes.alaatv.com/upload/landing/Arash/back/3.jpg")',
              repeat: 'no-repeat',
              position: 'center center',
              attachment: null
            },
            lg: {
              size: 'cover',
              color: null,
              image: 'url("https://nodes.alaatv.com/upload/landing/Arash/back/2.jpg")',
              repeat: 'no-repeat',
              position: 'center center',
              attachment: null
            },
            xl: {
              size: 'cover',
              color: null,
              image: 'url("https://nodes.alaatv.com/upload/landing/Arash/back/1.jpg")',
              repeat: 'no-repeat',
              position: 'center center',
              attachment: null
            }
          },
          verticalAlign: 'center',
          style: { minHeight: '100vh' }
        }
      },
      {
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#3D3F46',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '16px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '18px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '22px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '24px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '30px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '10px 0px 16px 10px',
                    marginTop: null,
                    marginBottom: '20px'
                  },
                  text: '<div style="text-align: center;"><font size="6"><span dir="RTL"></span><span dir="RTL"></span><b><span lang="FA" dir="RTL" style="line-height: 107%; font-family: IRANSans, serif;"><span dir="RTL" style=""></span><span dir="RTL" style=""></span>3 امتیاز کنکوری هایی که آرش ثبت نام میکنن؟</span></b></font><br></div>',
                  customClass: 'text-left'
                }
              }, {
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#3D3F46',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '14px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '16px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '20px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '26px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '10px 0px 16px 10px',
                    marginTop: null,
                    marginBottom: '20px'
                  },
                  text: '<div style="text-align: center;"><span lang="FA" dir="RTL" style="line-height: 107%; font-family: IRANSans, serif;"><font size="4">مخاطبین همایش آرش:</font></span><br></div>',
                  customClass: 'text-left'
                }
              }],
              options: {
                colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12',
                style: { paddingTop: '40px' }
              }
            }],
            options: {
              boxed: true,
              boxedWidth: 1362
            }
          }, {
            cols: [{
              widgets: [{
                name: 'FeatureBox',
                options: {
                  title: '1.\tفوق سریع در حل تست',
                  description: 'با مرور بسیار سریع (نهایتا توی 3 روز) 100% کنکور و تحلیل تیپ تست های احتمالی',
                  image: 'https://nodes.alaatv.com/upload/landing/Arash/back/1.png?w=93&h=93',
                  style: {}
                }
              }],
              options: { colNumber: 'col-12 col-md-4' }
            }, {
              widgets: [{
                name: 'FeatureBox',
                options: {
                  title: '2.\tشکارچی تست ها',
                  description: 'چون اشراف کامل به 100% نکات و مباحث کنکور دارن، هیچ تستی از دستشون فرار نمیکنه',
                  image: 'https://nodes.alaatv.com/upload/landing/Arash/back/2.png?w=93&h=93',
                  style: {}
                }
              }],
              options: { colNumber: 'col-12 col-md-4' }
            }, {
              widgets: [{
                name: 'FeatureBox',
                options: {
                  title: '3. افزایش تراز لحظه آخری',
                  description: 'کاملا ترکیبی تمام مباحث رو در کنارهم سریع مرور میکنن و برای خودشون مباحث مسلط بیشتری میسازن',
                  image: 'https://nodes.alaatv.com/upload/landing/Arash/back/3.png?w=93&h=93',
                  style: {}
                }
              }],
              options: { colNumber: 'col-12 col-md-4' }
            }],
            options: {
              height: 'auto',
              boxed: true,
              boxedWidth: 1362,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              style: {
                marginBottom: '40px',
                maxWidth: '1362px',
                width: '1362px'
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#3D3F46',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '14px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '20px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '28px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '32px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  className: '',
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '40px 0px 16px 10px',
                    marginTop: '40px'
                  },
                  text: '<div style="text-align: center;">بخشی از رتبه برتر های آلاء در کنکور سال قبل<br></div>',
                  customClass: 'text-left'
                }
              }],
              options: { colNumber: 'col-12' }
            }, {
              widgets: [{
                name: 'PersonSlider',
                options: {
                  sliderItems: [{
                    id: 1,
                    code: 'S0',
                    rank: 1,
                    first_name: 'کیارش',
                    last_name: 'شیخی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 2,
                    code: 'S1',
                    rank: 3,
                    first_name: 'فریدون',
                    last_name: 'صلح جو',
                    major: 'ریاضی',
                    distraction: 'سهمیه',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 3,
                    code: 'S2',
                    rank: 4,
                    first_name: 'امیر محمد',
                    last_name: 'رشیدی احمد آبادی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 4,
                    code: 'S3',
                    rank: 5,
                    first_name: 'فاطمه',
                    last_name: 'قهاری',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 5,
                    code: 'S4',
                    rank: 7,
                    first_name: 'سید علی',
                    last_name: 'الشریعتی',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 6,
                    code: 'S5',
                    rank: 11,
                    first_name: 'سعید ',
                    last_name: 'قربعلی',
                    major: 'ریاضی',
                    distraction: 'سهمیه ',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 7,
                    code: 'S6',
                    rank: 16,
                    first_name: 'محمد مهدی',
                    last_name: 'حاجی رحیم کاشی',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 8,
                    code: 'S7',
                    rank: 16,
                    first_name: 'محمد مهدی',
                    last_name: 'صالحی مورکانی',
                    major: 'انسانی',
                    distraction: 'سهمیه',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 9,
                    code: 'S8',
                    rank: 28,
                    first_name: 'امیررضا',
                    last_name: 'سعیدی',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 10,
                    code: 'S9',
                    rank: 30,
                    first_name: 'محمد مهدی',
                    last_name: 'زارعی',
                    major: 'انسانی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 11,
                    code: 'S10',
                    rank: 34,
                    first_name: 'مهیار',
                    last_name: 'اسماعیلی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 12,
                    code: 'S11',
                    rank: 36,
                    first_name: 'یگانه',
                    last_name: 'حاتم پورجزی',
                    major: 'ریاضی',
                    distraction: 'سهمیه',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 13,
                    code: 'S12',
                    rank: 37,
                    first_name: 'صهیب',
                    last_name: 'جوهری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 14,
                    code: 'S13',
                    rank: 40,
                    first_name: 'کسری',
                    last_name: 'کاظمی',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 15,
                    code: 'S14',
                    rank: 44,
                    first_name: 'آریا',
                    last_name: 'مختاری ورنوسفادرانی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 16,
                    code: 'S15',
                    rank: 45,
                    first_name: 'پریسا ',
                    last_name: 'یحیی پور فتیده',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 17,
                    code: 'S16',
                    rank: 54,
                    first_name: 'محمد',
                    last_name: 'اسکندری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 18,
                    code: 'S17',
                    rank: 56,
                    first_name: 'یوسف',
                    last_name: 'سدیدی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 19,
                    code: 'S18',
                    rank: 58,
                    first_name: 'صبا',
                    last_name: 'عفتی داریانی',
                    major: 'ریاضی',
                    distraction: 'سهمیه ',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 20,
                    code: 'S19',
                    rank: 69,
                    first_name: 'علیرضا',
                    last_name: 'رجائی نجف آبادی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 21,
                    code: 'S20',
                    rank: 70,
                    first_name: 'علیرضا',
                    last_name: 'مختاری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 22,
                    code: 'S21',
                    rank: 77,
                    first_name: 'سعید ',
                    last_name: 'ملائی یلی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 23,
                    code: 'S22',
                    rank: 79,
                    first_name: 'فاطمه ',
                    last_name: 'خواجه وند کاجی',
                    major: 'انسانی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 24,
                    code: 'S23',
                    rank: 97,
                    first_name: 'بنیامین',
                    last_name: 'کاربخش',
                    major: 'انسانی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 25,
                    code: 'S24',
                    rank: 123,
                    first_name: 'آرین',
                    last_name: 'شعبانی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 26,
                    code: 'S25',
                    rank: 125,
                    first_name: 'فاطمه',
                    last_name: 'میرزایی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 27,
                    code: 'S26',
                    rank: 128,
                    first_name: 'محمد حسین',
                    last_name: 'جعفری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 28,
                    code: 'S27',
                    rank: 179,
                    first_name: 'آرش',
                    last_name: 'اسلامی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 29,
                    code: 'S28',
                    rank: 188,
                    first_name: 'حسن ',
                    last_name: 'کشتکار',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 30,
                    code: 'S29',
                    rank: 192,
                    first_name: 'فاطمه السادات',
                    last_name: 'میر ابوطالبی',
                    major: 'انسانی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 31,
                    code: 'S30',
                    rank: 209,
                    first_name: 'محمد عرفان',
                    last_name: 'کلماتیان',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 32,
                    code: 'S31',
                    rank: 209,
                    first_name: 'آرش',
                    last_name: 'زمانی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 33,
                    code: 'S32',
                    rank: 217,
                    first_name: 'نگار',
                    last_name: 'خزائلی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 34,
                    code: 'S33',
                    rank: 234,
                    first_name: 'محسن',
                    last_name: 'اسماعیلی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 35,
                    code: 'S34',
                    rank: 263,
                    first_name: 'علی',
                    last_name: 'امانی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 36,
                    code: 'S35',
                    rank: 273,
                    first_name: 'محمد رضا',
                    last_name: 'رضایی تفتی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 37,
                    code: 'S36',
                    rank: 280,
                    first_name: 'حسین',
                    last_name: 'حسین زاده',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 38,
                    code: 'S37',
                    rank: 281,
                    first_name: 'طاها',
                    last_name: 'صحرایی دمیرچی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 39,
                    code: 'S38',
                    rank: 281,
                    first_name: 'امیررضا',
                    last_name: 'سلیمانی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 40,
                    code: 'S39',
                    rank: 285,
                    first_name: 'مهدی',
                    last_name: 'چشم براه',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 41,
                    code: 'S40',
                    rank: 305,
                    first_name: 'مریم',
                    last_name: 'تقی پور کازرونی',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 42,
                    code: 'S41',
                    rank: 308,
                    first_name: 'محمد حسین',
                    last_name: 'حسینیان اصفهانی',
                    major: 'انسانی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 43,
                    code: 'S42',
                    rank: 325,
                    first_name: 'امیر رضا',
                    last_name: 'شهرکی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 44,
                    code: 'S43',
                    rank: 328,
                    first_name: 'امیر',
                    last_name: 'همایون زاده',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 45,
                    code: 'S44',
                    rank: 332,
                    first_name: 'سجاد',
                    last_name: 'یعقوبی',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 46,
                    code: 'S45',
                    rank: 346,
                    first_name: 'محمد رضا',
                    last_name: 'محمد لو',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 47,
                    code: 'S46',
                    rank: 368,
                    first_name: 'محمد سعید',
                    last_name: 'یاری',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 48,
                    code: 'S47',
                    rank: 368,
                    first_name: 'رضا',
                    last_name: 'مرادی راد',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 49,
                    code: 'S48',
                    rank: 370,
                    first_name: 'امید',
                    last_name: 'خدادادی',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 50,
                    code: 'S49',
                    rank: 371,
                    first_name: 'حامد',
                    last_name: 'فرجی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 51,
                    code: 'S50',
                    rank: 373,
                    first_name: 'محمد رضا',
                    last_name: 'نشاطی پیربرج',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 52,
                    code: 'S51',
                    rank: 378,
                    first_name: 'فاطمه',
                    last_name: 'مهدی چهلخانه',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 53,
                    code: 'S52',
                    rank: 385,
                    first_name: 'امیررضا',
                    last_name: 'محمد باقری',
                    major: 'تجربی',
                    distraction: 'سهمیه',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 54,
                    code: 'S53',
                    rank: 400,
                    first_name: 'آرین',
                    last_name: 'سلیمی',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 55,
                    code: 'S54',
                    rank: 409,
                    first_name: 'فاطمه',
                    last_name: 'نوروزی چم یوسفعلی',
                    major: 'انسانی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 56,
                    code: 'S55',
                    rank: 419,
                    first_name: 'علی',
                    last_name: 'بوغنیمه',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 57,
                    code: 'S56',
                    rank: 437,
                    first_name: 'سارینا',
                    last_name: 'کریمی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 58,
                    code: 'S57',
                    rank: 450,
                    first_name: 'محسن',
                    last_name: 'زارع زاده',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 59,
                    code: 'S58',
                    rank: 464,
                    first_name: 'کیان',
                    last_name: 'غلام زاده',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 60,
                    code: 'S59',
                    rank: 469,
                    first_name: 'علیرضا',
                    last_name: 'سعیدی نجات',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 61,
                    code: 'S60',
                    rank: 479,
                    first_name: 'امیر محمد',
                    last_name: 'عبدالملکی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 62,
                    code: 'S61',
                    rank: 483,
                    first_name: 'محسن',
                    last_name: 'تفک',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 63,
                    code: 'S62',
                    rank: 495,
                    first_name: 'مهرانه',
                    last_name: 'خسروی',
                    major: 'انسانی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 64,
                    code: 'S63',
                    rank: 499,
                    first_name: 'امیر حسین',
                    last_name: 'رجبی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 66,
                    code: 'S65',
                    rank: 534,
                    first_name: 'مهدی',
                    last_name: 'عبدالملکی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 67,
                    code: 'S66',
                    rank: 535,
                    first_name: 'حسین',
                    last_name: 'قمی',
                    major: 'ریاضی',
                    distraction: 'سهمیه ',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 68,
                    code: 'S67',
                    rank: 538,
                    first_name: 'محمد',
                    last_name: 'پیرزاده',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 69,
                    code: 'S68',
                    rank: 553,
                    first_name: 'مهدی',
                    last_name: 'خیبری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 70,
                    code: 'S69',
                    rank: 558,
                    first_name: 'عرفان',
                    last_name: 'فاضلی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 71,
                    code: 'S70',
                    rank: 563,
                    first_name: 'مدیا',
                    last_name: 'وکیلباشی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 73,
                    code: 'S72',
                    rank: 629,
                    first_name: 'زهرا',
                    last_name: 'عادل پور',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 74,
                    code: 'S73',
                    rank: 672,
                    first_name: 'محمد امین',
                    last_name: 'غلامی علم',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 75,
                    code: 'S74',
                    rank: 677,
                    first_name: 'عرفان',
                    last_name: 'قاسمی',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 76,
                    code: 'S75',
                    rank: 699,
                    first_name: 'امیرحسین',
                    last_name: 'صالحی',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 77,
                    code: 'S76',
                    rank: 714,
                    first_name: 'حامد',
                    last_name: 'یحیائیان',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 78,
                    code: 'S77',
                    rank: 717,
                    first_name: 'علی',
                    last_name: 'فرشباف محجوب',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 79,
                    code: 'S78',
                    rank: 727,
                    first_name: 'کسری',
                    last_name: 'عطایی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 80,
                    code: 'S79',
                    rank: 736,
                    first_name: 'محمد حسین',
                    last_name: 'آقاپور خوئی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 81,
                    code: 'S80',
                    rank: 740,
                    first_name: 'محمد امین',
                    last_name: 'محمدیون شبستری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 82,
                    code: 'S81',
                    rank: 747,
                    first_name: 'امید رضا',
                    last_name: 'صادقی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 83,
                    code: 'S82',
                    rank: 757,
                    first_name: 'سارا',
                    last_name: 'غضنفری',
                    major: 'تجربی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 84,
                    code: 'S83',
                    rank: 760,
                    first_name: 'آرمان',
                    last_name: 'بهزاد',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 85,
                    code: 'S84',
                    rank: 792,
                    first_name: 'امیر محمد',
                    last_name: 'خالقی فر',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 86,
                    code: 'S85',
                    rank: 794,
                    first_name: 'علی اصغر',
                    last_name: 'اصغرپور',
                    major: 'ریاضی',
                    distraction: 'سهمیه',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 87,
                    code: 'S86',
                    rank: 802,
                    first_name: 'محمد صالح',
                    last_name: 'صدیقی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 88,
                    code: 'S87',
                    rank: 814,
                    first_name: 'سید علی',
                    last_name: 'طاهری پور',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 89,
                    code: 'S88',
                    rank: 828,
                    first_name: 'علی',
                    last_name: 'توکلی',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 90,
                    code: 'S89',
                    rank: 841,
                    first_name: 'علی',
                    last_name: 'اشکوری',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 91,
                    code: 'S90',
                    rank: 855,
                    first_name: 'امیر حسین',
                    last_name: 'حاجی هاشمی ورنوسفادرانی',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 92,
                    code: 'S91',
                    rank: 855,
                    first_name: 'احمد',
                    last_name: 'سوری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 93,
                    code: 'S92',
                    rank: 876,
                    first_name: 'علی',
                    last_name: 'اصلانی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 94,
                    code: 'S93',
                    rank: 876,
                    first_name: 'مهدی',
                    last_name: 'قربانی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 95,
                    code: 'S94',
                    rank: 879,
                    first_name: 'فاطمه',
                    last_name: 'ندافی قهنویه',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 96,
                    code: 'S95',
                    rank: 894,
                    first_name: 'رویا ',
                    last_name: 'گرزالدین',
                    major: 'انسانی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 97,
                    code: 'S96',
                    rank: 898,
                    first_name: 'علیرضا',
                    last_name: 'ناصری بازیاری',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 98,
                    code: 'S97',
                    rank: 902,
                    first_name: 'عرفان',
                    last_name: 'حدیدی',
                    major: 'انسانی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 99,
                    code: 'S98',
                    rank: 914,
                    first_name: 'مبینا',
                    last_name: 'کوسه غراوی',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 100,
                    code: 'S99',
                    rank: 928,
                    first_name: 'امیرحسین',
                    last_name: 'کدیور جلیانی',
                    major: 'ریاضی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 101,
                    code: 'S100',
                    rank: 938,
                    first_name: 'امیررضا',
                    last_name: 'اصغرزاده',
                    major: 'ریاضی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 102,
                    code: 'S101',
                    rank: 951,
                    first_name: 'علیرضا',
                    last_name: 'عباس زاده',
                    major: 'تجربی',
                    distraction: '3',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 103,
                    code: 'S102',
                    rank: 971,
                    first_name: 'امیر علی ',
                    last_name: 'فتاح پسند',
                    major: 'ریاضی',
                    distraction: '2',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }, {
                    id: 104,
                    code: 'S103',
                    rank: 999,
                    first_name: 'صادق',
                    last_name: 'پروانه',
                    major: 'تجربی',
                    distraction: '1',
                    created_at: '2022-09-07 17:16:59',
                    updated_at: null,
                    deleted_at: null
                  }],
                  style: {}
                }
              }],
              options: { colNumber: 'col-12' }
            }],
            options: {
              height: 'auto',
              boxed: false,
              boxedWidth: 1362,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              style: {
                width: null,
                maxWidth: null
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  fontFamily: null,
                  color: '#3D3F46',
                  fontSize: null,
                  fontWeight: null,
                  fontStyle: null,
                  xs: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '20px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '28px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '32px',
                    fontWeight: '600',
                    fontStyle: 'normal'
                  },
                  className: 'feature',
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '40px 0px 16px 10px',
                    marginTop: '40px'
                  },
                  text: '<div style="text-align: center;"><b>آلاء توی همایش آرش چه شاهکاری براتون خلق کرده؟</b></div>',
                  customClass: 'text-left'
                }
              }],
              options: {
                style: {
                  paddingLeft: null,
                  paddingRight: null
                },
                colNumber: 'col-md-12 col-xs-12 col-sm-12 col-lg-12 col-xl-12'
              }
            }, {
              widgets: [{
                name: 'ExpansionPanel',
                options: {
                  expansionList: [{
                    id: 1,
                    label: 'جمع بندی 3 روزه',
                    caption: 'این یه جمع بندی سرعتی با پوشش کامل کنکوره',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">توی 3 روز‌ (مجموعا حدود 15 ساعت) هر درس رو بصورت جامع\nبا تحلیل کامل تیپ تست هاش جمع بندی می‌کنیم و نه‌تنها کل کنکور رو کاملا تستی مرور،\nبلکه با تکنیک های حل هر نوع تست هم آشنا میشیم.</span>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;',
                    expanded: false,
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    sm: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    md: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    lg: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    xl: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    }
                  }, {
                    id: 2,
                    label: 'مرور 100% کتاب',
                    caption: 'مرور و تثبیت ذهنی تمام نکات و مباحث',
                    text: 'این فوق العادس که 100% نکات کتاب رو توی 3 روز، یکجا مرور کنی و بار ها و بار ها میتونی بررسیشون کنی و ملکه ذهنت بشه. هیچ استرسی از بابت فراموشی نداری و با تسلط هر سوالی رو حل میکنی.',
                    expanded: false,
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    sm: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    md: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    lg: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    xl: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    }
                  }, {
                    label: 'نکته و تست محور',
                    caption: 'لازمه که در قالب تست، نکات مرور بشه',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">استاندارد ترین و حرفه‌ای ترین شیوه جمع بندی و مرور\nکنکور علی الخصوص در روز های پایانی، تحلیل تیپ تست ها بصورت کامل و جامع است. توی\nهمایش آرش آلاء، بصورت کامل همه نکات در قالب تحلیل تست ها میبینی و مرور و جمع\nبندی میکنی.</span>',
                    expanded: false,
                    fontFamily: null,
                    color: null,
                    fontSize: null,
                    fontWeight: null,
                    fontStyle: null,
                    xs: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    sm: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    md: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    lg: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    },
                    xl: {
                      fontSize: null,
                      fontWeight: null,
                      fontStyle: null
                    }
                  }],
                  expandIconClass: 'fire-day-expantion-icon',
                  theme: 'theme2',
                  dense: true,
                  marginBottom: '5px',
                  height: 'auto',
                  boxed: true,
                  boxedWidth: 1200,
                  style: { padding: '40px 0px 16px 10px' },
                  toggle: true
                }
              }],
              options: {
                className: 'flex flex-center',
                colNumber: 'col-md-6 col-sm-12 col-xs-12'
              }
            }, {
              widgets: [{
                name: 'ImageWidget',
                options: {
                  height: null,
                  boxed: true,
                  boxedWidth: 1200,
                  imageSource: 'https://nodes.alaatv.com/upload/landing/110/4.png',
                  xs: {
                    height: '300px',
                    width: '300px'
                  },
                  sm: {
                    height: '300px',
                    width: '300px'
                  },
                  md: {
                    height: '400px',
                    width: '400px'
                  },
                  lg: {
                    height: '500px',
                    width: '500px'
                  },
                  xl: {
                    height: '500px',
                    width: '500px'
                  }
                }
              }],
              options: {
                className: 'flex flex-center',
                colNumber: 'col-md-6 col-sm-12 col-xs-12'
              }
            }],
            options: {
              height: 'auto',
              boxed: true,
              boxedWidth: 1362,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              style: {
                marginBottom: '70px',
                maxWidth: '1362px',
                width: '1362px'
              }
            }
          }]
        },
        options: {
          fullHeight: 'calc( 100vh - 72px )',
          backgrounds: {
            xs: {
              size: null,
              color: null,
              image: null,
              repeat: null,
              position: null,
              attachment: null
            },
            sm: {
              size: null,
              color: null,
              image: null,
              repeat: null,
              position: null,
              attachment: null
            },
            md: {
              size: null,
              color: null,
              image: null,
              repeat: null,
              position: null,
              attachment: null
            },
            lg: {
              size: null,
              color: null,
              image: null,
              repeat: null,
              position: null,
              attachment: null
            },
            xl: {
              size: null,
              color: null,
              image: null,
              repeat: null,
              position: null,
              attachment: null
            }
          },
          verticalAlign: 'start',
          style: {
            background: '#FFFFFF',
            minHeight: 'calc( 100vh - 72px )'
          },
          className: 'feature'
        }
      }, {
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '20px 0px 16px 10px',
                    marginTop: '70px'
                  },
                  text: '<div style="text-align: center;">ثبت نام</div>',
                  color: '#3D3F46',
                  customClass: 'text-center',
                  xs: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '20px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '28px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '32px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  }
                }
              }],
              options: { colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12' }
            }, {
              widgets: [],
              options: { colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12' }
            }],
            options: {
              boxed: true,
              boxedWidth: 1362
            }
          }, {
            cols: [{
              widgets: [{
                name: 'ProductsTabPanel',
                options: {
                  data: [{
                    options: {
                      layout: 'ProductShelf',
                      activeColor: 'white',
                      activeBgColor: 'yellow',
                      indicatorColor: 'yellow'
                    },
                    type: 'GroupList',
                    data: [{
                      options: {
                        layout: 'GridRow',
                        labelStyle: {
                          color: '',
                          fontSize: '',
                          textAlign: 'center'
                        },
                        label: 'پک کامل دوره (دروس انتخابی)'
                      },
                      type: 'ProductList',
                      data: [{
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1065,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'پک کامل همایش آنلاین آرش (رشته تجربی)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/pack_tajrobi_20230521081757.jpg',
                        attributes: {
                          info: {
                            teacher: ['گروه آموزشی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['70 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 2550000,
                          discount: 892500,
                          final: 1657500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1066,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'پک کامل همایش آنلاین آرش (رشته ریاضی)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/pack_riazi_20230521081744.jpg',
                        attributes: {
                          info: {
                            teacher: ['گروه آموزشی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['70 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 2750000,
                          discount: 962499,
                          final: 1787501,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }]
                    }]
                  }],
                  style: { padding: '' },
                  className: ''
                }
              }, {
                name: 'ProductsTabPanel',
                options: {
                  data: [{
                    options: {
                      layout: 'ProductTab',
                      activeColor: 'white',
                      activeBgColor: 'yellow',
                      indicatorColor: 'yellow'
                    },
                    type: 'GroupList',
                    data: [{
                      options: {
                        layout: 'GridRow',
                        labelStyle: {
                          color: '',
                          fontSize: '',
                          textAlign: ''
                        },
                        label: 'نوبت صبح آرش'
                      },
                      type: 'ProductList',
                      data: [{
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1077,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - حسابان همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/hesaban_20230521081229.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمد صادق ثابتی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1078,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - زیست شناسی همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/zist_20230521081213.jpg',
                        attributes: {
                          info: {
                            teacher: ['امیر کبیری راد'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1079,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - فیزیک همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/fizik_20230521081347.jpg',
                        attributes: {
                          info: {
                            teacher: ['رضا محمدی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی', 'تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1080,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - شیمی همایش آنلاین آرش (حاجی سلیمانی)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/shimi_20230521081716.jpg',
                        attributes: {
                          info: {
                            teacher: ['روح الله حاجی سلیمانی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی', 'تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1071,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - شیمی همایش آنلاین آرش (توسلی فر)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/shimi_20230521081716.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمد علی توسلی فر'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی', 'تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1082,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - گسسته همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/gosaste_20230521081638.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمد رضا حسینی فرد'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1083,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره صبح - زمین شناسی همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/axmahsol_20230524074726.jpg',
                        attributes: {
                          info: {
                            teacher: ['شکیبا کریمی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['10 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 350000,
                          discount: 87500,
                          final: 262500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }]
                    }, {
                      options: {
                        layout: 'GridRow',
                        labelStyle: {
                          color: '',
                          fontSize: '',
                          textAlign: ''
                        },
                        label: 'نوبت عصر آرش'
                      },
                      type: 'ProductList',
                      data: [{
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1068,
                          redirect_url: null,
                          title: 'دوره عصر - حسابان همایش آنلاین آرش',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1068',
                            api: 'http://office.alaa.tv:700/api/v2/product/1068'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/hesaban_20230521081229.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['سیروس نصیری'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['ریاضی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1068,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - حسابان همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/hesaban_20230521081229.jpg',
                        attributes: {
                          info: {
                            teacher: ['سیروس نصیری'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1069,
                          redirect_url: null,
                          title: 'دوره عصر - زیست شناسی همایش آنلاین آرش',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1069',
                            api: 'http://office.alaa.tv:700/api/v2/product/1069'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/zist_20230521081213.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['علی جوهری'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['تجربی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1069,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - زیست شناسی همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/zist_20230521081213.jpg',
                        attributes: {
                          info: {
                            teacher: ['علی جوهری'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1070,
                          redirect_url: null,
                          title: 'دوره عصر - فیزیک همایش آنلاین آرش',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1070',
                            api: 'http://office.alaa.tv:700/api/v2/product/1070'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/fizik_20230521081347.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['محمدرضا یاری'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['ریاضی', 'تجربی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1070,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - فیزیک همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/fizik_20230521081347.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمدرضا یاری'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی', 'تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1072,
                          redirect_url: null,
                          title: 'دوره عصر - هندسه همایش آنلاین آرش (حسینی فرد)',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1072',
                            api: 'http://office.alaa.tv:700/api/v2/product/1072'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/hendese_20230521081702.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['محمد رضا حسینی فرد'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['ریاضی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1072,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - هندسه همایش آنلاین آرش (حسینی فرد)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/hendese_20230521081702.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمد رضا حسینی فرد'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1081,
                          redirect_url: null,
                          title: 'دوره عصر - هندسه همایش آنلاین آرش (کبریایی)',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1081',
                            api: 'http://office.alaa.tv:700/api/v2/product/1081'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/hendese_20230521081702.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['وحید کبریایی'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['ریاضی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1081,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - هندسه همایش آنلاین آرش (کبریایی)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/hendese_20230521081702.jpg',
                        attributes: {
                          info: {
                            teacher: ['وحید کبریایی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1073,
                          redirect_url: null,
                          title: 'دوره عصر - گسسته همایش آنلاین آرش',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1073',
                            api: 'http://office.alaa.tv:700/api/v2/product/1073'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/gosaste_20230521081638.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['رسول حاجی زاده'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['ریاضی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1073,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - گسسته همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/gosaste_20230521081638.jpg',
                        attributes: {
                          info: {
                            teacher: ['رسول حاجی زاده'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['ریاضی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1076,
                          redirect_url: null,
                          title: 'دوره عصر - ریاضیات تجربی همایش آنلاین آرش (نصیری)',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1076',
                            api: 'http://office.alaa.tv:700/api/v2/product/1076'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/riazi_t_20230521081033.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['سیروس نصیری'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['تجربی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1076,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - ریاضیات تجربی همایش آنلاین آرش (نصیری)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/riazi_t_20230521081033.jpg',
                        attributes: {
                          info: {
                            teacher: ['سیروس نصیری'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1067,
                          redirect_url: null,
                          title: 'دوره عصر - ریاضیات تجربی همایش آنلاین آرش (ثابتی)',
                          price: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1067',
                            api: 'http://office.alaa.tv:700/api/v2/product/1067'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/riazi_t_20230521081033.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['محمد صادق ثابتی'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['تجربی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['15 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1067,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - ریاضیات تجربی همایش آنلاین آرش (ثابتی)',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/riazi_t_20230521081033.jpg',
                        attributes: {
                          info: {
                            teacher: ['محمد صادق ثابتی'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['15 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 550000,
                            discount: 137500,
                            final: 412500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 550000,
                          discount: 137500,
                          final: 412500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }, {
                        crud: { headers: {} },
                        apiResource: null,
                        inputData: {
                          id: 1084,
                          redirect_url: null,
                          title: 'دوره عصر - زمین شناسی همایش آنلاین آرش',
                          price: {
                            base: 350000,
                            discount: 87500,
                            final: 262500,
                            payableByWallet: null
                          },
                          url: {
                            web: 'http://office.alaa.tv:700/product/1084',
                            api: 'http://office.alaa.tv:700/api/v2/product/1084'
                          },
                          photo: 'https://nodes.alaatv.com/upload/images/product/axmahsol_20230524074710.jpg',
                          redirect_code: null,
                          attributes: {
                            info: {
                              teacher: ['لیلی نظیف'],
                              shipping_method: ['دانلودی', 'آنلاین'],
                              major: ['تجربی'],
                              services: ['فیلم', 'جزوه'],
                              download_date: ['پیش فروش'],
                              educational_system: ['نظام جدید'],
                              duration: ['10 ساعت'],
                              production_year: ['ویژه کنکور 1402']
                            },
                            extra: null,
                            subscription: null
                          },
                          category: null,
                          variant: '-',
                          is_purchased: false
                        },
                        warn: {
                          mode: false,
                          keys: []
                        },
                        editMode: false,
                        loading: false,
                        props: [{ key: 'id' }, { key: 'redirect_url' }, { key: 'type' }, { key: 'category' }, { key: 'title' }, { key: 'teacher_name' }, { key: 'teacher_image' }, { key: 'is_free' }, { key: 'photo' }, { key: 'attributes' }, {
                          key: 'description',
                          default: {
                            long: null,
                            short: null,
                            slogan: null
                          }
                        }, { key: 'longDescription' }, { key: 'last_content_user_watched' }, { key: 'specialDescription' }, { key: 'sets' }, { key: 'price' }, {
                          key: 'isFavored',
                          default: false
                        }, {
                          key: 'is_favored_2',
                          default: false
                        }, {
                          key: 'is_favored',
                          default: false
                        }, { key: 'catalog' }, { key: 'eec' }, {
                          key: 'sample_photos',
                          default: []
                        }, { key: 'intro' }, {
                          key: 'blocks',
                          default: []
                        }],
                        id: 1084,
                        redirect_url: null,
                        type: null,
                        category: null,
                        title: 'دوره عصر - زمین شناسی همایش آنلاین آرش',
                        teacher_name: null,
                        teacher_image: null,
                        is_free: null,
                        photo: 'https://nodes.alaatv.com/upload/images/product/axmahsol_20230524074710.jpg',
                        attributes: {
                          info: {
                            teacher: ['لیلی نظیف'],
                            shipping_method: ['دانلودی', 'آنلاین'],
                            major: ['تجربی'],
                            services: ['فیلم', 'جزوه'],
                            download_date: ['پیش فروش'],
                            educational_system: ['نظام جدید'],
                            duration: ['10 ساعت'],
                            production_year: ['ویژه کنکور 1402']
                          },
                          extra: null,
                          subscription: null
                        },
                        description: {
                          long: null,
                          short: null,
                          slogan: null
                        },
                        longDescription: null,
                        last_content_user_watched: null,
                        specialDescription: null,
                        sets: {
                          list: [],
                          crud: { headers: {} },
                          loading: false,
                          baseRoute: null
                        },
                        price: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {
                            base: 350000,
                            discount: 87500,
                            final: 262500,
                            payableByWallet: null
                          },
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'extraCost' }, { key: 'base' }, { key: 'discount' }, { key: 'final' }, { key: 'payableByWallet' }, { key: 'discountDetail' }],
                          extraCost: null,
                          base: 350000,
                          discount: 87500,
                          final: 262500,
                          payableByWallet: null,
                          discountDetail: null
                        },
                        isFavored: false,
                        is_favored_2: false,
                        is_favored: false,
                        catalog: null,
                        eec: {
                          crud: { headers: {} },
                          apiResource: null,
                          inputData: {},
                          warn: {
                            mode: false,
                            keys: []
                          },
                          editMode: false,
                          loading: false,
                          props: [{ key: 'id' }, { key: 'name' }, { key: 'price' }, {
                            key: 'brand',
                            default: 'آلاء'
                          }, { key: 'category' }, { key: 'variant' }, {
                            key: 'quantity',
                            default: '-'
                          }, { key: 'list' }, { key: 'position' }],
                          id: null,
                          name: null,
                          price: null,
                          brand: 'آلاء',
                          category: null,
                          variant: null,
                          quantity: '-',
                          list: null,
                          position: null
                        },
                        sample_photos: [],
                        intro: null,
                        blocks: []
                      }]
                    }]
                  }],
                  style: { padding: '' },
                  className: ''
                }
              }],
              options: { colNumber: 'col-12' }
            }],
            options: {
              boxed: true,
              boxedWidth: 1362
            }
          }]
        },
        options: {
          className: 'courses',
          fullHeight: true,
          verticalAlign: 'start',
          style: {
            background: '#FFFFFF',
            minHeight: '100vh'
          }
        }
      },
      {
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'TextWidget',
                options: {
                  height: 'auto',
                  boxed: false,
                  boxedWidth: 1200,
                  style: {
                    padding: '20px 0px 16px 10px',
                    marginTop: null
                  },
                  text: '<div style="text-align: center;">سوالات متداول</div>',
                  color: '#3D3F46',
                  customClass: 'text-center',
                  xs: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  sm: {
                    fontSize: '18px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  md: {
                    fontSize: '20px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  lg: {
                    fontSize: '28px',
                    fontWeight: '400',
                    fontStyle: 'normal'
                  },
                  xl: {
                    fontSize: '32px',
                    fontWeight: '500',
                    fontStyle: 'normal'
                  }
                }
              }],
              options: { colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12' }
            }],
            options: {
              boxed: true,
              boxedWidth: 1362
            }
          }, {
            cols: [{
              widgets: [{
                name: 'ExpansionPanel',
                options: {
                  expansionList: [{
                    id: 1,
                    label: 'این همایش چطوری و کِی برگزار میشه؟',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">این همایش ها برای هر درس اختصاصی نهایتا در 3 روز\n(مجموعا حدود 15 ساعت) و به شکل آنلاین برگزار خواهد شد. تاریخ برگزاری کلاس ها 26\nخرداد الی 9 تیر ماه خواهد بود.</span>',
                    expanded: false
                  }, {
                    label: 'حجم همایش چقدره؟ جمع میشه روزای آخر؟',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">اصلا برگ برنده همایش آرش آلاء، فوق سریع و ضربتی\nبودنشه و نکته و تست محوره. البته نکته قابل توجه‌ش اینکه براتون 100% مباحث رو\nپوشش میدیم و تمام قلق ها برای حل تیپ تست ها بهتون داده میشه. فقط 3 روز (مجموعا\nهر درس حدود 15 ساعت) برای مرور کل کنکور و تحلیل تیپ تست ها با آرش آلاء زمان\nنیاز داری.</span>',
                    expanded: false
                  }, {
                    label: 'جزوه های دوره در اختیارمون قرار میگیره؟',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">بله قطعا. فایل جزوات و هر محتوایی که مورد نیازتون\nباشه،‌ آلاء در همایش آرش بهتون ارائه میده.</span>',
                    expanded: false
                  }, {
                    label: 'برای چه سطح داوطلبی همایش آرش آلاء مناسبه؟',
                    caption: '',
                    text: '<span lang="FA" dir="RTL" style="font-size:12.0pt;\nline-height:107%;font-family:&quot;IRANSans&quot;,serif;mso-fareast-font-family:Calibri;\nmso-fareast-theme-font:minor-latin;mso-ansi-language:EN-US;mso-fareast-language:\nEN-US;mso-bidi-language:FA">این همایش نکته و تست محوره؛ یعنی تیپ تست ها با پوشش\n100% مباحث کنکور در سطوح مختلف ارائه و توسط مدرس دوره، کامل تحلیل میشه. درسنامه‌ای\nوجود نداره و شما با یک همایش کاملا تستی و سریع با جمع بندی تمام نکات رو به رو\nهستید که قراره قدرت حل تست شما و سرعت مرور شما رو چندین برابر کنه و قلق های حل\nتست در لحظه آخر بهتون آموزش بده.</span>',
                    expanded: false
                  }],
                  expandIconClass: null,
                  theme: null,
                  dense: false,
                  marginBottom: '100px',
                  height: 'auto',
                  boxed: true,
                  boxedWidth: 1200,
                  style: {
                    padding: '10px 0px 16px 10px',
                    background: '#FFFFFF',
                    borderRadius: '30px',
                    marginBottom: '40px'
                  },
                  bordered: true
                }
              }],
              options: { colNumber: 'col-12' }
            }],
            options: {
              boxed: true,
              boxedWidth: 1362
            }
          }]
        },
        options: {
          className: 'faq-row',
          fullHeight: false,
          verticalAlign: 'start',
          style: {
            background: '#F9F4EF',
            minHeight: 'auto'
          }
        }
      }]))
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
