<template>
  <page-builder
    :sections="sections"
    :options="pageConfig"
  />
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'

export default {
  name: 'MapPage',
  components: { PageBuilder },
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
                  {
                    widgets: [
                      {
                        name: 'abrisham-map'
                      }
                    ]
                  }
                ]
              }
            ]
          },
          options: {}
        }
      ],
      testValue: '',
      testValue1: ''
    }
  }
}
</script>

<style scoped>
.map-page {
  width: 100%;
  margin: auto;
}
</style>
