<template>
  <div class="myFavorites-page">
    <q-page-builder
      v-model:sections="sections"
      v-model::options="pageConfig"
    />
  </div>
</template>

<script>
export default {
  name: 'MyFavorites',
  data () {
    return {
      pageConfig: {
        padding: {
          a: 'lg'
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
                        name: 'favorites'
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
    calculateHeightStyle () {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>
