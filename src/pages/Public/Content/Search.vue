<template>
  <div class="Search-page">
    <q-page-builder
      v-model:sections="sections"
    />
  </div>
</template>

<script>
export default {
  name: 'Search',
  data () {
    return {
      sections: [
        {
          data: {
            rows: [
              {
                cols: [
                  {
                    widgets: [
                      {
                        name: 'ContentSearch'
                      }
                    ]
                  }
                ]

              }
            ]
          },
          options: {
            boxed: true,
            boxedWidth: 1362
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
