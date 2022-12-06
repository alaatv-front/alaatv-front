<template>
  <div class="Shop-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
    />
  </div>
</template>

<script>
import API_ADDRESS from 'src/api/Addresses'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
name: "Shop",
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
