<template>
  <page-builder :sections="sections" :options="pageConfig"></page-builder>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'
import { BannerList } from 'src/models/Banner'

export default {
  name: 'debug',
  components: { pageBuilder },
  mixins: [],
  data() {
    return {
      pageConfig: {
        padding: {
          a: 'md'
        }
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'Slider',
                        data: new BannerList([
                            {
                              id: 1,
                              title: 'این از این',
                              link: '',
                              class: 'q-ma-xl rounded',
                              photo: 'https://cdn.quasar.dev/img/mountains.jpg',
                              // features: {
                              //   xl: {
                              //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              //   },
                              //   lg: {
                              //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              //   },
                              //   md: {
                              //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              //   },
                              //   sm: {
                              //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              //   },
                              //   xs: {
                              //     src: 'https://cdn.quasar.dev/img/mountains.jpg'
                              //   }
                              // }
                            },
                            {
                              id: 2,
                              title: 'این از این',
                              link: '',
                              class: 'q-ma-xl rounded',
                              photo: 'https://placeimg.com/500/300/nature',
                              // features: {
                              //   xl: {
                              //     src: 'https://placeimg.com/500/300/nature'
                              //     // width: '500px',
                              //     // height: ''
                              //   },
                              //   lg: {
                              //     src: 'https://placeimg.com/500/300/nature'
                              //     // width: '500px',
                              //     // height: ''
                              //   },
                              //   md: {
                              //     src: 'https://placeimg.com/500/300/nature'
                              //     // width: '500px',
                              //     // height: ''
                              //   },
                              //   sm: {
                              //     src: 'https://placeimg.com/500/300/nature'
                              //     // width: '500px',
                              //     // height: ''
                              //   },
                              //   xs: {
                              //     src: 'https://placeimg.com/500/300/nature'
                              //     // width: '500px',
                              //     // height: ''
                              //   }
                              // }
                            }
                          ])
                        ,
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
            options: {}
          }
        },
      ],
      testValue: '',
      testValue1: ''
    }
   },
  props: {
    testProp: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  methods: {},
  computed: {},
  beforeRouteEnter() {
    // console.log('debug beforeRouteEnter')
  },
  beforeRouteLeave() {
    // console.log('debug beforeRouteLeave')
  },
  beforeRouteUpdate() {
    // console.log('debug beforeRouteUpdate')
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
  watch: {
    testValue: {
      handler() { },
      deep: true
    },
    testValue1(oldVal, newVal) { }
  }
}

</script>

<style scoped lang="scss">
</style>
