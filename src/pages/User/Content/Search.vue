<template>
  <page-builder :sections="sections" />
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
export default {
  name: 'Search',
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
                        name: 'contentSearch',
                        data: this.$route.params.id
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
