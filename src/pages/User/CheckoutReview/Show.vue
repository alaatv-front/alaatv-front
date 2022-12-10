<template>
  <div class="checkoutReview-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
    />
  </div>
</template>

<script>
import GetWidgetsData from 'src/assets/js/GetWidgetsData.js'

export default {
  name: 'CheckoutReview',
  data () {
    return {
      editable: false,
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
                        name: 'CheckoutReview',
                        data: this.$route.params.id,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ],
                    options: {
                      style: {
                        marginTop: '16px'
                      }
                    }
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
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
