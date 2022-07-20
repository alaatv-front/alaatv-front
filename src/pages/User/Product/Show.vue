<template>
<page-builder :sections="sections"/>
</template>

<script>
import PageBuilder from 'components/PageBuilder/PageBuilder'
import API_ADDRESS from 'src/api/Addresses'

export default {
  name: 'Show',
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
                        name: 'productInfoShow',
                        data:{}
                      }
                    ]
                  },
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
  created () {
    this.setData()
  },
  computed: {
    productId () {
      return this.$route.params.id
    }
  },
  methods: {
    setData () {
      this.$axios.get(API_ADDRESS.product.show.base + '/'+ this.productId)
      .then(response => {
        console.log(this.findWidget(0,0,0,'productInfoShow'))
        this.findWidget(0,0,0,'productInfoShow').data = response.data.data
      })
    },
    findWidget (sectionIndex,rowIndex, colIndex, widgetName) {
      const widget = this.sections[sectionIndex].data.rows[rowIndex].cols[colIndex].widgets.find(widget => widget.name === widgetName)
      return widget
    }
  }
}
</script>

<style scoped>

</style>
