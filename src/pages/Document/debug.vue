<template>
  <div class="Shop-page">
    <q-page-builder
      v-model:sections="sections"
      :editable="true"
    />
  </div>
</template>

<script>

export default {
  name: 'debug',
  mixins: [],
  beforeRouteEnter() {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave() {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate() {
    // console.log('debug beforeRouteUpdate')
  },
  props: {
    testProp: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget',
                                      options: {
                                        style: { color: 'yellow !important' },
                                        className: 'q-ma-lg'
                                      }
                                    }
                                  ],
                                  options: {
                                    style: { border: '1px blue solid' }
                                  }
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ],
                              options: {
                                style: {},
                                className: 'boxed'
                              }
                            }
                          ]
                        }
                      },
                      {
                        name: 'Slider',
                        options: {
                          list: [
                            {
                              title: 'آزمون سه‌آ-21 مهر',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1665642162_5080.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: 'https://soalaa.com/'
                            },
                            {
                              title: 'مدرسه آنلاین آلاء',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: null
                            },
                            {
                              title: 'هدیه یلدایی 1401 - اسلایدر',
                              photo: {
                                src: 'https://nodes.alaatv.com/upload/images/slideShow/1671353744_7001.jpg?w=1280&h=500'
                              },
                              features: {
                                xl: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                lg: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                md: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                sm: {
                                  src: '',
                                  width: '',
                                  height: ''
                                },
                                xs: {
                                  src: '',
                                  width: '',
                                  height: ''
                                }
                              },
                              link: 'https://alaatv.com/shop'
                            }
                          ]
                        }
                      },
                      {
                        name: 'Block',
                        options: {
                          apiName: 'home',
                          from: 1
                        }
                      }
                    ],
                    options: {
                      className: 'col-md-12 col-sm-6',
                      style: { color: 'blue !important' }
                    }
                  }
                ],
                options: {
                  style: { color: 'white' },
                  className: 'q-ma-md boxed'
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("http://twintower.ir/api/media/tracks/368/thumbnail9-5777.jpg")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            className: '',
            fullHeight: true,
            verticalAlign: 'center'
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
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'test-component1-widget'
                      }
                    ]
                  },
                  {
                    widgets: [
                      {
                        name: 'page-builder-section',
                        data: {
                          rows: [
                            {
                              cols: [
                                {
                                  widgets: [
                                    {
                                      name: 'test-component1-widget'
                                    }
                                  ]
                                },
                                {
                                  widgets: [
                                    {
                                      name: 'test-component2-widget'
                                    }
                                  ]
                                }
                              ]
                            }
                          ]
                        }
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {
            style: {
              backgroundImage:
                'url("https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720")',
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              backgroundAttachment: 'fixed'
            },
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ],
      // this is page options
      options: {
        // className: "q-ma-xs q-pa-lg",
        // style: {background: "black !important", color: "white", marginTop: '200px'}
      }
    }
  },
  computed: {
    calculateHeightStyle() {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  },
  watch: {
    testValue: {
      handler() {},
      deep: true
    },
    testValue1(oldVal, newVal) {}
  },
  activated() {
    // console.log('debug activated')
  },
  updated() {
    // console.log('debug updated')
  },
  created() {
    // console.log('debug created')
  },
  mounted() {
    // console.log('debug mounted')
  },
  methods: {}
}
</script>

<style
  scoped
  lang="scss"
></style>
