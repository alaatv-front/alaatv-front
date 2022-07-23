<template>
<div class="home-page">
  <page-builder :sections="sections"/>
</div>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import API_ADDRESS from 'src/api/Addresses'
import GetWidgetsData from 'assets/js/GetWidgetsData'

export default {
  name: 'BaseComponent',
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
                        data: API_ADDRESS.pages.home,
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
      ],
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.home-page {
  &:deep(.banner-header-0) {
    display: none;
  }

}

</style>
