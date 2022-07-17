<template>
  <div class="content-show-page">
    <page-builder :sections="sections"/>
  </div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import GetWidgetsData from 'src/assets/js/GetWidgetsData.js'

export default {
  name: 'User.Content.Show',
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
                        name: 'ContentShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
                        }
                      },
                      {
                        name: 'ContentShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
                        }
                      },
                      {
                        name: 'ContentShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
                        }
                      },
                      {
                        name: 'ContentShowInfo',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(this.$axios, url)
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
          }
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
