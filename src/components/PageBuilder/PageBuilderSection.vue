<template>
  <div
    class="page-builder-section"
    :style="{
      height: defaultOptions.height,
      backgroundImage: 'url(' + this.PageBackgroundImage +')',
      position : defaultOptions.segmentPosition,
      padding:defaultOptions.segmentPadding  ,
      margin:defaultOptions.segmentMargin.all  ,
      marginTop:defaultOptions.segmentMargin.top ,
      marginRight:defaultOptions.segmentMargin.right ,
      marginBottom:defaultOptions.segmentMargin.bottom  ,
      marginLeft:defaultOptions.segmentMargin.left  ,
      padding:defaultOptions.segmentPadding.all  ,
      paddingTop:defaultOptions.segmentPadding.top ,
      paddingRight:defaultOptions.segmentPadding.right ,
      paddingBottom:defaultOptions.segmentPadding.bottom ,
      paddingLeft:defaultOptions.segmentPadding.left ,
    }"
  >
    <page-builder-row  v-for="(row, rowIndex) in data.rows"
                       :key="rowIndex"
                       :cols="row.cols"
                       :options="row.options"
    />
  </div>
</template>

<script>
import PageBuilderRow from './PageBuilderRow.vue'
import { mixinWidget } from 'src/mixin/Mixins'

export default {
  name: 'PageBuilderSection',
  mixins: [mixinWidget],
  components: {
    PageBuilderRow
  },
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    url: {
      type: Object,
      default () {
        return {
          xl: '',
          lg: '',
          md: '',
          sm: '',
          xs: ''
        }
      }
    }
  },
  data () {
    return {
      PageBackgroundImage: '',
      defaultOptions: {
        segmentPadding: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        segmentMargin: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        segmentPosition: {
          type: String
        },
        height: {
          type: [String]
        }
      }
    }
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      const Dimensions = this.$store.getters['AppLayout/windowSize']
      console.log(Dimensions.x, this.data)
      if (Dimensions.x <= 600) {
        this.PageBackgroundImage = this.url.xs
      } else if (Dimensions.x <= 1024) {
        this.PageBackgroundImage = this.url.sm
      } else if (Dimensions.x <= 1200) {
        this.PageBackgroundImage = this.url.md
      } else if (Dimensions.x <= 1440) {
        this.segmentBackgroundImage = this.url.lg
      } else this.PageBackgroundImage = this.url.xl
    }
  }
}
</script>

<style scoped>
.page-builder-section{
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: auto;
  /*position: absolute;*/
  top: 0;
}

</style>
