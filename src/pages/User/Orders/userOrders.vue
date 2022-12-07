<template>
  <q-page-builder
    v-model:sections="sections"
    v-model::options="pageConfig"
    :editable="pageBuilderEditable"
  />
</template>

<script>
export default {
  name: 'userOrders',
  computed: {
    pageBuilderEditable() {
      return this.$store.getters["AppLayout/pageBuilderEditable"];
    }
  },
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
                        name: 'UserOrders'
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

<style scoped>

</style>
