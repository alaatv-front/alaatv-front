<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'GiftCart',
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
                  imageSource: 'http://nodes.alaatv.com/upload/landing/34/gift-card-landing-top-banner-desktop.jpg?w=1846&h=622',
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
              options: {}
            }],
            options: {}
          }, {
            cols: [{
              widgets: [{
                name: 'ImageWidget',
                options: {
                  imageSource: 'http://nodes.alaatv.com/upload/landing/34/gift-card-landing-gold-card.png?w=425&h=265',
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
              options: {}
            }, {
              widgets: [{
                name: 'ImageWidget',
                options: {
                  imageSource: 'http://nodes.alaatv.com/upload/landing/34/gift-card-landing-green-card.png?w=425&h=265',
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
              options: {}
            }, {
              widgets: [{
                name: 'ImageWidget',
                options: {
                  imageSource: 'http://nodes.alaatv.com/upload/landing/34/gift-card-landing-blue-card.png?w=425&h=265',
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
                  style: {},
                  text: '<span style="color: rgb(33, 37, 41); font-family: IRANSans; font-size: 16px;">در مرحله اول، امکان تهیه کارت هدیه برای مشاورین تحصیلی مقدور است و در آینده‌ای نزدیک، برای همه آلایی ها فعال می‌شود. چنانچه مشاور تحصیلی هستید با واحد پشتیبانی آلاء از طریق ثبت تیکت در ارتباط باشید.</span>'
                }
              }],
              options: {
                style: {},
                colNumber: 'col-md-12'
              }
            }, {
              widgets: [{
                name: 'ActionButton',
                options: {
                  color: 'primary',
                  icon: null,
                  label: 'درج تیکت',
                  flat: false,
                  callBack: null,
                  imageSource: null,
                  className: null,
                  fixed: false,
                  fixedPosition: null,
                  eventArgs: null,
                  action: 'link',
                  scrollTo: null,
                  route: '/t',
                  eventName: null,
                  style: {}
                }
              }],
              options: { style: {} }
            }],
            options: {
              className: '',
              height: 'auto',
              boxed: false,
              boxedWidth: 1200,
              gutterXSize: 'md',
              gutterYSize: 'md',
              absolute: 'none',
              paddingOfBoxedInFullWidth: '30px',
              style: {
                marginLeft: '300px',
                width: null,
                maxWidth: null,
                marginRight: '300px'
              }
            }
          }]
        }
      }]
    }
  }
}
</script>
