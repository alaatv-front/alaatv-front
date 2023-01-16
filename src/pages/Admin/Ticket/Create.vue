<template>
  <q-page-builder
    v-model:sections="sections"
    v-model::options="pageConfig"
  />
</template>

<script>
export default {
  name: 'CreatTicket',
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
                        name: 'Create',
                        options: {
                          showRouteName: 'Admin.MyTickets.Show',
                          indexRouteName: 'Admin.MyTickets.Index'
                        }
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true,
                  boxedWidth: 1362
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
