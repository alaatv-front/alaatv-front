<template>
<page-builder :sections="sections"/>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import { BlockList } from 'src/models/Block'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
  components: { PageBuilder },
  data () {
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
                        name: 'productIntroduction',
                        data:{}
                      }
                    ]
                  },
                ],
                options: {
                  boxed: true
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'productDemos',
                        data:{}
                      }
                    ]
                  },
                ],
                options: {
                  boxed: true
                }
              },
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'productReview',
                        data:{}
                      }
                    ]
                  },
                ],
                options: {
                  boxed: true
                }
              }
            ]
          }
        }
      ]
    }
  },
  created () {},
  methods: {}
}
</script>

<style scoped>

</style>
