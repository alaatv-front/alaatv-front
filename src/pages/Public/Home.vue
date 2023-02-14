<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { createMetaMixin } from 'quasar'
export default {
  name: 'HomePage',
  mixins: [
    createMetaMixin(function () {
      // "this" here refers to your component
      return {

        // sets document title
        title: 'آموزش مجازی آلاء',
        // optional; sets final title as "Index Page - My Website", useful for multiple level meta
        titleTemplate: title => `${title} با هدف توسعه عدالت آموزشی در حوزه کنکور`,

        // meta tags
        meta: {
          description: { name: 'description', content: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.' },
          keywords: { name: 'keywords', content: 'Quasar website' },
          equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' },
          // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
          ogTitle: {
            property: 'og:title',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          ogDescription: {
            property: 'og:description',
            content: 'کلاس های درس آلاء برای کنکور، دهم، یازدهم و دوازدهم و خدمات تکمیلی از قبیل همایش‌های طلایی و اردو طلایی؛ در دروس مختلف زیست شیمی فیزیک ریاضی عربی ادبیات و.'
          },
          ogType: {
            property: 'og:type',
            content: 'website'
          },
          ogUrl: {
            property: 'og:url',
            content: 'https://alaatv.com'
          },
          ogImage: {
            property: 'og:image',
            content: 'https://nodes.alaatv.com/upload/footer-alaaLogo.png'
          },
          ogImageWidth: {
            property: 'og:image:width',
            content: '80'
          },
          ogImageHeight: {
            property: 'og:image:height',
            content: '90'
          },
          twitterTitle: {
            property: 'twitter:title',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          twitterDescription: {
            property: 'twitter:description',
            content: 'آموزش مجازی آلاء',
            // optional; similar to titleTemplate, but allows templating with other meta properties
            template (ogTitle) {
              return `${ogTitle} با هدف توسعه عدالت آموزشی در حوزه کنکور`
            }
          },
          twitterSite: {
            property: 'twitter:site',
            content: 'آموزش مجازی آلاء'
          }
        },

        // // CSS tags
        // link: {
        //   material: { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' }
        // },

        // // JS tags
        // script: {
        //   ldJson: {
        //     type: 'application/ld+json',
        //     innerHTML: '{ "@context": "http://schema.org" }'
        //   }
        // },

        // <html> attributes
        htmlAttr: {
          lang: 'fa'
          // 'xmlns:cc': 'http://creativecommons.org/ns#', // generates <html xmlns:cc="http://creativecommons.org/ns#">,
          // empty: undefined // generates <html empty>
        }

        // // <body> attributes
        // bodyAttr: {
        //   'action-scope': 'xyz', // generates <body action-scope="xyz">
        //   empty: undefined // generates <body empty>
        // },

        // // <noscript> tags
        // noscript: {
        //   default: 'This is content for browsers with no JS (or disabled JS)'
        // }
      }
    })
  ],
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'BlockList',
                        options: {
                          to: 1,
                          apiName: 'home'
                        }
                      },
                      {
                        name: 'Services',
                        options: {
                          services: [
                            {
                              link: '#konkoor2',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_konkur_icon.png?w=52&h=52',
                              title: 'کنکور',
                              subTitle: 'صفر تا صد رایگان'
                            },
                            {
                              link: 'https://3a.alaatv.com/',
                              icon: 'https://node6.alaatv.com/upload/homepage_icon_3a_icon.png?w=52&h=52',
                              title: 'سه آ',
                              subTitle: 'آزمون آنلاین آلاء'
                            },
                            {
                              link: '#yazdahom',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade11_icon.png?w=52&h=52',
                              title: 'یازدهم',
                              subTitle: 'صفر تا صد رایگان'
                            },
                            {
                              link: '#dahom',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_grade10_icon.png?w=52&h=52',
                              title: 'دهم',
                              subTitle: 'صفر تا صد رایگان'
                            },
                            {
                              link: 'asset/abrisham',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_silkroad2_icon.png?w=52&h=52',
                              title: 'همایش راه ابریشم',
                              subTitle: 'برنامه ای کامل ویژه کنکوری ها'
                            },
                            {
                              link: '/landing/10',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_godar_icon.png?w=52&h=52',
                              title: 'همایش گدار',
                              subTitle: 'جمع بندی نیم سال اول دوازدهم'
                            },
                            {
                              link: '/landing/9',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_taftan_icon.png?w=52&h=52',
                              title: 'همایش تفتان',
                              subTitle: 'جمع بندی دهم و یازدهم'
                            },
                            {
                              link: '/landing/15',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_arash_icon.png?w=52&h=52',
                              title: 'همایش آرش',
                              subTitle: 'جمع بندی کامل کنکور'
                            },
                            {
                              link: '/h',
                              icon: 'https://nodes.alaatv.com/upload/homepage_icon_hekmat_icon.png?w=52&h=52',
                              title: 'طرح حکمت',
                              subTitle: 'ویژه خانواده های نیروهای مسلح'
                            }
                          ],
                          style: {
                            'margin-bottom': '20px'
                          }
                        }
                      },
                      {
                        name: 'BlockList',
                        data: 'home',
                        options: {
                          from: 1,
                          apiName: 'home'
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ]
    }
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>
