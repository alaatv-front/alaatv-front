<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'FireDay',
  mixins: [mixinPageOptions, mixinSEO],
  data () {
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
                        name: 'StickyMenu',
                        options: {
                          scrollTarget: 'feature'
                        }
                      },
                      {
                        name: 'ActionButton',
                        options: {
                          label: 'نیاز به راهنمایی داری ؟',
                          color: 'primary',
                          action: 'event',
                          eventName: 'newsletter',
                          fixed: true,
                          fixedPosition: 'bottom-left'
                        }
                      },
                      {
                        name: 'Newsletter',
                        eventName: 'newsletter',
                        options: {
                          verification: true,
                          eventId: '10',
                          userInputs: {
                            first_name: true,
                            last_name: true,
                            major: true,
                            grade: true
                          }
                        }
                      },
                      {
                        name: 'FloatingCart'
                      }
                    ],
                    options: {
                      colNumber: 'col-12'
                    }
                  }
                ],
                options: {
                  boxed: false,
                  boxedWidth: 1362
                }
              }
            ]
          },
          options: {
            fullHeight: false,
            verticalAlign: 'center',
            style: {
              minHeight: 'auto'
            }
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'HeaderMenu',
                        options: {
                          menuLink: [
                            {
                              label: 'صفحه اصلی',
                              type: 'link',
                              route: 'http://localhost:8083/'
                            },
                            {
                              label: 'دوره ها',
                              type: 'scroll',
                              className: 'courses'
                            },
                            {
                              label: 'سوالات متداول',
                              type: 'scroll',
                              className: 'faq-row'
                            }
                          ],
                          logoImage: 'https://nodes.alaatv.com/upload/landing/chatr/alaa%20logo.png',
                          logoSlogan: 'مدرسه آنلاین آلا',
                          action: true,
                          actionButtonLabel: 'ثبت نام'
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-12'
                    }
                  }
                ],
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
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '100px 0 16px 10px'
                          },
                          text: '<div style="text-align: center;">فقط <font color="#ff8f00">3ماه</font>،تا موفقیت در کنکور</div>',
                          color: '#ffffff',
                          customClass: 'text-center',
                          xs: {
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          sm: {
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          md: {
                            fontSize: '24px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          lg: {
                            fontSize: '58px',
                            fontWeight: '800',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '58px',
                            fontWeight: '800',
                            fontStyle: 'normal'
                          }
                        }
                      },
                      {
                        name: 'TextWidget',
                        options: {
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          text: 'پیشنهاد ویژه آلاء برای آلایی هایی که زمان کمی تا کنکور دارن و می‌خوان کاملا کنکوری همه دروس رو فقط در عرض<font color="#ff8f00">3 ماه</font> از صفر با درسنامه‌ای کامل و حل صد ها تست یاد بگیرند.',
                          color: '#ffffff',
                          customClass: 'text-left',
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
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          lg: {
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '20px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          }
                        }
                      },
                      {
                        name: 'ActionButton',
                        options: {
                          label: 'ثبت نام',
                          color: 'primary',
                          action: 'scroll',
                          scrollTo: 'courses',
                          style: {
                            paddingLeft: '30px',
                            paddingRight: '30px'
                          },
                          className: 'float-right'
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'VideoPlayerWidget',
                        options: {
                          height: 'auto',
                          style: {
                            padding: '25px'
                          },
                          boxed: false,
                          boxedWidth: 1200,
                          url: 'https://nodes.alaatv.com/upload/landing/abrisham25/videos/hq/landing-abrisham-25-main-video_4.mp4'
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-6 col-sm-12 col-xs-12'
                    }
                  }
                ],
                options: {
                  fullHeight: true,
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ActionButton',
                        options: {
                          icon: 'expand_more',
                          color: 'primary',
                          action: 'scroll',
                          scrollTo: 'feature'
                        }
                      }
                    ],
                    options: {
                      style: {
                        display: 'flex',
                        justifyContent: 'center'
                      },
                      colNumber: 'col-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: '100%',
                  absolute: 'bottom',
                  style: {
                    maxWidth: '100%px',
                    width: '100%px'
                  }
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            backgrounds: {
              xs: {
                size: 'cover',
                color: null,
                image: 'url(https://nodes.alaatv.com/upload/landing/576.png)',
                repeat: 'no-repeat',
                position: 'center center',
                attachment: null
              },
              sm: {
                size: 'cover',
                color: null,
                image: 'url(https://nodes.alaatv.com/upload/landing/992.png)',
                repeat: 'no-repeat',
                position: 'center center',
                attachment: null
              },
              md: {
                size: 'cover',
                color: null,
                image: 'url(https://nodes.alaatv.com/upload/landing/1200.png)',
                repeat: 'no-repeat',
                position: 'center center',
                attachment: null
              },
              lg: {
                size: 'cover',
                color: null,
                image: 'url(https://nodes.alaatv.com/upload/landing/1480.png)',
                repeat: 'no-repeat',
                position: 'center center',
                attachment: null
              },
              xl: {
                size: 'cover',
                color: null,
                image: 'url(https://nodes.alaatv.com/upload/landing/1920.png)',
                repeat: 'no-repeat',
                position: 'center center',
                attachment: null
              }
            },
            verticalAlign: 'center',
            style: {
              minHeight: '100vh'
            }
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {
                          className: 'feature',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px',
                            marginTop: '70px'
                          },
                          text: '<div style="text-align: center;">با فوریت 110 آلاء تا کنکور</div>',
                          color: '#3D3F46',
                          customClass: 'text-left',
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
                      }
                    ],
                    options: {
                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {

                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '10px 0px 16px 10px',
                            marginTop: null,
                            marginBottom: '20px'
                          },
                          text: '<div style="text-align: center;">فقط توی 3 ماه، کل نکات کنکور بهت آموزش میده</div>',
                          color: '#3D3F46',
                          customClass: 'text-left',
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
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '26px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'FeatureBox',
                        options: {
                          title: 'اگر فارغ التحصیلی',
                          description: 'این دوره پیشنهاد اول آلاء به شماست',
                          image: 'https://nodes.alaatv.com/upload/landing/110/1.png?w=93&h=93'
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-12 col-md-4'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'FeatureBox',
                        options: {
                          title: 'اگر دانش آموزی',
                          description: 'از صفر، کل دروس کنکور توی 3 ماه بهت یاد میده',
                          image: 'https://nodes.alaatv.com/upload/landing/110/2.png?w=93&h=93'
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-12 col-md-4'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'FeatureBox',
                        options: {
                          title: 'دنبال یادگیری سریع و کاملی',
                          description: 'صفر تا صد کنکور با درسنامه و تحلیل تست توی 3 ماه',
                          image: 'https://nodes.alaatv.com/upload/landing/110/3.png'
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-12 col-md-4'
                    }
                  }
                ],
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
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {
                          className: 'feature',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px',
                            marginTop: '40px'
                          },
                          text: '<div style="text-align: center;">بخشی از رتبه برتر های آلاء در کنکور سال قبل<br></div>',
                          color: '#3D3F46',
                          customClass: 'text-left',

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
                      }
                    ],
                    options: {
                      colNumber: 'col-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'PersonSlider',
                        options: {
                          sliderItems: [
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            },
                            {
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
                            }
                          ]
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-12'
                    }
                  }
                ],
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
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {

                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '20px 0px 16px 10px',
                            marginTop: '70px'
                          },
                          text: '<div style="text-align: center;"><b>دوره فوریت کنکور 110 آلاء، جمع بندی نیست؛</b></div>',
                          color: '#3D3F46',
                          customClass: 'text-center',

                          xs: {
                            fontSize: '14px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          },
                          sm: {
                            fontSize: '18px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          },
                          md: {
                            fontSize: '20px',
                            fontWeight: '600',
                            fontStyle: 'normal'
                          },
                          lg: {
                            fontSize: '24px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '28px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '10px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;"><b><font color="#ff8f00">سریع ترین دوره جامع کنکور</font> آلاست.</b></div>',
                          color: '#3D3F46',
                          customClass: 'text-center',

                          xs: {
                            fontSize: '14px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          },
                          sm: {
                            fontSize: '18px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          },
                          md: {
                            fontSize: '20px',
                            fontWeight: '600',
                            fontStyle: 'normal'
                          },
                          lg: {
                            fontSize: '24px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '28px',
                            fontWeight: '700',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {
                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ExpansionPanel',
                        options: {
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          toggle: true,
                          theme: 'theme2',
                          expandIconClass: 'fire-day-expantion-icon',
                          expansionList: [
                            {
                              id: 1,
                              label: 'آموزش 3 ماهه و جامع کنکور',
                              caption: 'آموزش صفر تا صد کنکور در 3 ماه با درسنامه ویدیویی',
                              text: 'توی دوره 110 آلاء،‌ سریع ترین کلاس آموزشی کنکور سراسری رو با 110 آلاء در عرض 3 ماه تجربه میکنی. تمام فایل های درسنامه ویدیویی و جزوات کنکوری به صورت یکجا، در اختیار شما قرار میگیره.',
                              expanded: false
                            },
                            {
                              id: 2,
                              label: '110 برنامه مطالعاتی داره؟',
                              caption: 'بعد از آموزش هر مبحث، تحلیل تست هاشو میبینی',
                              text: 'بعد از مشاهده تدریس ویدیویی مباحث کنکوری (آموزش کنکوری دهم،‌یازدهم و دوازدهم) هر درس دوره 110 آلاء، با تست های آموزشی و تشریحی، همراه با استاد همه نکات رو کامل یاد میگیری.',
                              expanded: false
                            },
                            {
                              id: 3,
                              label: 'کنار دوره 110، آزمون آزمایشی باید ثبت نام کنم؟',
                              caption: 'قراره با هم توی 110 کلی تست تمرینی هم حل کنیم',
                              text: 'بعد از یادگیری کامل توسط درسنامه و تست های آموزشی 110 آلاء،‌ وارد حل ویدیویی صد ها تست تمرینی میشیم. اینجا مطابق با کنکور سراسری، تمام نکات تست ها برات تحلیل میشه. تسلط کامل بعد از این مرحله اتفاق میفته و هر تستی میتونی با این تمارین حل کنی.',
                              expanded: false
                            }
                          ]
                        }
                      }
                    ],
                    options: {
                      style: {
                        paddingLeft: null,
                        paddingRight: null
                      },
                      colNumber: 'col-md-6'
                    }
                  },
                  {
                    widgets: [
                      {
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
                      }
                    ],
                    options: {
                      className: 'flex flex-center',
                      colNumber: 'col-md-6 col-sm-12 col-xs-12'
                    }
                  }
                ],
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
              }
            ]
          },
          options: {
            fullHeight: 'calc( 100vh - 72px )',
            verticalAlign: 'start',
            style: {
              background: '#FFFFFF',
              minHeight: 'calc( 100vh - 72px )'
            }
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '20px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;">مقایسه دوره 110 آلاء و راه ابریشم آلاء</div>',
                          color: '#3D3F46',
                          customClass: 'text-center',

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
                      }
                    ],
                    options: {

                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ComparisonTable',
                        options: {

                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          color: 'transparent',
                          flat: true,
                          header: [
                            { label: 'ویژگی ها' },
                            { label: '110' },
                            { label: 'راه ابریشم' }
                          ],
                          rows: [
                            {
                              col0: {
                                type: 'text',
                                value: 'زمان آموزش'
                              },
                              col1: {
                                type: 'text',
                                value: '3 ماه'
                              },
                              col2: {
                                type: 'text',
                                value: '6 ماه'
                              }
                            },
                            {
                              col0: {
                                type: 'text',
                                value: 'مخاطب دوره'
                              },
                              col1: {
                                type: 'text',
                                value: 'اغلب فارغ التحصیلان'
                              },
                              col2: {
                                type: 'text',
                                value: 'اغلب فارغ التحصیلان'
                              }
                            },
                            {
                              col0: {
                                type: 'text',
                                value: 'درسنامه فشرده'
                              },
                              col1: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
                              },
                              col2: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-close-circle.png'
                              }
                            },
                            {
                              col0: {
                                type: 'text',
                                value: 'کارگاه حل تست'
                              },
                              col1: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
                              },
                              col2: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
                              }
                            },
                            {
                              col0: {
                                type: 'text',
                                value: 'آزمون آزمایشی'
                              },
                              col1: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
                              },
                              col2: {
                                type: 'image',
                                value: 'https://nodes.alaatv.com/upload/landing/32/landing32/tableOfDifferences/landing-32-table-of-differences-tick-circle.png'
                              }
                            },
                            {
                              col0: {
                                type: 'action',
                                value: {
                                  label: null
                                }
                              },
                              col1: {
                                type: 'action',
                                actionType: 'scroll',
                                value: {
                                  label: 'جزئیات و ثبت نام',
                                  className: 'feature'
                                }
                              },
                              col2: {
                                type: 'action',
                                actionType: 'link',
                                value: {
                                  label: 'جزئیات و ثبت نام',
                                  url: 'https://alaatv.com/landing/25'
                                }
                              }
                            }
                          ],
                          attributesLabel: 'ویژگی ها',
                          attributes: [
                            {
                              label: 'زمان آموزش',
                              name: 'duration',
                              type: 'text'
                            },
                            {
                              label: 'مخاطب دوره',
                              name: 'participant',
                              type: 'text'
                            },
                            {
                              label: 'درسنامه فشرده',
                              name: 'document',
                              type: 'boolean'
                            },
                            {
                              label: 'کارگاه حل تست',
                              name: 'bootCamp',
                              type: 'boolean'
                            },
                            {
                              label: 'آزمون آزمایشی',
                              name: 'test',
                              type: 'boolean'
                            }
                          ],
                          records: [
                            {
                              title: '110',
                              key: '110',
                              action: {
                                type: 'scroll',
                                label: 'جزئیات و ثبت نام',
                                className: 'feature'
                              },
                              attributes: [
                                {
                                  name: 'duration',
                                  value: '3 ماه'
                                },
                                {
                                  name: 'participant',
                                  value: 'اغلب فارغ التحصیلان'
                                },
                                {
                                  name: 'document',
                                  value: true
                                },
                                {
                                  name: 'bootCamp',
                                  value: true
                                },
                                {
                                  name: 'test',
                                  value: true
                                }
                              ]
                            },
                            {
                              title: 'راه ابریشم',
                              key: 'abrisham',
                              action: {
                                type: 'link',
                                label: 'جزئیات و ثبت نام',
                                url: 'https://alaatv.com/landing/25'
                              },
                              attributes: [
                                {
                                  name: 'duration',
                                  value: '6 ماه'
                                },
                                {
                                  name: 'participant',
                                  value: 'اغلب فارغ التحصیلان'
                                },
                                {
                                  name: 'document',
                                  value: false
                                },
                                {
                                  name: 'bootCamp',
                                  value: true
                                },
                                {
                                  name: 'test',
                                  value: true
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-12'
                    }
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
            fullHeight: false,
            verticalAlign: 'start',
            style: {
              background: '#F9F4EF',
              minHeight: 'auto'
            }
          }
        },
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
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
                      }
                    ],
                    options: {

                      colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'TextWidget',
                        options: {

                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '20px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;">رشته مورد نظر را انتخاب کنید</div>',
                          color: '#3D3F46',
                          customClass: 'text-center',

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
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          lg: {
                            fontSize: '22px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '26px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ProductsTabPanel',
                        options: {
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          data: [
                            {
                              type: 'GroupList',
                              options: {
                                layout: 'ProductTab',
                                style: {
                                  padding: '10px 0px 16px 10px'
                                },
                                activeColor: 'primary',
                                activeBgColor: 'white',
                                indicatorColor: 'white'
                              },
                              data: [
                                {
                                  type: 'GroupList',
                                  options: {
                                    label: 'ریاضی',
                                    layout: 'ProductShelf'
                                  },
                                  data: [
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'محصولات ویژه',
                                        labelStyle: {
                                          color: '#FB4D7A',
                                          fontSize: '28px',
                                          textAlign: 'center'
                                        },
                                        layout: 'ScrollRow',
                                        style: {
                                          background: '#F9F4EF',
                                          padding: '5px',
                                          borderRadius: '30px'
                                        }
                                      },
                                      data: [
                                        983,
                                        981,
                                        980,
                                        979
                                      ]
                                    },
                                    {
                                      type: 'ProductList',
                                      options: {
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        983,
                                        981,
                                        980,
                                        979
                                      ]
                                    }
                                  ]
                                },
                                {
                                  type: 'GroupList',
                                  options: {
                                    label: 'تجربی',
                                    layout: 'ProductShelf'
                                  },
                                  data: [
                                    {
                                      type: 'ProductList',
                                      options: {
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        983,
                                        981,
                                        980,
                                        979
                                      ]
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-12'
                    }
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
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
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
                      }
                    ],
                    options: {

                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ExpansionPanel',
                        options: {

                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '10px 0px 16px 10px',
                            background: '#FFFFFF',
                            borderRadius: '30px',
                            marginBottom: '40px'
                          },
                          bordered: true,
                          expansionList: [
                            {
                              id: 1,
                              label: 'تستم حل میکنید؟',
                              text: 'توی دوره آموزش جامع کنکور 110 آلاء، دو نوع کلاس تستی و کنکوری برگزار میشه. در درجه اول حل تست آموزشی در کنار درسنامه ویدیویی و جزوات کنکوری دوره و بعد حل تست صد ها پیشرفته کنکوری در قالب تمارین. پس هم با یک کلاس آموزشی طرفی هم کلاس تحلیل تست.',
                              expanded: false
                            },
                            {
                              id: 2,
                              label: '110 برنامه مطالعاتی داره؟',
                              text: 'در سریع ترین کلاس آموزش کنکور مجازی آلاء که عنوانش 110 باشه؛ انقدر مباحث رو بهت سریع و اصولی آموزش میدیم که با هر برنامه مطالعاتی مدنظرت، همخونی داشته باشه. برنامه مشاورت یا آزمونت یا هر برنامه‌ دیگه‌ای. با حدود 6 ساعت مطالعه در روز توی 3 ماه در تمام دروس، کل نکات کنکور رو به همراه حل تست هایی با استاندارد کنکور سراسری میتونی حل بکنی. کلاس آموزشی کنکور که با هر برنامه‌ای جور باشه قشنگه، مثل 110 آلاء.',
                              expanded: false
                            },
                            {
                              id: 3,
                              label: 'کنار دوره 110، آزمون آزمایشی باید ثبت نام کنم؟',
                              text: 'اینکه بری آزمون یا نه، به اختیار خودت و یا مشاورت اما، توصیه آلاء اینکه حتما آزمون آزمایشی برای تجربه و درک فضای آزمون و یادگیری مواجهه با تست در قالب رسمی آزمون خیلی برات اهمیت داره. البته که آزمون منظم موجب پایبندی به برنامه مطالعاتی هم میشه. توی کلاس جامع تست و آموزش 110 که یک دوره فشرده 3 ماهه هست، آزمون های جامع و آنلاین سه‌آ آلاءکه مطابقت داره با استاندارد سوالات کنکور سراسری، به شما هدیه داده میشه تا بتونی از جهت آزمون جامع و شبیه ساز کنکور سراسری هم خیالت راحت باشه.',
                              expanded: false
                            }
                          ]
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-12'
                    }
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
            className: 'faq-row',
            fullHeight: false,
            verticalAlign: 'start',
            style: {
              background: '#F9F4EF',
              minHeight: 'auto'
            }
          }
        }
      ]
    }
  },
  created () {
    this.currenSections = this.sections
  }
}
</script>
