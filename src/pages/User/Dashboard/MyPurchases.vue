<template>
  <page-builder
    :sections="sections"
    :containerHeight="calculateHeightStyle"
    :options="pageConfig" />
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
export default {
  name: 'MyPurchases',
  components: { PageBuilder },
  data () {
    return {
      pageConfig: {
        padding: {
          // a: 'md'
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
                        name: 'purchases'
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
