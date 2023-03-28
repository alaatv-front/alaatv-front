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
                        name: 'TextWidget',
                        options: {
                          className: '',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '100px 0 16px 10px',
                            marginTop: ''
                          },
                          text: 'فقط 3ماه،تا موفقیت در کنکور',
                          color: '#ffffff',
                          customClass: 'text-center',
                          fontFamily: '',
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
                          className: '',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'پیشنهاد ویژه آلاء برای آلایی هایی که زمان کمی تا کنکور دارن و می‌خوان کاملا کنکوری همه دروس رو فقط در عرض3 ماه از صفر با درسنامه‌ای کامل و حل صد ها تست یاد بگیرند.',
                          color: '#ffffff',
                          customClass: 'text-left',
                          fontFamily: '',
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
                      }
                    ],
                    options: {
                      className: 'flex column justify-center items-center',
                      style: {},
                      colNumber: 'col-md-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'VideoPlayerWidget',
                        options: {
                          className: '',
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
                      className: '',
                      style: {},
                      colNumber: 'col-md-6'
                    }
                  }
                ],
                options: {
                  fullHeight: true,
                  boxed: true,
                  boxedWidth: 1362
                }
              }
            ]
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center',
            style: {
              background: 'rgba(18,13,0,0.72)'
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
                          className: '',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'با فوریت 110 آلاء تا کنکور',
                          color: '#3D3F46',
                          customClass: 'text-left',
                          fontFamily: '',
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
                      className: 'flex column justify-center items-center',
                      style: {},
                      colNumber: 'col-md-12'
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
                          className: '',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '10px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'فقط توی 3 ماه، کل نکات کنکور بهت آموزش میده',
                          color: '#3D3F46',
                          customClass: 'text-left',
                          fontFamily: '',
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
                      className: 'flex column justify-center items-center',
                      style: {},
                      colNumber: 'col-md-12'
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
                          image: 'https://cdn.quasar.dev/img/mountains.jpg'
                        }
                      }
                    ],
                    options: {
                      className: 'flex column justify-center items-center',
                      style: {
                        padding: '15px'
                      },
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
                          image: 'https://cdn.quasar.dev/img/mountains.jpg'
                        }
                      }
                    ],
                    options: {
                      className: 'flex column justify-center items-center',
                      style: {
                        padding: '15px'
                      },
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
                          image: 'https://cdn.quasar.dev/img/mountains.jpg'
                        }
                      }
                    ],
                    options: {
                      className: 'flex column justify-center items-center',
                      style: {
                        padding: '15px'
                      },
                      colNumber: 'col-12 col-md-4'
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
            fullHeight: true,
            verticalAlign: 'start',
            style: {
              background: '#FFFFFF'
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
