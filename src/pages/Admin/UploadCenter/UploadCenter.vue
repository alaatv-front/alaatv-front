<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable" />
</template>

<script>

export default {
  name: 'UploadCenter',
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
                        name: 'UploadCenterComponent'
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
            fullHeight: true,
            verticalAlign: 'center'
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
