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
                      name: 'triple-title-set-news'
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
