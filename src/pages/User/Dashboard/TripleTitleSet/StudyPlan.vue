<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'Schedule',
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
                      name: 'triple-title-set-study-plan'
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
