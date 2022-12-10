<template>
  <div class="userSet-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
    />
  </div>
</template>

<script>
import GetWidgetsData from 'src/assets/js/GetWidgetsData.js'

export default {
  name: 'User.Set.Show',
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
                  // {
                  //   widgets: [
                  //     {
                  //       name: 'Banner',
                  //       data: this.$route.params.id,
                  //       options: {
                  //         getData: (url) => GetWidgetsData.getData(this.$axios, url)
                  //       }
                  //     }
                  //   ],
                  //   options: {
                  //     col: 'col-3'
                  //   }
                  // },
                  {
                    widgets: [
                      {
                        name: 'Set',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
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

<style scoped></style>
