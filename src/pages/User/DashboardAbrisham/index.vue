<template>
  <q-page-builder
    v-model:sections="sections"
    v-model::options="pageConfig"
  />
</template>

<script>
export default {
  name: 'index',
  data() {
    return {
      pageConfig: {},
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'abrisham-progress'
                      }
                    ]
                  }
                ]
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
