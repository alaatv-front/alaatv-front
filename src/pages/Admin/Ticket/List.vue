<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig" />
</template>

<script>
export default {
  name: 'TicketList',
  data () {
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
                        name: 'TicketListWidget',
                        options: {
                          showRouteName: 'Admin.Ticket.Show',
                          createRouteName: 'Admin.Ticket.Create',
                          asAdmin: true
                        }
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
