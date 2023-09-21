const menuItems = [
  {
    title: 'صفحه اصلی',
    route: {
      name: 'Public.Home'
    },
    type: 'itemMenu',
    permission: 'all',
    mobileMode: true
  },
  {
    title: 'فروشگاه',
    route: {
      name: 'Public.Shop'
    },
    type: 'itemMenu',
    permission: 'all',
    mobileMode: true
  },
  {
    title: 'فیلم های پایه و کنکور آلاء',
    permission: 'all',
    type: 'megaMenu',
    children: [
      {
        title: 'دوازدهم و کنکور',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': [
              'نظام_آموزشی_جدید',
              'دوازدهم',
              'کنکور'
            ]
          }
        },
        children: [
          {
            title: 'دروس اختصاصی ریاضی و تجربی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دوازدهم',
                  'کنکور',
                  'رشته_ریاضی',
                  'رشته_تجربی'
                ]
              }
            },
            children: [
              {
                title: 'شیمی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'شیمی'
                    ]
                  }
                }
              },
              {
                title: 'فیزیک',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'فیزیک'
                    ]
                  }
                }
              },
              {
                title: 'ریاضیات تجربی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_تجربی',
                      'ریاضی_تجربی',
                      'ریاضی_پایه'
                    ]
                  }
                }
              },
              {
                title: 'زیست شناسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_تجربی',
                      'زیست_شناسی'
                    ]
                  }
                }
              },
              {
                title: 'هندسه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_ریاضی',
                      'هندسه',
                      'هندسه_کنکور'
                    ]
                  }
                }
              },
              {
                title: 'ریاضیات گسسته و آمار و احتمال',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_ریاضی',
                      'گسسته',
                      'آمار_و_احتمال'
                    ]
                  }
                }
              },
              {
                title: 'حسابان و ریاضی پایه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_ریاضی',
                      'حسابان',
                      'ریاضی_پایه'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس اختصاصی انسانی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دوازدهم',
                  'کنکور',
                  'رشته_انسانی'
                ]
              }
            },
            children: [
              {
                title: 'عربی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_انسانی',
                      'عربی'
                    ]
                  }
                }
              },
              {
                title: 'ریاضی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_انسانی',
                      'ریاضی_انسانی',
                      'ریاضی_و_آمار'
                    ]
                  }
                }
              },
              {
                title: 'علوم و فنون ادبی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'رشته_انسانی',
                      'علوم_و_فنون_ادبی'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس عمومی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دوازدهم',
                  'کنکور',
                  'زبان_انگلیسی',
                  'عربی',
                  'زبان_و_ادبیات_فارسی',
                  'دین_و_زندگی'
                ]
              }
            },
            children: [
              {
                title: 'انگلیسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'زبان_انگلیسی'
                    ]
                  }
                }
              },
              {
                title: 'عربی عمومی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'دوازدهم',
                      'کنکور',
                      'عربی'
                    ]
                  }
                }
              },
              {
                title: 'فارسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'زبان_و_ادبیات_فارسی'
                    ]
                  }
                }
              },
              {
                title: 'دین و زندگی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دوازدهم',
                      'کنکور',
                      'دین_و_زندگی'
                    ]
                  }
                }
              },
              {
                title: 'مشاوره',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'مشاوره',
                      'کنکور',
                      'کنکوری_ها',
                      'دوازدهم',
                      'دوازدهم_رشته__ریاضی',
                      'دوازدهم_رشته__تجربی',
                      'دوازدهم_رشته__انسانی',
                      'من_کنکوری',
                      'مشاوره_کنکور',
                      'کنکور1400',
                      'کنکور1401',
                      'کنکور99',
                      'نهم',
                      'دهم',
                      'یازدهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'رشته_انسانی',
                      'نظام_آموزشی_جدید',
                      'نظام_آموزشی_قدیم'
                    ]
                  }
                }
              }
            ]
          }
        ],
        backgroundColor: '#ffd6e6',
        backgroundImage: '',
        type: 'text'
      },
      {
        title: 'یازدهم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': [
              'نظام_آموزشی_جدید',
              'یازدهم'
            ]
          }
        },
        children: [
          {
            title: 'دروس اختصاصی ریاضی و تجربی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'یازدهم',
                  'رشته_ریاضی',
                  'رشته_تجربی'
                ]
              }
            },
            children: [
              {
                title: 'شیمی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'شیمی'
                    ]
                  }
                }
              },
              {
                title: 'فیزیک',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'فیزیک'
                    ]
                  }
                }
              },
              {
                title: 'ریاضی تجربی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_تجربی',
                      'ریاضی_تجربی'
                    ]
                  }
                }
              },
              {
                title: 'زیست شناسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_تجربی',
                      'زیست_شناسی'
                    ]
                  }
                }
              },
              {
                title: 'هندسه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_ریاضی',
                      'هندسه',
                      'هندسه_پایه'
                    ]
                  }
                }
              },
              {
                title: 'آمار و احتمال',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_ریاضی',
                      'آمار_و_احتمال'
                    ]
                  }
                }
              },
              {
                title: 'حسابان',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_ریاضی',
                      'حسابان'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس اختصاصی انسانی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'یازدهم',
                  'رشته_انسانی'
                ]
              }
            },
            children: [
              {
                title: 'علوم و فنون ادبی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'رشته_انسانی',
                      'علوم_و_فنون_ادبی'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس عمومی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'یازدهم',
                  'زبان_انگلیسی',
                  'عربی',
                  'زبان_و_ادبیات_فارسی',
                  'دین_و_زندگی'
                ]
              }
            },
            children: [
              {
                title: 'انگلیسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'زبان_انگلیسی'
                    ]
                  }
                }
              },
              {
                title: 'عربی عمومی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'یازدهم',
                      'عربی'
                    ]
                  }
                }
              },
              {
                title: 'فارسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'زبان_و_ادبیات_فارسی'
                    ]
                  }
                }
              },
              {
                title: 'دین و زندگی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'یازدهم',
                      'دین_و_زندگی'
                    ]
                  }
                }
              }
            ]
          }
        ],
        backgroundColor: '#ffe0e9',
        backgroundImage: '',
        type: 'text'
      },
      {
        title: 'دهم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': [
              'نظام_آموزشی_جدید',
              'دهم'
            ]
          }
        },
        children: [
          {
            title: 'دروس اختصاصی ریاضی و تجربی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دهم',
                  'رشته_ریاضی',
                  'رشته_تجربی'
                ]
              }
            },
            children: [
              {
                title: 'شیمی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'شیمی'
                    ]
                  }
                }
              },
              {
                title: 'فیزیک',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'فیزیک'
                    ]
                  }
                }
              },
              {
                title: 'زیست شناسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_تجربی',
                      'زیست_شناسی'
                    ]
                  }
                }
              },
              {
                title: 'هندسه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_تجربی',
                      'رشته_ریاضی',
                      'هندسه',
                      'هندسه_پایه'
                    ]
                  }
                }
              },
              {
                title: 'ریاضی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'ریاضی_پایه'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس اختصاصی انسانی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دهم',
                  'رشته_انسانی'
                ]
              }
            },
            children: [
              {
                title: 'ریاضی و آمار',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_انسانی',
                      'ریاضی_و_آمار'
                    ]
                  }
                }
              },
              {
                title: 'علوم و فنون ادبی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'رشته_انسانی',
                      'علوم_و_فنون_ادبی'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس عمومی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_جدید',
                  'دهم',
                  'زبان_انگلیسی',
                  'عربی',
                  'زبان_و_ادبیات_فارسی',
                  'دین_و_زندگی'
                ]
              }
            },
            children: [
              {
                title: 'انگلیسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'زبان_انگلیسی'
                    ]
                  }
                }
              },
              {
                title: 'عربی عمومی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'دهم',
                      'عربی'
                    ]
                  }
                }
              },
              {
                title: 'فارسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'زبان_و_ادبیات_فارسی'
                    ]
                  }
                }
              },
              {
                title: 'دین و زندگی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_جدید',
                      'دهم',
                      'دین_و_زندگی'
                    ]
                  }
                }
              }
            ]
          }
        ],
        backgroundColor: '#ffe6dd',
        backgroundImage: '',
        type: 'text'
      },
      {
        title: 'کنکور نظام قدیم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': [
              'نظام_آموزشی_قدیم',
              'کنکور'
            ]
          }
        },
        children: [
          {
            title: 'دروس اختصاصی ریاضی و تجربی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_قدیم',
                  'کنکور',
                  'رشته_ریاضی',
                  'رشته_تجربی'
                ]
              }
            },
            children: [
              {
                title: 'شیمی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'شیمی'
                    ]
                  }
                }
              },
              {
                title: 'فیزیک',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'فیزیک'
                    ]
                  }
                }
              },
              {
                title: 'ریاضیات تجربی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_تجربی',
                      'ریاضی_تجربی',
                      'ریاضی_پایه'
                    ]
                  }
                }
              },
              {
                title: 'زیست شناسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_تجربی',
                      'زیست_شناسی'
                    ]
                  }
                }
              },
              {
                title: 'هندسه تحلیلی و هندسه پایه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'هندسه_پایه',
                      'هندسه',
                      'تحلیلی'
                    ]
                  }
                }
              },
              {
                title: 'ریاضیات گسسته و آمار و احتمال',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'گسسته',
                      'آمار_و_مدلسازی',
                      'جبر_و_احتمال'
                    ]
                  }
                }
              },
              {
                title: 'دیفرانسیل، حسابان و ریاضی پایه',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'حسابان',
                      'دیفرانسیل',
                      'ریاضی_پایه'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس اختصاصی انسانی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_قدیم',
                  'کنکور',
                  'رشته_انسانی'
                ]
              }
            },
            children: [
              {
                title: 'فلسفه و منطق',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_انسانی',
                      'منطق'
                    ]
                  }
                }
              },
              {
                title: 'ریاضی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_انسانی',
                      'ریاضی_انسانی'
                    ]
                  }
                }
              },
              {
                title: 'ادبیات و زبان فارسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'رشته_انسانی',
                      'زبان_و_ادبیات_فارسی_انسانی'
                    ]
                  }
                }
              }
            ]
          },
          {
            title: 'دروس عمومی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': [
                  'نظام_آموزشی_قدیم',
                  'کنکور',
                  'زبان_انگلیسی',
                  'عربی',
                  'زبان_و_ادبیات_فارسی',
                  'دین_و_زندگی'
                ]
              }
            },
            children: [
              {
                title: 'انگلیسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'زبان_انگلیسی'
                    ]
                  }
                }
              },
              {
                title: 'عربی عمومی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'رشته_ریاضی',
                      'رشته_تجربی',
                      'کنکور',
                      'عربی'
                    ]
                  }
                }
              },
              {
                title: 'ادبیات و زبان فارسی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'زبان_و_ادبیات_فارسی'
                    ]
                  }
                }
              },
              {
                title: 'دین و زندگی',
                route: {
                  name: 'Public.Content.Search',
                  query: {
                    'tags[]': [
                      'نظام_آموزشی_قدیم',
                      'کنکور',
                      'دین_و_زندگی'
                    ]
                  }
                }
              }
            ]
          }
        ],
        backgroundColor: '#fff2e1',
        backgroundImage: '',
        type: 'text'
      }
    ],
    mobileMode: true
  },
  {
    title: 'دوره های برگزیده آلاء',
    permission: 'all',
    type: 'megaMenu',
    children: [
      {
        title: 'امتحان نهایی',
        externalLink: 'https://alaatv.com/landing/38',
        backgroundImage: 'https://nodes.alaatv.com/upload/nahayi_mega_menu.jpg?w=1066&h=295',
        type: 'image'
      },
      {
        title: 'امتحان نهایی نهم',
        backgroundImage: 'https://nodes.alaatv.com/upload/nahayi_9_mega_menu.jpg?w=1066&h=294',
        route: {
          name: 'Public.Landing.DynamicName',
          params: { landing_name: 'emtehan-nahaee-nohom' }
        },
        type: 'image'
      },
      {
        title: 'آرش',
        backgroundImage: 'https://nodes.alaatv.com/upload/arash_1402_mega_menu.jpg?w=1066&h=295',
        route: {
          name: 'Public.Landing.DynamicName',
          params: { landing_name: 'arashads' }
        },
        type: 'image'
      },
      {
        title: 'چتر نجات',
        backgroundImage: 'https://nodes.alaatv.com/upload/chtr_menu_menu.jpg',
        externalLink: 'https://alaatv.com/landing/37',
        type: 'image'
      },
      {
        title: 'راه ابریشم',
        backgroundImage: 'https://nodes.alaatv.com/upload/abrisham_mega_menu_1401.jpg',
        route: {
          name: 'Public.Landing.DynamicName',
          params: { landing_name: 'rahabrisham' }
        },
        type: 'image',
        badge: 'جدید'
      },
      {
        title: 'کار آفرینی',
        backgroundImage: 'https://nodes.alaatv.com/upload/gift-card-mega-menu-background.jpg?w=1066&h=294',
        route: {
          name: 'UserPanel.Asset.GiftCard.MyGiftCards',
          params: ''
        },
        type: 'image'
      },
      {
        title: 'آزمون جامع سه آ',
        backgroundImage: 'https://nodes.alaatv.com/upload/soala-mega-menu-background.jpg?w=1066&h=294',
        externalLink: 'https://soalaa.com/landing/3a_comprehensive_exams',
        type: 'image'
      }
    ],
    desktopMode: true,
    mobileMode: true
  },
  {
    title: 'متوسطه اول',
    route: {
      name: 'Public.Content.Search',
      query: {
        'tags[]': [
          'نظام_آموزشی_جدید', 'متوسطه1'
        ]
      }
    },
    permission: 'all',
    type: 'simpleMenu',
    children: [
      {
        title: 'هفتم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': [
              'نظام_آموزشی_جدید', 'متوسطه1', 'هفتم'
            ]
          }
        },
        children: [
          {
            title: 'ریاضی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'هفتم', 'ریاضی']
              }
            }
          },
          {
            title: 'ادبیات',
            route: {
              name: 'Public.Set.Show',
              params: {
                id: 1047
              }
            }
          }
        ]
      },
      {
        title: 'هشتم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم']
          }
        },
        children: [
          {
            title: 'ادبیات',
            route: {
              name: 'Public.Set.Show',
              params: {
                id: 1085
              }
            }
          },
          {
            title: 'هندسه',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم', 'هندسه']
              }
            }
          },
          {
            title: 'ریاضی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'هشتم', 'ریاضی']
              }
            }
          }
        ]
      },
      {
        title: 'نهم',
        route: {
          name: 'Public.Content.Search',
          query: {
            'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'نهم', 'ریاضی']
          }
        },
        children: [
          {
            title: 'ریاضی',
            route: {
              name: 'Public.Content.Search',
              query: {
                'tags[]': ['نظام_آموزشی_جدید', 'متوسطه1', 'نهم', 'ریاضی']
              }
            }
          }
        ]
      }
    ],
    mobileMode: true
  },
  {
    title: 'المپیاد',
    route: {
      name: 'Public.Content.Search',
      query: {
        'tags[]': [
          'المپیاد'
        ]
      }
    },
    permission: 'all',
    type: 'itemMenu',
    desktopMode: false,
    mobileMode: true
  },
  {
    title: 'تیکت پشتیبانی',
    icon: 'isax:ticket',
    route: {
      name: 'UserPanel.Ticket.Index'
    },
    type: 'itemMenu',
    desktopMode: false,
    mobileMode: true
  }
]

export default menuItems
