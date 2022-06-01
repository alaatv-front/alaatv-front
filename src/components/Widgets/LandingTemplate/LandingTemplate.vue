<template>
  <div
    :style="{height: height + 'px', width: width + 'px'}"
    class="backgroundImage-container"
  >
    <div
      :style="{ backgroundImage: 'url(' + this.backgroundImage +')',position : backgroundPosition,padding:backgroundPadding + 'px'}"
      class="backgroundImage"
    >
      <slot/>
    </div>
  </div>

</template>

<script>

import { ref } from 'vue'

export default {
  props: {
    height: {
      type: [String, Number]
    },
    width: {
      type: [String, Number]
    },
    backgroundPadding: {
      type: Number
    },
    backgroundPosition: {
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
      backgroundImage: ref('')
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
        this.backgroundImage = this.url.xs
      } else if (Dimensions.x <= 1024) {
        this.backgroundImage = this.url.sm
      } else if (Dimensions.x <= 1440) {
        this.backgroundImage = this.url.md
      } else if (Dimensions.x <= 1920) {
        this.backgroundImage = this.url.lg
      } else this.backgroundImage = this.url.xl
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
