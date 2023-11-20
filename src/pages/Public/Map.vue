<template>
  <div class="MapPage-page">
    <q-page-builder v-model:sections="sections"
                    v-model::options="pageConfig" />
  </div>
</template>

<script>
export default {
  name: 'MapPage',
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
