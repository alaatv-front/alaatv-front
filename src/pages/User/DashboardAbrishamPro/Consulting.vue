<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'user-consulting',
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
                      name: 'AbrishamConsulting'
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
