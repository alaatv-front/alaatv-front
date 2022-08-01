<template>
  <page-builder
    :sections="sections"
    :containerHeight="calculateHeightStyle" />
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
export default {
  name: 'Search',
  components: { PageBuilder },
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
                        name: 'ContentSearch',
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
  },
  computed: {
    calculateHeightStyle () {
      return this.$store.getters['AppLayout/calculateContainerFullHeight']
    }
  }
}
</script>
