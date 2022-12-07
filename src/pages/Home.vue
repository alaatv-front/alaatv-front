<template>
  <q-page-builder v-model:sections="sections"
                  v-model:options="pageConfig"
                  :editable="pageBuilderEditable"
  />
</template>

<script>
export default {
  name: 'BaseComponent',
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  },
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
                        name: 'BlockList',
                        data: 'home',
                        options: {
                          to: 1,
                          apiName: 'home'
                        }
                      },

                      {
                        name: 'BlockList',
                        data: 'home',
                        options: {
                          from: 1,
                          apiName: 'home'
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
          },
          options: {
            fullHeight: true,
            verticalAlign: 'center'
          }
        }
      ]
    }
  }
}
</script>

<style
  lang="scss"
  scoped
>
.home-page {
  &:deep(.banner-header-0) {
    display: none;
  }
}
</style>
