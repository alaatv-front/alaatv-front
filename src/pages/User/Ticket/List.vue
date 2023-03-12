<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig" />
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
                        name: 'ProfileMenu'
                      }
                    ],
                    options: {
                      className: 'q-pr-md gt-md',
                      colNumber: 'col-md-3'
                    }
                  },
                  {
                    widgets: [
                      {
                        name: 'TicketList',
                        options: {
                          showRouteName: 'UserPanel.Ticket.Show',
                          createRouteName: 'UserPanel.Ticket.Create'
                        }
                      }
                    ],
                    options: {
                      className: 'col-12 col-lg-9  q-pl-md'
                    }
                  }
                ],
                options: {
                  boxed: true,
                  style: {
                    marginTop: '30px',
                    marginBottom: '30px'
                  }
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
