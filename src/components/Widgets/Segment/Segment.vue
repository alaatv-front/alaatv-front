<template>
  <div class="backgroundImage"
       :style="{
         height: defaultOptions.height,
         backgroundImage: 'url(' + this.segmentBackgroundImage +')',
         position : defaultOptions.segmentPosition,
         padding:defaultOptions.segmentPadding ,
         margin:defaultOptions.segmentMargin.all ,
         marginTop:defaultOptions.segmentMargin.top ,
         marginRight:defaultOptions.segmentMargin.right ,
         marginBottom:defaultOptions.segmentMargin.bottom ,
         marginLeft:defaultOptions.segmentMargin.left ,
         padding:defaultOptions.segmentPadding.all ,
         paddingTop:defaultOptions.segmentPadding.top ,
         paddingRight:defaultOptions.segmentPadding.right ,
         paddingBottom:defaultOptions.segmentPadding.bottom ,
         paddingLeft:defaultOptions.segmentPadding.left ,
       }">
    <slot />
  </div>

</template>

<script>

export default {
  name: 'Segment',
  props: {
    data: {
      type: Object,
      default () {
        return {
          url: {
            xl: '',
            lg: '',
            md: '',
            sm: '',
            xs: ''
          }
        }
      }
    }
  },
  data () {
    return {
      segmentBackgroundImage: '',
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
      },
      options: {

      }
    }
  },
  computed: {
  },
  created () {
    this.getUrl()
  },
  methods: {
    getUrl () {
      const Dimensions = this.$store.getters['AppLayout/windowSize']
      if (Dimensions.x <= 600) {
        this.segmentBackgroundImage = this.data.url.xs
      } else if (Dimensions.x <= 1024) {
        this.segmentBackgroundImage = this.data.url.sm
      } else if (Dimensions.x <= 1200) {
        this.segmentBackgroundImage = this.data.url.md
      } else if (Dimensions.x <= 1440) {
        this.segmentBackgroundImage = this.data.url.lg
      } else this.segmentBackgroundImage = this.data.url.xl
    }
  }
}
</script>

<style scoped lang="scss">
.backgroundImage{
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  overflow: scroll;

  //position: absolute;
  top: 0;
}

//.backgroundImage-container{
//  position: relative;
//  height: 100vh;
//  margin-right: 10px;
//}

</style>
