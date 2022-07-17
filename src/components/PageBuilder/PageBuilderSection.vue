<template>
  <div
    class="page-builder-section"
    :id="defaultOptions.id"
    :style="{
      height: defaultOptions.height,
      minHeight: defaultOptions.minHeight,
      backgroundImage: 'url(' + defaultOptions.backgroundImage +')',
      backgroundColor: defaultOptions.backgroundColor,
      display: defaultOptions.display,
      flexFlow: defaultOptions.flexFlow,
      justifyContent: defaultOptions.justifyContent,
      top: 0,
      width: defaultOptions.width,
      backgroundPosition: defaultOptions.backgroundPosition,
      backgroundSize: defaultOptions.backgroundSize,
      backgroundRepeat: defaultOptions.backgroundRepeat,
      backgroundAttachment: defaultOptions.backgroundAttachment,
      overflow: defaultOptions.overflow,
      position : defaultOptions.segmentPosition,
      margin:defaultOptions.margin.all  ,
      marginTop:defaultOptions.margin.top ,
      marginRight:defaultOptions.margin.right ,
      marginBottom:defaultOptions.margin.bottom  ,
      marginLeft:defaultOptions.margin.left  ,
      padding:defaultOptions.padding
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
        backgroundImage: '',
        backgroundColor: '',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'unset', // unset - fixed
        overflow: 'auto',

        padding: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        margin: {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        },
        segmentPosition: '',
        height: 'auto',
        width: '100%'
      }
    }
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      const Dimensions = this.$store.getters['AppLayout/windowSize']
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

<style scoped lang="scss">
.page-builder-section {
  //.row {
  //  width: 100%;
  //}
  //display: flex;
  //flex-flow: column;
  /*justify-content: center;*/
  //align-items: center;
}
</style>
