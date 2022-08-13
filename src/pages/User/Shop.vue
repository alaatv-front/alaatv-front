<template>
  <page-builder :sections="sections"/>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import API_ADDRESS from 'src/api/Addresses'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
name: "Shop",
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
                        name: 'blockList',
                        data: API_ADDRESS.pages.shop,
                        options: {
                          getData: (url) => GetWidgetsData.getData(url)
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
                }
              }
            ],
          }
        }
      ],
    }
  },
  methods: {}
}
</script>

<style scoped>

</style>
