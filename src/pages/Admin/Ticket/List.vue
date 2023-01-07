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
                        name: 'TicketList'
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
