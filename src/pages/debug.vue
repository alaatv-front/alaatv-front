<template>
  <div>
    <page-builder :sections="sections" :options="pageConfig" />
    <slider/>
  </div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import Slider from 'components/Slider'

export default {
  name: 'debug',
  components: { Slider, PageBuilder },
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
