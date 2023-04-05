<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
const productsList = [980, 979, 978, 976]
const productsList2 = [979, 976, 975]
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
                      },
                      {
                        name: 'ActionButton',
                        options: {
                          label: 'ثبت نام',
                          color: 'primary'
                        }
                      }
                    ],
                    options: {
                      className: '',
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
                  fullHeight: 'calc( 100vh - 72px )',
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
                          // imageSource: '/src/assets/goDown.svg',
                          icon: 'expand_more',
                          color: 'primary',
                          action: 'scroll',
                          scrollTo: 'feature'
                        }
                      }
                    ],
                    options: {
                      className: '',
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
                  style: {
                    maxWidth: '100%',
                    width: '100%',
                    position: 'absolute',
                    bottom: '0'
                  }
                }
              }
            ]
          },
          options: {
            fullHeight: 'calc( 100vh - 72px )',
            verticalAlign: 'center',
            style: {
              background: 'url("https://nodes.alaatv.com/upload/landing/110/header.jpg")',
              backgroundSize: 'contain'
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
                      className: '',
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
                      className: '',
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
                      className: '',
                      style: {},
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
                      className: '',
                      style: {},
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
                      className: '',
                      style: {},
                      colNumber: 'col-12 col-md-4'
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
                            padding: '20px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'دوره فوریت کنکور 110 آلاء، جمع بندی نیست؛',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                            fontSize: '24px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '28px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {
                      className: '',
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
                          text: 'سریع ترین دوره جامع کنکور آلاست.',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                            fontSize: '24px',
                            fontWeight: '400',
                            fontStyle: 'normal'
                          },
                          xl: {
                            fontSize: '28px',
                            fontWeight: '500',
                            fontStyle: 'normal'
                          }
                        }
                      }
                    ],
                    options: {
                      className: '',
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
                        name: 'ExpansionPanel',
                        options: {
                          className: '',
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
                      className: '',
                      style: {},
                      colNumber: 'col-md-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ImageWidget',
                        options: {
                          className: '',
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          imageSource: 'https://nodes.alaatv.com/upload/landing/110/4.png'
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
                  boxed: true,
                  boxedWidth: 1362
                }
              }
            ]
          },
          options: {
            fullHeight: 'calc( 100vh - 72px )',
            verticalAlign: 'start',
            style: {
              background: '#FFFFFF'
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
                            padding: '20px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'مقایسه دوره 110 آلاء و راه ابریشم آلاء',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                      className: '',
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
                        name: 'ComparisonTable',
                        options: {
                          className: '',
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          color: 'transparent',
                          flat: true,
                          header: ['ویژگی ها', '110', 'راه ابریشم'],
                          rows: [
                            {
                              col0: 'زمان آموزش',
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
                              col0: 'مخاطب دوره',
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
                              col0: 'درسنامه فشرده',
                              col1: {
                                type: 'boolean',
                                value: true
                              },
                              col2: {
                                type: 'boolean',
                                value: false
                              }
                            },
                            {
                              col0: 'کارگاه حل تست',
                              col1: {
                                type: 'boolean',
                                value: true
                              },
                              col2: {
                                type: 'boolean',
                                value: true
                              }
                            },
                            {
                              col0: 'آزمون آزمایشی',
                              col1: {
                                type: 'boolean',
                                value: true
                              },
                              col2: {
                                type: 'boolean',
                                value: true
                              }
                            },
                            {
                              col0: 'action',
                              col1: {
                                type: 'scroll',
                                label: 'جزئیات و ثبت نام',
                                className: 'feature'
                              },
                              col2: {
                                type: 'link',
                                label: 'جزئیات و ثبت نام',
                                url: 'https://alaatv.com/landing/25'
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
                      className: '',
                      style: {},
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
              background: '#F9F4EF'
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
                            padding: '20px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'ثبت نام',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                      className: '',
                      style: {},
                      colNumber: 'col-md-12'
                    }
                  },
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
                            padding: '20px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'رشته مورد نظر را انتخاب کنید',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                      className: '',
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
                        name: 'ProductsTabPanel',
                        options: {
                          className: '',
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          tabsList: [
                            {
                              name: 'riazi',
                              label: 'ریاضی',
                              products: productsList,
                              specialProducts: productsList2
                            },
                            {
                              name: 'tajrobi',
                              label: 'تجربی',
                              products: productsList,
                              specialProducts: productsList2
                            },
                            {
                              name: 'ensani',
                              label: 'انسانی',
                              products: productsList,
                              specialProducts: productsList2
                            }
                          ]
                        }
                      }
                    ],
                    options: {
                      className: '',
                      style: {},
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
            fullHeight: true,
            verticalAlign: 'start',
            style: {
              background: '#FFFFFF'
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
                            padding: '20px 0px 16px 10px',
                            marginTop: ''
                          },
                          text: 'سوالات متداول',
                          color: '#3D3F46',
                          customClass: 'text-center',
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
                      className: '',
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
                        name: 'ExpansionPanel',
                        options: {
                          className: '',
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          style: {
                            padding: '10px 0px 16px 10px',
                            background: '#FFFFFF',
                            borderRadius: '30px'
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
                      className: '',
                      style: {},
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
              background: '#F9F4EF'
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
