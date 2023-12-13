<template>
  <div class="BodyMovin">
    <div ref="bm"
         class="bm"
         @click="onClickElement" />
  </div>
</template>

<script>
import lottie from 'lottie-web'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'BodyMovin',
  props: {
    responsiveBm: {
      type: Object,
      default: () => {
        return {
          xs: {
            jsonPath: ''
          },
          sm: {
            jsonPath: ''
          },
          md: {
            jsonPath: ''
          },
          lg: {
            jsonPath: ''
          },
          xl: {
            jsonPath: ''
          }
        }
      }
    }
  },
  data () {
    return {
      windowWidth: 0
    }
  },
  computed: {
    responsiveBmPath () {
      return this.getFeatureFromSizeCheckByKey(this.responsiveBm, 'jsonPath')?.jsonPath
    }
  },
  mounted () {
    this.windowWidth = window.innerWidth
    this.reInitBodyMovin()
    // window.addEventListener('resize', this.onResize)
  },
  methods: {
    onClickElement () {
      this.animationData1.stop()
      this.animationData1.play()
    },
    onResize () {
      if (typeof window === 'undefined') {
        return
      }
      this.windowWidth = window.innerWidth
      this.loadBodyMovin()
    },
    reInitBodyMovin () {
      if (this.animationData1) {
        this.animationData1.destroy()
      }
      this.loadBodyMovin()
    },
    loadBodyMovin () {
      this.animationData1 = lottie.loadAnimation({
        wrapper: this.$refs.bm,
        animType: 'svg',
        loop: false,
        autoplay: false,
        path: this.responsiveBmPath
      })
      this.animationData1.addEventListener('complete', () => {
        this.$emit('complete')
      })
    },
    getFeatureFromSizeCheckByKey (features, key) {
      const sizeToNumberMap = {
        xs: 0,
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4
      }
      function getNameBySize (size) {
        return Object.keys(sizeToNumberMap).find(item => sizeToNumberMap[item] === size)
      }
      function getFeatureSizeOfLTSize (features, key, sizeName) {
        return getFeatureSizeWithCallback(features, key, sizeName, (pageSize) => pageSize - 1)
      }

      function getFeatureSizeOfGTSize (features, key, sizeName) {
        return getFeatureSizeWithCallback(features, key, sizeName, (pageSize) => pageSize + 1)
      }

      function getFeatureSizeWithCallback (features, key, sizeName, cb) {
        if (features[sizeName] && features[sizeName][key]) {
          return features[sizeName]
        }
        const pageSize = sizeToNumberMap[sizeName]

        const cbPageSize = cb(pageSize)
        const screenName = getNameBySize(cbPageSize)
        if (!screenName) {
          return null
        }

        return getFeatureSizeWithCallback(features, key, screenName, cb)
      }

      const keyOfLTSize = getFeatureSizeOfLTSize(features, key, this.$q.screen.name)
      if (keyOfLTSize) {
        return keyOfLTSize
      }

      return getFeatureSizeOfGTSize(features, key, this.$q.screen.name)
    }
  }
})
</script>

<style lang="scss" scoped>
.BodyMovin {
  /* page > 1920 */
  width: 100%;
  height: 100%;
  .bm {
    width: 100%;
    height: 100%;
  }
  /* 1440 < page < 1920 */
  @include media-max-width('xl') {
  }
  /* 1024 < page < 1440 */
  @include media-max-width('lg') {
  }
  /* 600 < page < 1024 */
  @include media-max-width('md') {
  }
  /* 360 < page < 600 */
  @include media-max-width('sm') {
  }
}
</style>
