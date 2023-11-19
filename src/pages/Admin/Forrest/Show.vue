<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>

export default {
  name: 'ShowForrest',
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
                        name: 'AdminForrestShow'
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
          },
          options: {
            // fullHeight: true
          }
        }
      ]
    }
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>
