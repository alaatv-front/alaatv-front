<template>
  <div class="set-show-page">
    <page-builder
      :sections="sections"
      :options="pageConfig"
    />
  </div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import GetWidgetsData from 'src/assets/js/GetWidgetsData.js'

export default {
  name: 'User.Set.Show',
  components: { PageBuilder },
  data () {
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
                        name: 'Banner',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
                        }
                      }
                    ],
                    options: {
                      col: 'col-3'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'SetShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: false
                }
              }
            ]
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
