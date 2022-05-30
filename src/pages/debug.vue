<template>
  <div>
    <page-builder :sections="sections"
                  :options="pageConfig" />
  </div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import { BannerList } from 'src/models/Banner'

export default {
  name: 'debug',
  components: { PageBuilder },
  mixins: [],
  data () {
    return {
      pageConfig: {
        padding: {
          a: 'md'
        }
      },
      sections: [
        {
          rows: [
            {
              cols: [
                {
                  widgets: [
                    {
                      name: 'Slider',
                      data: {
                        slides: new BannerList([
                          {
                            id: 1,
                            title: 'این از این',
                            link: '',
                            class: 'q-ma-xl rounded',
                            features: {
                              xl: {
                                src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              },
                              lg: {
                                src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              },
                              md: {
                                src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              },
                              sm: {
                                src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              },
                              xs: {
                                src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              }
                            }
                          },
                          {
                            id: 2,
                            title: 'این از این',
                            link: '',
                            class: 'q-ma-xl rounded',
                            features: {
                              xl: {
                                src: 'https://placeimg.com/500/300/nature'
                                // width: '500px',
                                // height: ''
                              },
                              lg: {
                                src: 'https://placeimg.com/500/300/nature'
                                // width: '500px',
                                // height: ''
                              },
                              md: {
                                src: 'https://placeimg.com/500/300/nature'
                                // width: '500px',
                                // height: ''
                              },
                              sm: {
                                src: 'https://placeimg.com/500/300/nature'
                                // width: '500px',
                                // height: ''
                              },
                              xs: {
                                src: 'https://placeimg.com/500/300/nature'
                                // width: '500px',
                                // height: ''
                              }
                            }
                          }
                        ])
                      },
                      options: {
                        transition: {
                          infinite: false
                        }
                      }
                    }
                  ],
                  options: {}
                }
              ]
            },
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
          ],
          // rows: [
          //   {
          //     cols: [
          //       {
          //         widgets: [
          //           {
          //             name: 'Segment',
          //             data: {
          //               url: {
          //                 xl: 'https://nodes.alaatv.com/upload/contentset/departmentlesson/sf0t100_1352_6437449.jpg?w=427&h=239'
          //               }
          //             },
          //             options: {
          //
          //             }
          //           }
          //         ]
          //       }
          //     ],
          //     options: {}
          //   }
          // ],
          options: {}
        }
      ],
      testValue: '',
      testValue1: ''
    }
  },
  props: {
    testProp: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  methods: {},
  computed: {},
  beforeRouteEnter () {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave () {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate () {
    // console.log('debug beforeRouteUpdate')
  },
  activated () {
    // console.log('debug activated')
  },
  updated () {
    // console.log('debug updated')
  },
  created () {
    // console.log('debug created')
  },
  mounted () {
    // console.log('debug mounted')
  },
  watch: {
    testValue: {
      handler () {},
      deep: true
    },
    testValue1 (oldVal, newVal) {}
  }
}
</script>

<style scoped lang="scss">

</style>
