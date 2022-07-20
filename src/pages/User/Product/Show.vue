<template>
<page-builder :sections="sections"/>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
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
                        name: 'productInfoShow',
                        data: this.$route.params.id,
                        options: {
                        }
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
  created () {
    this.setData()
  },
}
</script>

<style scoped>

</style>
