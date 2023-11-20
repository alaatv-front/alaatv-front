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
                      }
                    ],
                    options: {

                      colNumber: 'col-12'
                    }
                  }
                ],
                options: {
                  boxed: false,
                  boxedWidth: 1362,
                  style: {
                    width: null,
                    maxWidth: null
                  }
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
                            padding: '100px 0 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;">اردوی نوروزی تفتان آلاء<br></div>',
                          color: '#ffffff',
                          customClass: 'text-center',
                          fontFamily: null,
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
                            padding: '40px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;">جمع بندی ٪۶۲.۵ کنکور (دروس پایه) در ۲۷ روز</div>',
                          color: '#ffffff',
                          customClass: 'text-left',
                          fontFamily: null,
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

                      colNumber: 'col-md-12 col-lg-12 col-xl-12 col-sm-12 col-xs-12'
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

                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
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
                          fontFamily: null,
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
                          fontFamily: null,
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
                          fontFamily: null,
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
                          fontFamily: null,
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
                            marginTop: '70px'
                          },
                          text: '<div style="text-align: center;">ثبت نام سریع در تفتان آلاء</div>',
                          color: '#3D3F46',
                          customClass: 'text-center',
                          fontFamily: null,
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
                          text: '<div style="text-align: center;">برای مشاهدۀ دوره‌های جمع‌بندی، رشتۀ خود را انتخاب کنید</div>',
                          color: '#3D3F46',
                          customClass: 'text-center',
                          fontFamily: null,
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
                          height: 'auto',
                          boxed: true,
                          boxedWidth: 1200,
                          activeColor: 'primary',
                          indicatorColor: 'white',
                          activeBgColor: 'white',
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          productGroupLayout: 'tab',
                          rowLayout: 'grid',
                          type: 'group',
                          list: [
                            {
                              height: 'auto',
                              boxed: true,
                              boxedWidth: 1200,
                              style: {
                                padding: '40px 0px 16px 10px'
                              },
                              productGroupLayout: 'shelf',
                              rowLayout: 'grid',
                              type: 'group',
                              label: 'تجربی',
                              list: [
                                {
                                  type: 'product',
                                  rowStyle: {
                                    background: '#F9F4EF',
                                    padding: '15px 15px 5px',
                                    borderRadius: '10px'
                                  },
                                  products: [
                                    980,
                                    979,
                                    978,
                                    976
                                  ]
                                },
                                {
                                  type: 'product',
                                  products: [
                                    980,
                                    979,
                                    978,
                                    976
                                  ]
                                }
                              ]
                            },
                            {
                              label: 'ریاضی',
                              type: 'product',
                              products: [
                                980,
                                979,
                                978,
                                976
                              ]
                            },
                            {
                              label: 'تفتان قدیم',
                              type: 'product',
                              products: [
                                980,
                                979,
                                978,
                                976
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
                          fontFamily: null,
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
                          toggle: true,
                          expansionList: [
                            {
                              id: 1,
                              label: 'داداش این همایش تفتان آلا چی چی هس اصلا؟',
                              text: 'همایش تفتان مخصوص جمع بندی دوران طلایی نوروز هست و کل دهم و یازدهم که 62.5 درصد کنکورت هست رو پوشش می ده<br>',
                              expanded: false
                            },
                            {
                              id: 2,
                              label: 'همایش تفتان چی داره که بقیه دوره های جمع بندی مشابه ندارن؟',
                              text: '<span style="color: rgb(51, 51, 51); font-family: IRANSans;">اولا برنامه مطالعاتیش با رویکردهای روانشناختی طراحی شده و همچنین قرار نیست هر روز از صبح تا شب مطالعه کنین!</span><br style="background-repeat: no-repeat; padding: 0px; margin: 0px; color: rgb(51, 51, 51); font-family: IRANSans;"><span style="color: rgb(51, 51, 51); font-family: IRANSans;">دوما اقدام گرایی که جزء جدایی ناپذیر یادگیری هست در این برنامه مطالعاتی تفتان مد نظر قرار داده شده و شما فقط ویدئو نمی بینی!</span><br>',
                              expanded: false
                            },
                            {
                              id: 3,
                              label: 'همایش تفتان آلاء فقط به درد پایه دوازدهمیا و کنکوریا می خوره؟',
                              text: 'همایش تفتان آلاء برای داوطلبان کنکور 1401 طراحی و تولید شده؛ اما اگر دانش آموزان پایه بخوان برای جمع بندی درساشون ازش استفاده کنن هیچ مشکلی مانع اونا نمیشه.',
                              expanded: false
                            },
                            {
                              id: 4,
                              label: 'با هر سطح علمی میشه از همایش تفتان استفاده کرد و نتیجه گرفت؟',
                              text: 'بله؛ همایش تفتان به صورتی طراحی شده که هر دانش آموزی با هر سطحی می تونه ازش استفاده کنه؛ چون هم درسنامه فشرده و نکته محور داره و هم تست .',
                              expanded: false
                            },
                            {
                              id: 5,
                              label: 'همایش تفتان به صورت پک فیزیکی ارسال می شه یا یه دوره دانلودیه؟',
                              text: '<div>تمام خدمات آلاء داخل سایت و اپ آلاء عرضه میشه و انقدر امکانات باحال و جذاب براتون طی روند یادگیری آماده کردیم تا از آموزش آنلاین لذت ببرید😃</div><div>و به‌طور پیوسته این امکانات خفن داره تکمیل و افزوده میشه تا تجربه متفاوت آموزشی رو براتون ایجاد کنیم 😎</div><div><br></div><div>درنتیجه، همایش دانلودی تفتان که شامل فیلم ها و جزوات میشه رو از تاریخ 21 اسفند، داخل پروفایلتون قرار میدیم و قابل دانلود هستند .</div><div>هیچگونه ارسال پستی نداریم چون به تجربه جذاب آموزش آنلاین با آلاء اعتقاد داریم 😊.</div>',
                              expanded: false
                            },
                            {
                              id: 6,
                              label: 'همایش تفتان برنامه مطالعاتی داره؟',
                              text: 'بله همایش تفتان برای رشته های ریاضی و تجربی دارای یک برنامه مطالعاتی با رویکرد روانشناختی و اقدام گرا هست.',
                              expanded: false
                            },
                            {
                              id: 7,
                              label: 'اینکه می گن این همایش طبق ظرفیت ذهن ما طراحی شده یعنی چی؟',
                              text: 'تمام سعی تیم طراحی محصول این بوده تا با بهره گیری از اصول حافظه، اصول یادگیری و ارتباط یادگیری با میزان هشیاری، متد صحیح تدریس و ایجاد انسجام بین این موارد، محصولی ارزشمند برای شما عزیزان تولید بشه',
                              expanded: false
                            },
                            {
                              id: 8,
                              label: 'برنامه مطالعاتی تفتان از چه موقع شروع می شه؟ و تا کی ادامه داره؟',
                              text: 'برنامه مطالعاتی همایش تفتان از 21 اسفند شروع می شه و تا 25 فروردین ادامه داره.',
                              expanded: false
                            },
                            {
                              id: 9,
                              label: 'آیا تو عید همه روزش بایستی درس بخونیم؟ می پوسیم که...اون لالوها استراحتی واسش نذاشتین',
                              text: 'نخیر؛ برنامه تفتان طوری طراحی شده تا در تاریخ های 1 ، 2 ، 5 ،7 ، 12 ، 13، 19 و23 فروردین استراحت داشته باشین.',
                              expanded: false
                            },
                            {
                              id: 10,
                              label: 'شدنیه که منو دوستم و خالم و عمم با هم دیگه مشترک یه تفتان بخریم و استفاده کنیم؟ آلاء راضیه؟',
                              text: 'منافع مادی دوره های غیررایگان آلاء، صرف نگه‌داری هزاران ساعت محتوای رایگان سایت آلا، توسعه هرچه بیشتر امکانات رایگان و هزینه های خیلی زیاد مجموعه آلاء میشه؛ واسه همین اشتراکی خرید کردن، دریافت رایگان محتوای غیررایگان آلاء از بقیه کانال ها و هر نوع استفاده غیرقانونی از این محصول ها شرعا، قانونا و اخلاقا صحیح نیست و مجموعه آلاء به هیچ عنوان رضایت نخواهد داشت .',
                              expanded: false
                            },
                            {
                              id: 11,
                              label: 'تو تفتان فقط درسنامه داریم یا اینکه تست هم داخلش هست؟',
                              text: 'ادر همایش تفتان ویدئو ها دو تا ماهیت دارن؛ یا ویدئوها درسنامه هستند یا اینکه ویدئو تحلیل تست هستن',
                              expanded: false
                            },
                            {
                              id: 12,
                              label: 'همایش تفتان برای کدوم درس های کنکور هست؟',
                              text: 'در رشته های تجربی و ریاضی همه دروس پایه پوشش داده میشن',
                              expanded: false
                            },
                            {
                              id: 13,
                              label: 'دبیران همایش تفتان کیان؟',
                              text: 'دبیران تفتان 1401 دبیران با تجربه با سابقه تالیف کتاب کمک آموزشی یا طراحی سوالات آزمون های آزمایشی معتبر یا مدرسین مدارس برتر کشور هستن.',
                              expanded: false
                            },
                            {
                              id: 14,
                              label: 'من تفتان سال گذشته رو داشتم، آیا لازمه برا امسال رو هم بخرم؟',
                              text: 'در تفتان 1401 همه چی به شکل متفاوت تری طراحی شده. دبیران جدیدی حاضر هستن و برنامه جدیدی تنظیم شده. در ضمن مدت زمان کل همایش تفتان 1401، 33 % از همایش تفتان 1400 کم تر هست😃',
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
