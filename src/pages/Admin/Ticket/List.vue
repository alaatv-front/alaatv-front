<template>
  <q-page-builder
    v-model:sections="sections"
    v-model:options="pageConfig"
  />
</template>

<script>
export default {
  name: 'TicketList',
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
                        name: 'List'
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
      ]
    }
  }
}
</script>
