<template>
  <div class="userSet-page">
    <q-page-builder v-model:sections="sections"
                    v-model::options="pageConfig"
                    :editable="pageBuilderEditable" />
  </div>
</template>

<script>

export default {
  name: 'Public.Set.Show',
  data() {
    return {
      pageConfig: {
        padding: {
          a: 'md'
        }
      },
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  // {
                  //   widgets: [
                  //     {
                  //       name: 'Banner',
                  //       data: this.$route.params.id,
                  //       options: {
                  //         getData: (url) => GetWidgetsData.getData(this.$axios, url)
                  //       }
                  //     }
                  //   ],
                  //   options: {
                  //     col: 'col-3'
                  //   }
                  // },
                  {
                    widgets: [
                      {
                        name: 'Set'
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
  },
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  }
}
</script>

<style scoped></style>
