<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig" />
</template>

<script>
export default {
  name: 'ShowTicket',
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
                        name: 'Show',
                        options: {
                          showRouteName: 'UserPanel.Ticket.Show'
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
