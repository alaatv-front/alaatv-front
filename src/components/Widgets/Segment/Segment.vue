<template>
  <div
    :style="{height: height }"
    class="backgroundImage-container"
  >
    <div
      :style="{
        backgroundImage: 'url(' + this.segmentBackgroundImage +')',
        position : segmentPosition,
        padding:segmentPadding  ,
        margin:segmentMargin.all  ,
        marginTop:segmentMargin.top ,
        marginRight:segmentMargin.right ,
        marginBottom:segmentMargin.bottom  ,
        marginLeft:segmentMargin.left  ,
        padding:segmentPadding.all  ,
        paddingTop:segmentPadding.top ,
        paddingRight:segmentPadding.right ,
        paddingBottom:segmentPadding.bottom ,
        paddingLeft:segmentPadding.left ,
      }"
      class="backgroundImage"
    >
      <slot />
    </div>
  </div>

</template>

<script>

export default {
  props: {
    height: {
      type: [String]
    },
    segmentPadding: {
      type: Object,
      default () {
        return {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        }
      }
    },
    segmentMargin: {
      type: Object,
      default () {
        return {
          all: '',
          top: '',
          right: '',
          bottom: '',
          left: ''
        }
      }
    },
    segmentPosition: {
      type: String
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
  setup () {
    return {
      segmentBackgroundImage: ''
    }
  },
  created () {
    this.getUrl()
  },
  computed: {
  },
  methods: {
    getUrl () {
      const Dimensions = this.$store.getters['AppLayout/windowSize']
      console.log(Dimensions.x)
      if (Dimensions.x <= 600) {
        this.segmentBackgroundImage = this.url.xs
      } else if (Dimensions.x <= 1024) {
        this.segmentBackgroundImage = this.url.sm
      } else if (Dimensions.x <= 1200) {
        this.segmentBackgroundImage = this.url.md
      } else if (Dimensions.x <= 1440) {
        this.segmentBackgroundImage = this.url.lg
      } else this.segmentBackgroundImage = this.url.xl
    }
  }
}
</script>

<style scoped lang="scss">
.backgroundImage-container{
  position: relative;
  height: 100vh;
  margin-right: 10px;
  .backgroundImage{
    width: 100%;
    height: 100%;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    position: absolute;
    top: 0;
  }

}

</style>
