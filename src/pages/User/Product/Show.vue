<template>
  <q-page-builder
    v-model:sections="sections"
    v-model:options="pageConfig"
    :preview="true"
    :editable="pageBuilderEditable"
  />
</template>

<script>
export default {
  name: 'Show',
  computed: {
    pageBuilderEditable () {
      return this.$store.getters['AppLayout/pageBuilderEditable']
    }
  },
  data () {
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
                  {
                    widgets: [
                      {
                        name: 'ProductInfoShow',
                        data: this.$route.params.id
                      }
                    ]
                  }
                ],
                options: {
                  boxed: true
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
