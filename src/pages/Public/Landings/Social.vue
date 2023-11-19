<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Social',
  mixins: [mixinPageOptions],
  data () {
    return {
      pageConfig: {},
      sections: [{
        data: {
          rows: [{
            cols: [{
              widgets: [{
                name: 'ImageWidget',
                options: {
                  imageSource: 'https://nodes.alaatv.com/upload/landing/33/social-landing-top-menu-title.png',
                  ratio: null,
                  hasAction: false,
                  action: {
                    name: null,
                    route: null,
                    scrollTo: null,
                    eventName: null,
                    eventArgs: null
                  },
                  xs: {
                    height: null,
                    width: null,
                    src: null
                  },
                  sm: {
                    height: null,
                    width: null,
                    src: null
                  },
                  md: {
                    height: '150px',
                    width: '150px',
                    src: 'https://nodes.alaatv.com/upload/landing/33/social-landing-top-menu-title.png'
                  },
                  lg: {
                    height: '150px',
                    width: '150px',
                    src: 'https://nodes.alaatv.com/upload/landing/33/social-landing-top-menu-title.png'
                  },
                  xl: {
                    height: null,
                    width: null,
                    src: null
                  },
                  style: {}
                }
              }, { name: 'Separator' }, {
                name: 'TextWidget',
                options: {
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
                  },
                  style: {
                    marginBottom: '20px',
                    marginTop: '20px'
                  },
                  text: '<div style="text-align: center;"><font color="#ffffff" size="4"><b style="">به مدرسه آنلاین آلاء خوش اومدی!</b></font></div>'
                }
              }],
              options: {
                style: { marginTop: '30px' },
                className: 'text-center'
              }
            }],
            options: {
              className: '',
              height: 'auto',
              boxed: true,
              boxedWidth: 1200,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              paddingOfBoxedInFullWidth: '30px',
              style: {
                maxWidth: '1200px',
                width: '1200px',
                marginTop: ''
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'ImageWidget',
                options: {
                  imageSource: 'https://nodes.alaatv.com/upload/landing/37/logo.png',
                  ratio: null,
                  hasAction: false,
                  action: {
                    name: null,
                    route: null,
                    scrollTo: null,
                    eventName: null,
                    eventArgs: null
                  },
                  xs: {
                    height: null,
                    width: null,
                    src: null
                  },
                  sm: {
                    height: null,
                    width: null,
                    src: null
                  },
                  md: {
                    height: null,
                    width: null,
                    src: null
                  },
                  lg: {
                    height: null,
                    width: null,
                    src: null
                  },
                  xl: {
                    height: null,
                    width: null,
                    src: null
                  },
                  style: {}
                }
              }],
              options: {
                style: {},
                colNumber: 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'
              }
            }, {
              widgets: [{
                name: 'TextWidget',
                options: {
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
                  },
                  style: {},
                  text: '<div style="text-align: center;"><font color="#ffffff">تا شروع جمع بندی 50 روزه</font></div>'
                }
              }, {
                name: 'TextWidget',
                options: {
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
                  },
                  style: {},
                  text: '<div style="text-align: center;"><font color="#ffffff">تایمر: .......</font></div>'
                }
              }, {
                name: 'TextWidget',
                options: {
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
                  },
                  style: {},
                  text: '<div style="text-align: center;"><font color="#ffffff">تا پایان تخفیف ها</font></div>'
                }
              }],
              options: {
                style: {},
                colNumber: 'col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xl-6'
              }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'primary',
                  icon: null,
                  label: 'ثبت نام رایگان چتر نجات آلاء',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: 'link',
                  scrollTo: null,
                  route: '/landing/37',
                  eventName: null,
                  style: {
                    backgroundColor: '',
                    marginLeft: '',
                    marginRight: '',
                    paddingLeft: '',
                    marginTop: ''
                  }
                }
              }],
              options: {
                style: {
                  marginLeft: '',
                  marginRight: '',
                  paddingLeft: '',
                  paddingRight: ''
                },
                colNumber: 'col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12'
              }
            }],
            options: {
              className: '',
              height: 'auto',
              boxed: true,
              boxedWidth: 1200,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              paddingOfBoxedInFullWidth: '30px',
              style: {
                maxWidth: '1200px',
                width: '1200px',
                backgroundColor: 'rgba(65, 65, 65, 1)',
                paddingLeft: '15px',
                paddingTop: '15px',
                paddingRight: '15px',
                paddingBottom: '15px',
                marginBottom: '20px'
              }
            }
          }, {
            cols: [{
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'وبسایت آلاء',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: {}
                }
              }],
              options: { style: { marginLeft: '5px' } }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'دوره های آلاء',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: {}
                }
              }],
              options: {
                style: {
                  marginLeft: '5px',
                  marginRight: '5px'
                }
              }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'آخرین نسخه اپلیکیشن',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: { marginRight: '5px' }
                }
              }],
              options: { style: {} }
            }, {
              widgets: [{
                name: 'TextWidget',
                options: {
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
                  },
                  style: { marginBottom: '10px' },
                  text: '<div style="text-align: right;"><font color="#ffffff" size="4"><b>راه های ارتباط با آلاء:</b></font></div>'
                }
              }, {
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'سامانه تیکتینگ آلاء',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: {}
                }
              }],
              options: {
                style: { marginTop: '20px' },
                colNumber: 'col-md-12'
              }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'وبسایت آلاء',
                  flat: true,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: { backgroundColor: '#27B2DE' }
                }
              }],
              options: {
                style: {
                  marginRight: '',
                  marginLeft: '5px'
                }
              }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'grey-9',
                  icon: null,
                  label: 'وبسایت آلاء',
                  flat: true,
                  callBack: null,
                  imageSource: null,
                  className: 'full-width',
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: null,
                  scrollTo: null,
                  route: null,
                  eventName: null,
                  style: { backgroundColor: '#EFEEEF' }
                }
              }],
              options: { style: { marginRight: '5px' } }
            }, {
              widgets: [{
                name: 'TextWidget',
                options: {
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
                  },
                  style: { marginBottom: '10px' },
                  text: '<div style="text-align: right;"><font color="#ffffff" size="4"><b>سوالات متداول</b></font></div>'
                }
              }, {
                name: 'ExpansionPanel',
                options: {
                  expansionList: [{
                    label: 'جمع بندی کنکور چترنجات آلاء مناسب کیه؟',
                    caption: '',
                    text: '<font color="#ffffff" size="1">خلاصه بگیم که؛ اگر تقریبا صفر صفری، قطعا شک نکن که نجاتت میده (با چتر نجات حتی تا 50% الی 60% می‌تونی می‌رسی). اگر تراز و درصدات نوسان داره، نجاتت می‌ده (با چتر نجات تا 80% می‌تونی بری بالا تو هر درس با خیال راحت). اگر حالت خیلی خوبه و ترازت بالا مالا ها می‌پره و درجه یکی، تو گام سومش، تحلیل سخت‌ترین و چالش برانگزین ترین تستارو برات داریم که 100% هر درس کنکور مال خودت باشه.</font>',
                    expanded: false
                  }, {
                    label: '\tدرسنامه و جزوه جامع همه نکات کنکورم داره؟',
                    caption: '',
                    text: '<span style="color: rgb(239, 239, 239); font-family: IRANSans; font-size: 11px; background-color: rgb(49, 49, 49);">یه درسنامه ویدیویی جامع بعلاوه جزوه درسنامه با تمام نکاتش (دهم، یازدهم و دوازدهم) توی جمع بندی کنکور چترنجات آلاء داری. کاملا مبحثی همه نکات ارائه شده. با این درسنامه ویدیویی و جزوه اون و تمام تست های آموزشی و تشریحی که داره میتونی خودت به 50% الی 60% هم برسونی.</span>',
                    expanded: false
                  }, {
                    label: '\tتستم حل می‌کنید؟',
                    caption: '',
                    text: '<span style="color: rgb(239, 239, 239); font-family: IRANSans; font-size: 11px; background-color: rgb(49, 49, 49);">چتر نجات آلاء،‌ توی همه دروسش، 3 گام داره که تو گام اولش، تست های تالیفی و آموزشی دارید و تو گام دومش تست‌های تالیفی اما سطح متوسط به بالا و تو گام سومش کلی تست چالش برانگیز و دارای ایده های نو رو براتون آوردیم. همشونم تحلیل ویدیویی دارن.</span>',
                    expanded: false
                  }, {
                    label: '\tبچه هایی که راه ابریشم یا 110 دارن، این دوره به کارشون میاد؟',
                    caption: '',
                    text: '<span style="color: rgb(239, 239, 239); font-family: IRANSans; font-size: 11px; background-color: rgb(49, 49, 49);">روند یادگیری در کنکور سراسری، دو بخش عمده داره. مثل این می‌مونه که در موفقیت در کنکور دو تا کلید داره که یکیش دوره جامع و یکی دیگه‌ش دوره جمع بندی. توصیه آلاء به تمام آلایی ها اینکه اگر دوره جامع (راه ابریشم و یا نسخه پرو و یا فوریت کنکور 110) در آلاء ثبت نام کردید، حتما جمع بندی هم در کنارش به شکل نکته و تست محور به هر شکلی که می‌تونید داشته باشید. اگر هم میخوایی تا روز کنکور با آلاء باشی، جمع بندی چترنجات رو بهت پیشنهاد می‌کنیم.</span>',
                    expanded: false
                  }],
                  expandIconClass: null,
                  theme: null,
                  style: { backgroundColor: '#313131' }
                }
              }],
              options: {
                style: {
                  marginTop: '15px',
                  marginBottom: '10px'
                },
                colNumber: 'col-md-12'
              }
            }],
            options: {
              className: '',
              height: 'auto',
              boxed: true,
              boxedWidth: 1200,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              paddingOfBoxedInFullWidth: '30px',
              style: {
                maxWidth: '1200px',
                width: '1200px',
                marginTop: '15px'
              }
            }
          }]
        },
        options: {
          fullHeight: false,
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
          verticalAlign: null,
          style: {
            backgroundColor: 'rgba(30,30,30,1)',
            minHeight: 'auto'
          }
        }
      }]
    }
  }
}
</script>
