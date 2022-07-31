<template>
  <page-builder :sections="sections" :options="options" :containerHeight="calculateHeightStyle"></page-builder>
</template>

<script>
import pageBuilder from 'src/components/PageBuilder/PageBuilder'
import { BannerList } from 'src/models/Banner'
import API_ADDRESS from 'src/api/Addresses'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
  name: 'debug',
  components: { pageBuilder },
  mixins: [],
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
                                          style: 'color: yellow !important',
                                          className: 'q-ma-lg'
                                        }
                                      },
                                    ],
                                    options: {
                                      style: 'border: 1px blue solid'
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
                                  style: "",
                                  className: 'boxed'
                                }
                              }
                            ]
                          }
                        }
                      ],
                    options: {
                      className: 'q-ma-lg col-md-12 col-sm-6',
                      style: "color: blue !important"
                    }
                  }
                ],
                options: {
                  style: "color: white",
                  className: "q-ma-md boxed"
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
            style: 'background-image: url("http://twintower.ir/api/media/tracks/368/thumbnail9-5777.jpg");background-position: center;background-size: cover;background-repeat: no-repeat;background-attachment: fixed;',
            className: '',
            fullHeight: true,
            verticalAlign: 'center',
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
            style: 'background-image: url("https://nodes.alaatv.com/upload/images/slideShow/1642417634_2227.jpg?w=1845&h=720");background-position: center;background-size: cover;background-repeat: no-repeat;background-attachment: fixed;',
            fullHeight: true,
            verticalAlign: 'center',
          }
        },
      ],
      //this is page options
      options: {
        // className: "q-ma-xs q-pa-lg",
        style: "background: black !important; color: white;"
      },
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
  methods: {

  },
  computed: {
    calculateHeightStyle(){
      let calcHeight = this.$store.getters['AppLayout/calculateContainerFullHeight'];
      return calcHeight;
    }
  },
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
