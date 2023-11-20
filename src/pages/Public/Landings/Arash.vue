<template>
  <q-page-builder v-model:sections="currenSections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
import { mixinSEO, mixinPageOptions } from 'src/mixin/Mixins.js'

export default {
  name: 'Arash',
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
                          text: '<div style="text-align: right;">خودت رو برای هر قرعه‌ای آماده کن!<br></div>',
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
                          text: 'با جمع بندی های آلاء، مهم نیست قرعه به چه گروهی بیفته چون برنده تویی ...',
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
                          text: '<div style="text-align: right;"><font color="#fb4d7a">جمع‌بندی آرش آلاء</font></div>',
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
                      },
                      {
                        name: 'TextWidget',
                        options: {
                          className: 'feature',
                          height: 'auto',
                          boxed: false,
                          boxedWidth: 1200,
                          style: {
                            padding: '40px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div><font color="#ffffff">مربی: من نیاز دارم کل مباحث هر سه سال کنکور رو با درسنامۀ فشرده و ترکیبی و کلی تست یک‌جا جمع‌بندی کنم.</font></div><div><font color="#ffffff">آنالیزور: پس به هر درصدی که بخوایی برسی و تو هر سطحی که هستی، آرش نیاز اساسی توِئه.</font></div>',
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
                            fontSize: '24px',
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
                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ImageWidget',
                        options: {
                          boxed: true,
                          boxedWidth: 1200,
                          imageSource: 'https://nodes.alaatv.com/upload/landing/1200.png',
                          xs: {
                            height: '150px',
                            width: '300px'
                          },
                          sm: {
                            height: '150px',
                            width: '300px'
                          },
                          md: {
                            height: '300px',
                            width: '500px'
                          },
                          lg: {
                            height: '491px',
                            width: '1385px'
                          },
                          xl: {
                            height: '491px',
                            width: '1385px'
                          }
                        }
                      }
                    ],
                    options: {
                      className: 'flex flex-center',

                      colNumber: 'col-md-12 col-sm-12 col-xs-12 col-lg-12 col-xl-12'
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
              background: '#911932',
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
                        name: 'Separator',
                        options: {
                          boxed: false,
                          boxedWidth: 1200,
                          image: 'https://cutewallpaper.org/24/pink-divider-png/divider-just-pink-about-it.png',
                          style: {}
                        }
                      },
                      {
                        name: 'ProductsTabPanel',
                        options: {
                          className: '',
                          style: {
                            padding: '5px 0px 16px 10px'
                          },
                          data: [
                            {
                              type: 'GroupList',
                              options: {
                                layout: 'ProductShelf',
                                style: {
                                  justifyContent: 'flex-start'
                                }
                              },
                              data: [
                                {
                                  type: 'ProductList',
                                  options: {
                                    label: 'آرش',
                                    layout: 'ScrollRow',
                                    labelStyle: {
                                      color: '#FB4D7A',
                                      fontSize: '28px',
                                      textAlign: 'center'
                                    }
                                  },
                                  data: [
                                    980,
                                    979,
                                    978
                                  ]
                                }
                              ]
                            }
                          ]
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
                            padding: '20px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;"><font color="#ffffff">مشاهده تک درس ها</font><br></div>',
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

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ImageWidget',
                        options: {

                          boxed: true,
                          boxedWidth: 1200,
                          imageSource: 'https://nodes.alaatv.com/upload/landing/1200.png',
                          xs: {
                            height: '150px',
                            width: '300px'
                          },
                          sm: {
                            height: '150px',
                            width: '300px'
                          },
                          md: {
                            height: '300px',
                            width: '500px'
                          },
                          lg: {
                            height: '300px',
                            width: '500px'
                          },
                          xl: {
                            height: '300px',
                            width: '500px'
                          }
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
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
            verticalAlign: 'center',
            style: {
              background: '#911932',
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
                        name: 'Separator',
                        options: {

                          boxed: false,
                          boxedWidth: 1200,
                          image: 'https://cutewallpaper.org/24/pink-divider-png/divider-just-pink-about-it.png',
                          style: {}
                        }
                      },
                      {
                        name: 'ProductsTabPanel',
                        options: {
                          style: {
                            padding: '5px 0px 16px 10px'
                          },
                          data: [
                            {
                              type: 'GroupList',
                              options: {
                                layout: 'ProductShelf',
                                style: {
                                  justifyContent: 'flex-start'
                                }
                              },
                              data: [{
                                type: 'ProductList',
                                options: {
                                  label: 'آرش و تفتان',
                                  layout: 'ScrollRow',
                                  labelStyle: {
                                    color: '#FB4D7A',
                                    fontSize: '28px',
                                    textAlign: 'center'
                                  }
                                },
                                data: [
                                  980,
                                  979,
                                  978
                                ]
                              }]
                            }
                          ]
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
                            padding: '20px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;"><font color="#ffffff">مشاهده تک درس ها</font><br></div>',
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

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ImageWidget',
                        options: {

                          boxed: true,
                          boxedWidth: 1200,
                          imageSource: 'https://nodes.alaatv.com/upload/landing/1200.png',
                          xs: {
                            height: '150px',
                            width: '300px'
                          },
                          sm: {
                            height: '150px',
                            width: '300px'
                          },
                          md: {
                            height: '300px',
                            width: '500px'
                          },
                          lg: {
                            height: '300px',
                            width: '500px'
                          },
                          xl: {
                            height: '300px',
                            width: '500px'
                          }
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
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
            verticalAlign: 'center',
            style: {
              background: '#911932',
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
                        name: 'Separator',
                        options: {

                          boxed: false,
                          boxedWidth: 1200,
                          image: 'https://cutewallpaper.org/24/pink-divider-png/divider-just-pink-about-it.png',
                          style: {}
                        }
                      },
                      {
                        name: 'ProductsTabPanel',
                        options: {
                          style: {
                            padding: '5px 0px 16px 10px'
                          },
                          data: [
                            {
                              type: 'GroupList',
                              options: {
                                layout: 'ProductShelf',
                                style: {
                                  justifyContent: 'flex-start'
                                }
                              },
                              data: [
                                {
                                  type: 'ProductList',
                                  options: {
                                    label: 'تفتان',
                                    layout: 'ScrollRow',
                                    labelStyle: {
                                      color: '#FB4D7A',
                                      fontSize: '28px',
                                      textAlign: 'center'
                                    }
                                  },
                                  data: [
                                    980,
                                    979,
                                    978
                                  ]
                                }
                              ]
                            }
                          ]
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
                            padding: '20px 0px 16px 10px',
                            marginTop: null
                          },
                          text: '<div style="text-align: center;"><font color="#ffffff">مشاهده تک درس ها</font><br></div>',
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

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'ImageWidget',
                        options: {

                          boxed: true,
                          boxedWidth: 1200,
                          imageSource: 'https://nodes.alaatv.com/upload/landing/1200.png',
                          xs: {
                            height: '150px',
                            width: '300px'
                          },
                          sm: {
                            height: '150px',
                            width: '300px'
                          },
                          md: {
                            height: '300px',
                            width: '500px'
                          },
                          lg: {
                            height: '300px',
                            width: '500px'
                          },
                          xl: {
                            height: '300px',
                            width: '500px'
                          }
                        }
                      }
                    ],
                    options: {

                      colNumber: 'col-md-6 col-sm-12 col-xs-12 col-lg-6 col-xl-6'
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
            verticalAlign: 'center',
            style: {
              background: '#911932',
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
                          text: '<div style="text-align: center;"><font color="#ffffff">رشته مورد نظر را انتخاب کنید</font></div>',
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
                          style: {
                            padding: '40px 0px 16px 10px'
                          },
                          data: [
                            {
                              type: 'GroupList',
                              options: {
                                layout: 'ProductTab',
                                style: {
                                  padding: '40px 0px 16px 10px'
                                },
                                activeColor: 'primary',
                                activeBgColor: 'white',
                                indicatorColor: 'white'
                              },
                              data: [
                                {
                                  type: 'GroupList',
                                  options: {
                                    layout: 'ProductTab',
                                    label: 'ریاضی',
                                    labelStyle: {
                                      color: '#ffffff',
                                      fontSize: '28px',
                                      textAlign: 'center'
                                    },
                                    activeColor: 'primary',
                                    activeBgColor: 'white',
                                    indicatorColor: 'white'
                                  },
                                  data: [
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'آرش',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976
                                      ]
                                    },
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'آرش و تایتان',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976
                                      ]
                                    },
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'تایتان',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976,
                                        979,
                                        978,
                                        976
                                      ]
                                    }
                                  ]
                                },
                                {
                                  type: 'GroupList',
                                  options: {
                                    layout: 'ProductTab',
                                    label: 'تجربی',
                                    labelStyle: {
                                      color: '#ffffff',
                                      fontSize: '28px',
                                      textAlign: 'center'
                                    },
                                    activeColor: 'primary',
                                    activeBgColor: 'white',
                                    indicatorColor: 'white'
                                  },
                                  data: [
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'آرش',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976
                                      ]
                                    },
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'آرش و تایتان',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976
                                      ]
                                    },
                                    {
                                      type: 'ProductList',
                                      options: {
                                        label: 'تایتان',
                                        layout: 'ScrollRow'
                                      },
                                      data: [
                                        980,
                                        979,
                                        978,
                                        976,
                                        979,
                                        978,
                                        976
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
              background: '#9E1D38',
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
                          text: '<div style="text-align: center;"><font color="#ffffff">سوالات متداول</font></div>',
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
                          toggle: true,
                          bordered: true,
                          expansionList: [
                            {
                              id: 1,
                              label: 'اصن چرا تایتان؟',
                              text: 'واللا به خودا هِی این بچه درس خونا اومدن بهمون گفتن ما خیلی شاخیم میشه این دمِ کنکوری علاوه بر آرش یه چیز دیگه هم برا ما بدین که باهاش بزنیم بریم فضا..ما هم با کلی فکر و مشورت با این و اون، به این نتیجه رسیدیم که تایتان دَر کنیم بیرون!!.. خدایی چیز خوبی هم تهش در اومد که سال پیش هم کلی از این رتبه برترامون هم ازش زَده بودن به رگ و راضیم بودن',
                              expanded: false
                            },
                            {
                              id: 2,
                              label: 'این همایش واسِ کیاست؟',
                              text: 'برا همه اونایی که شاخ فضای کنکور هستن و همینطور اون متوسط به بالایی هایی که آرش رو خوندن و الان میخوان یه پله خودشون رو بکشن بالاتر.. اونایی هم که ضعیف ان و خیلی تو فاز درس مَرس خوندن نیستن، بی خیالش بشن؛ تعارف نداریم کِ',
                              expanded: false
                            },
                            {
                              id: 3,
                              label: 'درسنامه هم داره؟ یا فقط توش تست حل کردین فقط؟',
                              text: 'ببین بذا اینجوری بگم راحتتر واسَت جا بیفته..ما اومدیم تو تایتان مطالب رو همراهِ با تست حل کردن گفتیم، اگه گفتی چَرا؟! چون تو آرش درسنامه جم بندی گذاشتیم و گفتیم یا طرف قویه و به درسنامه نیازی نداره و یا اینکه آرش رو با تایتان یه جا داره و میتونه از درسنامه آرش استفاده کنه',
                              expanded: false
                            },
                            {
                              id: 4,
                              label: 'کل دهم، یازدهم و دوازدهم رو داره عایا؟',
                              text: 'بععععله..کل سه سال رو یه دور باهاش زدیم و داخلش قرار دادیم!',
                              expanded: false
                            },
                            {
                              id: 5,
                              label: 'وقتم کمه، به دردم میخوره؟',
                              text: 'اصن یه چیزی که تایتان رو جیگر میکنه همینه..چون تو زمان کم میای فقط مطالب لِوِل بالا میزنی و دیگه نمیای با تستای ساده و دم دستی وقت شریفت رو هَدَر بدی عشقم',
                              expanded: false
                            },
                            {
                              id: 6,
                              label: 'میشه واسم پست کنین یا فقط دانلودی طوره؟',
                              text: 'تو رو بقرعان به طبیعت رحم کن، به جیب خودت فک کن..آخه الان تو این وضعیت هیری ویری و جنگ روسیه و اکراین (چه ربطی داره آخه) به فکر پَکی عایا..بابا همین همایش با این وضعیت گرونی، کلی واسمون آب خورده و همه زورمون رو زدیم که ارزون به دستت برسونیم، برا همین اومدیم ارسال پستی رو بیخیال شدیم',
                              expanded: false
                            },
                            {
                              id: 7,
                              label: 'اصن چرا آرش؟',
                              text: 'ببین خب هر چقدم از نظر درسی قوی یا ضعیف باشی، لازمتِ کِ این سه سال رو ی جا کلهم اجمعین داشته باشی دیگِ، ی تریلی مطلب تو این کتابای درسیو کنکوری چپوندن ... میخوام بگم جم بندی نیازِ هر کنکوریه که دم کنکور بتونه تند و تیز ی بار دیگه مطالب مهم رو دوره بکنه تا ی وقت خدایی نکرده، وختی داره تستا رو تو کنکور میزنه، چیزی از حافظه‌اش نپریده باشه و توش نمونه',
                              expanded: false
                            },
                            {
                              id: 8,
                              label: 'این همایش واسِ کیاست؟',
                              text: 'اگه از ما میپرسی، میگیم همه کسایی کِ میخوان کنکور بدن حتمن لازمِ که یه جم بندی تر و تمیز واسِ خودشون داشته باشن، حالا اگه خودت واسه خودت تا الان جم بندی یا خلاصه نویسی ای دُرُس نکردی، پیشنهادمون اینه که بگیر و در ذهنت بینداز که تو بیابون کنکور مطالب رو برات دهد باز',
                              expanded: false
                            },
                            {
                              id: 9,
                              label: 'درسنامه هم داره؟ یا فقط توش تست حل کردین فقط؟',
                              text: 'آره بابا داره، هم درسنامه داره هم تست، ولی خب چون دیگه یه کف دست بیشتر تا کنکور نمونده، دیگه نیومدیم دل و روده مطالب رو بریزیم وسط دایره، و فقط به صورت مختصر و مفید اومدیم مطالب رو براتون توضیح دادیم..چون باورمونه که کنکوریا الان بایست حداقل یه بار مطالب رو خونده باشن و فقط میخوان واسِ خودشون یه منبع خوب واسه دوره کردن دوباره داشته باشن',
                              expanded: false
                            },
                            {
                              id: 10,
                              label: 'کل دهم، یازدهم و دوازدهم رو داره عایا؟',
                              text: 'پَ نَ پَ، آخه این چه سوالیه که پرسیدی، اگه هم نپرسیدی واقعن درسته که داری جوابشو میخونی؟!! بابا خب جم بندیه کنکوره دیگه..همه رو داره، خیالت راحت نازنین',
                              expanded: false
                            },
                            {
                              id: 11,
                              label: 'وقتم کمه، به دردم میخوره؟',
                              text: 'اتفاقن دلیل اینکه تو جواب یکی از سوالای بالا گفتیم جم بندی مفید و مختصر داره واسه همینه..نخواستیم هِی با مطالب وَر بریم تا طولانی بشه، چون الان بچه های کنکوری تو مود این نیستن دوباره بشینن یه مطلب رو از صفر بخونن و الان لازمشونه که یه چی باشه براشون مطالب رو مث فرفره سریع مرور بکنه',
                              expanded: false
                            },
                            {
                              id: 12,
                              label: 'میشه واسم پست کنین یا فقط دانلودی طوره؟',
                              text: 'تو رو بقرعان به طبیعت رحم کن، به جیب خودت فک کن..آخه الان تو این وضعیت هیری ویری و جنگ روسیه و اکراین (چه ربطی داره آخه) به فکر پَکی عایا..بابا همین همایش با این وضعیت گرونی کلی واسمون آب خورده و همه زورمون رو زدیم که ارزون به دستت برسونیم، برا همین اومدیم ارسال پستی رو بیخیال شدیم',
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
              background: '#911932',
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
