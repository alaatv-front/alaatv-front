<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'News',
  data: () => ({
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
                      name: 'chatre-nejat-news'
                    }
                  ]
                }
              ]
            }
          ]
        }
      }
    ]
  })
}
</script>

<style scoped>

</style>
