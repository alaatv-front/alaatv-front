<template>
  <q-page-builder v-model:sections="sections"
                  v-model::options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>
export default {
  name: 'PageUserOrders',
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
                        name: 'MyOrders'
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
  },
  computed: {
    pageBuilderEditable() {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>

<style scoped>

</style>
